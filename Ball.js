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

    bounce(){
        this.bounceOnX()
        this.bounceOnY()
    }
}