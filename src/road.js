export default class road {

    ///function: to store a list of segments to be able to draw each individually, efficiently

    constructor (){      
        this.segmentlist = [];///of type segments
    }

    push(segment)
    {
        this.segmentlist.push(segment);
    }

    draw(ctx)
    {
        ///reversed to draw from background to front ground, otherwise you can see through hills.
        this.segmentlist.slice().reverse().forEach(segment => segment.draw(ctx));
    }


}
