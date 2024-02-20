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
    detectCollision(gameObject){
        const collisionX = this.getRightX() >= gameObject.x &&
            gameObject.getRightX() >= this.x;
        const collisionY = this.getBottomY() >= gameObject.y &&
            gameObject.getBottomY() >= this.y;
        return  collisionX && collisionY

    }
    detectCollisionAxis(gameObject) {

        if (!this.detectCollision(gameObject)) {
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

    getIntersectionDistances(gameObject) {
        const width = Math.max(this.getRightX(), gameObject.getRightX()) - Math.min(gameObject.x, this.x)
        const totalWidth = this.width + gameObject.width;
        const height = Math.max(this.getBottomY(), gameObject.getBottomY()) - Math.min(gameObject.y, this.y)
        const totalHeight = this.height + gameObject.height;

        return {
            dx: totalWidth - width,
            dy: totalHeight - height
        }
    }

    destroy() {

    }
    getRightX() {
        return this.x + this.width;
    }
    getBottomY() {
        return this.y + this.height;;
    }
    
    
}