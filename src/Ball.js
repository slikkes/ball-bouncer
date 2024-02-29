class Ball extends GameObject {
    constructor(x, y) {
        super('ball', x, y, 30, 30, 'blue');
    }

    /**
     * Reverses the ball's vertical direction
     *
     */
    bounceOnX() {
        this.velocity.y = -this.velocity.y;
    }

    /**
     * Reverses the ball's horizontal direction
     *
     */
    bounceOnY() {
        this.velocity.x = -this.velocity.x;
    }

    /**
     * A central method to handle bouncing.
     * It takes an axis ('x', 'y', or 'full') and calls the appropriate bounce method for that axis.
     *
     * @param {string} axis - The bounce axis
     *
     */
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

    /**
     * Overrides the move() method from GameObject. Adds specific ball movement behaviors.
     *
     * @param {CanvasRenderingContext2D} context - The 2D drawing context of the game's canvas.
     *
     */
    move(context) {
        if (!this.velocity) {
            return;
        }

        let y = this.y + this.velocity.y;

        // Bottom Boundary Check: If the ball reaches the bottom of the canvas, it triggers a "game-over" custom event.
        if (this.getBottomY() + this.velocity.y >= context.canvas.clientHeight) {
            document.dispatchEvent(new CustomEvent('game-over'));
            return;
        }

        // Top Bounce: Ensures the ball bounces off the top boundary.
        if(y<=0){
            this.bounceOnY();
            y = this.y + this.velocity.y;
        }

        this.x = this.x + this.velocity.x;
        this.y = y;
    }
}