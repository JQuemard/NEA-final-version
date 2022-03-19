export default class Curve{

   /// purpose of this is to construct a list of points which determine the world position of the road. 


    constructor ()
    {   

        this.renderdistance = 500; ///number of segments
        this.segmentlength = 1;    ///length of segments in 3dspace
        this.points = [];
        
    }

    update(player)
    {
        this.points = [];
        let x,y,z = 0;

        ///generates a set of values for the road
        for(let i = 0; i < this.renderdistance; i++)
        {
            this.points.push({x: x, y: y, z: z});
         
            z += this.segmentlength;
            x = 1*z * player.getInputs().camera ;
            y = z ///5*Math.tan(1/1500*(z+player.getPosition()));

            
            
        }

    }

    getPoints(){
        return this.points;
    }

}
