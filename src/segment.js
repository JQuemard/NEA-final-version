export default class segment {

    ///function: to store a list of road polys per segment to be able to draw each individually

    constructor (){      
        this.polylist = [];///of type segment_polys
    }

    push(roadpoly)
    {
        this.polylist.push(roadpoly);
    }

    draw(ctx)
    {
        this.polylist.forEach(rdpoly => rdpoly.draw(ctx));
    }


}
