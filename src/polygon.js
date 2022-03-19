export default class polygon{

    constructor (color, x1, y1, x2, y2, x3, y3, x4, y4){   
        this.p1 = {x: x1, y: y1};
        this.p2 = {x: x2, y: y2};
        this.p3 = {x: x3, y: y3};
        this.p4 = {x: x4, y: y4};
        this.color = color;
    }

    draw(ctx){ ///draws the polygon
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineTo(this.p3.x, this.p3.y);
        ctx.lineTo(this.p4.x, this.p4.y);
        ctx.closePath();
        ctx.fill();
    }

    polymorph(x1, y1, x2, y2, x3, y3, x4, y4)
    {
        this.p1 = {x: x1, y: y1};
        this.p2 = {x: x2, y: y2};
        this.p3 = {x: x3, y: y3};
        this.p4 = {x: x4, y: y4};
    }

}
