import Polygon from "/src/polygon.js";
export default class segment_poly extends Polygon{

   


    constructor (thickness, offset, color, p1, p2, d){   
        
        ///essentailly, the function of this class is to take p1 and p2 and find the display points of 
        ///each poly according to its thickness and offset. the process is identical to
        ///camera.project() except we cant use that because of a lack of parameters.

        let Widthproject = (thickness/2 +  offset) * d/(p1.z);
        let Widthscreen = (canvas.width/2)*Widthproject;
        let x1 = p1.x - Widthscreen;
        Widthproject = (thickness/2 -  offset) * d/(p1.z);
        Widthscreen = (canvas.width/2)*Widthproject;
        let x2 = p1.x + Widthscreen;

        Widthproject = (thickness/2 -  offset) * d/(p2.z);
        Widthscreen = (canvas.width/2)*Widthproject;
        let x3 = p2.x + Widthscreen;
        Widthproject = (thickness/2 +  offset) * d/(p2.z);
        Widthscreen = (canvas.width/2)*Widthproject;
        let x4 = p2.x - Widthscreen;

        let y1 = p1.y;
        let y2 = y1;
        let y3 = p2.y;
        let y4 = y3;

        ///super accessing main class polygon, 
        ///the math.floor is there to make sure there are no gaps between segments
        super(color, x1, Math.floor(y1), x2, Math.floor(y2), x3, Math.floor(y3), x4, Math.floor(y4));
    }


}
