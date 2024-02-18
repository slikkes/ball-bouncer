class Ball extends GameObject{
    constructor(x, y) {
        super('ball', x, y, 30, 30, 'blue');
    }
    bounceOnX() {
        this.velocity.y = -this.velocity.y;
    }

    bounceOnY() {
        this.velocity.x = -this.velocity.x;
    }

    bounce(axis){
        switch (axis){
            case 'x':{
                this.bounceOnX()
                break;
            }
            case 'y':{
                this.bounceOnY()
                break;
            }
            case 'full':{
                this.bounceOnX()
                this.bounceOnY()
                break;
            }
        }
    }
}