class GameObject {
    constructor(type, x, y, width, height, color) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = new Vector(0, 0);
    }

    draw(context) {
        context.fillStyle = this.color
        context.strokeStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fill();
    }

    move() {
        if (!this.velocity) {
            return;
        }

        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

    detectCollisionAxis(gameObject) {
        const collisionX = this.x + this.width >= gameObject.x &&
            gameObject.x + gameObject.width >= this.x;
        const collisionY = this.y + this.height >= gameObject.y &&
            gameObject.y + gameObject.height >= this.y;

        if (!(collisionX && collisionY)) {
            return null
        }

        const distances = this.getIntersectionDistances(gameObject)

        if (distances.dx > distances.dy) {
            return 'x'
        } else if (distances.dx < distances.dy) {
            return 'y'
        } else {
            return 'full'
        }
    }
    getIntersectionDistances(gameObject){
        let dx = null;
        let dy = null;

        let direction = this.velocity.getDirection();
        switch (direction) {
            case 'top-left': {
                dx = (gameObject.x + gameObject.width) - this.x;
                dy = (this.y + this.height) - gameObject.y
                // check if top left x or y is further into the collision object
                break;
            }
            case 'top-right': {
                dx = gameObject.x - (this.x + this.width);
                dy = (this.y + this.height) - gameObject.y
                break;
            }
            case 'bottom-left': {
                dx = (gameObject.x + gameObject.width) - this.x;
                dy = (gameObject.y + gameObject.height) - this.y
                break;
            }
            case 'bottom-right': {
                dx = (this.x + this.width) - gameObject.x;
                dy = this.y - (gameObject.y + gameObject.height)

                break;
            }
            case 'none': {
                dx = 0;
                dy = 0;
                break;
            }
            default: {
                throw new Error('invalid direction')
            }
        }
        if (!dx && !dy) {
            return null
        }
        console.log('<----[(=| d |=)]---->', dx, dy)

        dx = Math.max(Math.abs(dx), this.width)
        dy = Math.max(Math.abs(dy), this.height)

        return {dx, dy}
    }

    destroy() {

    }
}