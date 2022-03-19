
export default class Player {

    constructor ()
    {   
        this.position = 0;
        this.horizontal = 0;
        this.velocity = 0;
        this.acceleration = 0.05;
        this.topspeed = 1;
        ///tracks inputs of each control state
        this.input = { w: 0, s: 0, a: 0, d: 0, j: 0, l: 0, k: 0, horizontal: 0, vertical: 0, camera: 0};
    }    

    keystroke(code, state){ //keycode, on is 1 or 0

        switch(code){
            case 65: //A
                this.input.a = state;
                break;
            case 68: //D
                this.input.d = state;
                break;
            case 74: //j
                this.input.j = state;
                break;
            case 76: //l
                this.input.l = state;
                break;
            case 83: //S
                this.input.s = state;
                break;
            case 87: //W
                this.input.w = state;
                break;
            case 75: //K
                this.input.k = state;
                break;
            default:
                return;
        }

        //cancel movements if opposing
        this.input.horizontal = this.input.d - this.input.a;
        this.input.vertical = this.input.w - this.input.s;
        this.input.camera = this.input.j - this.input.k;

    }

    update(dt)
    {
        if (this.velocity < this.topspeed ){
            this.velocity += this.acceleration * this.input.w;
        }
        if (this.velocity > 0 ){
            this.velocity += this.acceleration * (this.input.w-1);
        }
        
        this.position += this.velocity*dt*0.1;
        
        this.horizontal += 0.05*this.input.horizontal*dt*this.velocity;
    
        if (this.velocity < 0 )
        {
            this.velocity = 0;
        }

    }

    getPosition()
    {
        return this.position;
    } 
    getHorizontal()
    {
        return this.horizontal;
    } 
    getVelocity()
    {
        return this.velocity;
    } 
    getInputs()
    {
        return this.input;
    }
}
