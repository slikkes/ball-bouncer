class GameObject {
    constructor(type, x, y, width, height, color) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = null;
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

    detectCollision(gameObject){
        const collisionX = this.x + this.width >= gameObject.x &&
            gameObject.x + gameObject.width >= this.x;
        const collisionY = this.y + this.height >= gameObject.y &&
            gameObject.y + gameObject.height >= this.y;

        if(collisionX ||collisionY){
        }

        return collisionX && collisionY;
    }

    destroy() {

    }
}