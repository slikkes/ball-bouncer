class Ball extends GameObject {
    constructor(x, y) {
        super('ball', x, y, 30, 30, 'blue');
    }

    bounceOnX() {
        this.velocity.y = -this.velocity.y;
    }

    bounceOnY() {
        this.velocity.x = -this.velocity.x;
    }

    bounce(axis) {
        switch (axis) {
            case 'x': {
                this.bounceOnX()
                break;
            }
            case 'y': {
                this.bounceOnY()
                break;
            }
            case 'full': {
                this.bounceOnX()
                this.bounceOnY()
                break;
            }
        }
    }

    move(context) {
        if (!this.velocity) {
            return;
        }

        let y = this.y + this.velocity.y;

        if (this.getBottomY() + this.velocity.y >= context.canvas.clientHeight) {
            document.dispatchEvent(new CustomEvent('game-over'));
            return;
        }

        if(y<=0){
            this.velocity.y =-this.velocity.y
            y = this.y + this.velocity.y;
        }

        this.x = this.x + this.velocity.x;
        this.y = y;
    }
}