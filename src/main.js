
import Camera from "/src/camera.js";
import Curve from "/src/curve.js";
import Player from "/src/player.js";
import Leaderboard from "/src/leaderboard.js";
var canvas = document.getElementById("canvas"); //linking script to the html canvas element
var ctx = canvas.getContext("2d"); //sets the renderer context

let dt= 0, pt = 0; 
let camera = new Camera();
let curve = new Curve();
let player = new Player();
let leaderboard = new Leaderboard();


///on a frame, if a key is pressed it will respond to player.keystroke with a state and code, which player can respond to.
document.body.addEventListener("keydown", function (e) { player.keystroke(e.keyCode, 1); });
document.body.addEventListener("keyup", function (e) { player.keystroke(e.keyCode, 0); });

function frame(timestamp){

    ///background setup
    ctx.fillStyle = '#208dcb';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ///time the frame takes to render
    dt = timestamp - pt; 
    pt = timestamp;

    if (dt){
        player.update(dt);
        curve.update(player);
        camera.update(curve, player, leaderboard);    
        }
     
        camera.draw(ctx);
        
    requestAnimationFrame(frame);
    ///console.log(dt) ///1/fps
} 

frame(); //initial run of loop