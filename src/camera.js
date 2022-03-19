import Segment_poly from "/src/segment_poly.js";
import Segment from "/src/segment.js";
import Road from "/src/road.js";
import Leaderboard from "/src/leaderboard.js";
export default class Camera {

    constructor() {
        this.cameraX = 0;
        this.cameraY = 100;
        this.cameraZ = 0;
        this.fov = 100;
        this.fovdefault = 100;
        this.d = (1 / (Math.tan((this.fov * Math.PI / 180) / 2)));
        this.roadpoints = [];
        this.roadwidth = 100;

    }

    update(curve, player, leaderboard) {
        let points = curve.getPoints();
        this.roadpoints = [];
        points.forEach(point => this.roadpoints.push(this.project(point.x, point.y, point.z)));

        ///updating player values in this class
        this.playerposition = Math.floor(player.getPosition());
        this.playerhorizontal = player.getHorizontal();
        this.playervelocity = player.getVelocity();
        this.playerinputs = player.getInputs();

        this.leaderboardscores = leaderboard.getScores();

    }
    draw(ctx) {

        let p1, p2;
        let x1, x2;

        let road = new Road();
        let patternswitch = false;
        let patternswitch2 = false;

        ///loop through each roadpoint, assigning new polys to each p1p2 segment, 
        ///adding each segment to the road class
        for (let i = 0; i < this.roadpoints.length - 1; i++) {
            p1 = this.roadpoints[i];
            p2 = this.roadpoints[i + 1];

            let segment = new Segment();
  
            ///switches the color pallete for every 6 segments
            ///the mod 12 is there to undo every second flip. this is so the transition of pallete shift is correct.
            if((i+this.playerposition) % 6 == 0) 
            {
                patternswitch = true;
                
            }  

            

            if((i+this.playerposition) % 12 == 0) 
            {
                patternswitch = !patternswitch;
                
            }      


            /// these are the two color palletes the segments switch from.
            /// whilst this seems inneficient, having many repeated lines, because they are each specialized
            /// there isnt much i can do to compress it. nothing thats easily compatible.
            switch (patternswitch) {
                case true: ///dark
                    segment.push(new Segment_poly(100000000000000, 0, "#e0de6e", p1, p2, this.d)); ///GRASS
                    segment.push(new Segment_poly(this.roadwidth, 0, "#424242", p1, p2, this.d)); ///ASHPALT
                    segment.push(new Segment_poly(4, this.roadwidth/2 +2, "#FFFFFF", p1, p2, this.d)); ///CURB L
                    segment.push(new Segment_poly(4, -this.roadwidth/2 -2, "#FFFFFF", p1, p2, this.d)); ///CURB R
                  break;
                default: ///bright
                    segment.push(new Segment_poly(1000000, 0, "#ebe973", p1, p2, this.d)); ///GRASS
                    segment.push(new Segment_poly(this.roadwidth, 0, "#4a4a4a", p1, p2, this.d)); ///ASHPALT
                    segment.push(new Segment_poly(4, this.roadwidth/2 +2, "#ff2121", p1, p2, this.d)); ///CURB L
                    segment.push(new Segment_poly(4, -this.roadwidth/2 -2, "#ff2121", p1, p2, this.d)); ///CURB R
                    segment.push(new Segment_poly(1, this.roadwidth/5.6667, "#FFFFFF", p1, p2, this.d)); ///line C
                    segment.push(new Segment_poly(1, -this.roadwidth/5.6667, "#FFFFFF", p1, p2, this.d)); ///line C
                  break;
               
            }
            road.push(segment);
        }
        ///finally, a bundle of polymorphism is used to project the full road
        road.draw(ctx);
        ///road.draw() triggers each segment.draw() which triggers each segment_poly.draw(). 


        ///camera modifying---------
        ///x position of camera follows the players horizontal position
        this.cameraX = this.playerhorizontal;
        ///fov reacts to velocity of player to create a greater sense of speed
        this.d = (1 / (Math.tan(((this.fovdefault + this.playervelocity*4) * Math.PI / 180) / 2)));
        



        ///leaderboard drawing-------

        ///forgive me for using a try catch like this, its a bandaid solution
        ///but i have no idea why certain variables are undefined for the first 2 frames
        ///they are in correct order.
        try {
            if (this.playerinputs.l == 1)
            {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '12px Segoe UI';
                ctx.fillText("leaderboard:", 10, 25);
                for(let line = 0; line < this.leaderboardscores.keys.length; line++)
                {
                    
                    ctx.fillText(this.leaderboardscores.values[line] + " " 
                               + this.leaderboardscores.keys[line], 10, 15*line+40);
                } 
            }
        } catch (error) { 
        }
        
    }
    project(Xworld, Yworld, Zworld) {
        let Xcamera, Ycamera, Zcamera;
        let Xproject, Yproject;
        let Xscreen, Yscreen;

        ///centering camera position
        Xcamera = Xworld - this.cameraX; 
        Ycamera = Yworld - this.cameraY;
        Zcamera = Zworld - this.cameraZ;

        ///projecting points onto camera display plane
        Xproject = Xcamera * this.d / Zcamera; 
        Yproject = Ycamera * this.d / Zcamera;

        ///converting display plane coordinate to canvas coordinate
        Xscreen = (canvas.width / 2) + (canvas.width / 2) * Xproject;
        Yscreen = (canvas.height / 2) - (canvas.height / 2) * Yproject;

        return {x: Xscreen, y: Yscreen, z: Zcamera};

    }

}