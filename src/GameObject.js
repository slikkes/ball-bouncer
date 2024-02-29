class GameObject {
    constructor(type, x, y, width, height, color) {
        this.type = type;                          // A string representing the object's type (e.g., "ball", "brick", "player")
        this.x = x;                                // Initial x coordinates.
        this.y = y;                                //
        this.width = width;                        // Dimensions of the object.
        this.height = height;                      //
        this.color = color;                        // The object's fill/stroke color.
        this.velocity = new Vector(0, 0);     // A Vector object representing the object's current speed and direction.
        this.destroyed = false;                    // A flag indicating whether the object should be removed from the game.
    }

    /**
     * Renders the object as a filled rectangle on the canvas.
     *
     * @param {CanvasRenderingContext2D} context - The 2D drawing context of the game's canvas.
     *
     */
    draw(context) {
        context.fillStyle = this.color
        context.strokeStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fill();
    }

    /**
     * Updates the object's position based on its velocity.
     *
     * @param {CanvasRenderingContext2D} context - The 2D drawing context of the game's canvas.
     *
     */
    move(context) {
        if (!this.velocity) {
            return;
        }

        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

        /*  const x = this.x + this.velocity.x;
          const y = this.y + this.velocity.y;

          if (x > 0 && (x + this.width) < context.canvas.clientWidth) {
              this.x = x;
          }

          if (y > 0 && (y + this.height) < context.canvas.clientHeight) {
              this.y = y;
          }*/

    }

    /**
     * Determines if this object is colliding with another game object. Returns true if there's a collision, false otherwise.
     *
     * @param {GameObject} gameObject - the other game object
     * @return boolean
     *
     */
    detectCollision(gameObject) {
        const collisionX = this.getRightX() >= gameObject.x &&
            gameObject.getRightX() >= this.x;
        const collisionY = this.getBottomY() >= gameObject.y &&
            gameObject.getBottomY() >= this.y;
        return collisionX && collisionY
    }

    /**
     * This method determines the dominant axis of the collision
     *
     * @param {GameObject} gameObject - the other game object
     * @return string|null
     *
     */
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

    /**
     * Calculates how much the objects are overlapping on the X and Y axes, used for collision calculations.
     *
     * @param {GameObject} gameObject - the other game object
     * @return object
     *
     */
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

    /**
     * Marks the game object to be removed from the game.
     *
     */
    destroy() {
        this.destroyed = true;
    }

    /**
     * Simple calculations to get the rightmost coordinates of the object.
     *
     */
    getRightX() {
        return this.x + this.width;
    }

    /**
     * Simple calculations to get the bottommost coordinates of the object, useful for collision detection.
     *
     */
    getBottomY() {
        return this.y + this.height;
    }


}