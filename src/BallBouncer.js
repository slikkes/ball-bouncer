class BallBouncer {
    constructor() {
        this.gameArea = new GameArea();
        this.gameObjects = [];
    }

    init() {
        const canvasHolder = document.getElementById("canvas-holder")
        if (!canvasHolder) {
            throw new Error("missing canvas holder")
        }
        this.gameArea.initGameArea(canvasHolder);
    }

    start() {
        const origo = this.gameArea.origo
        let ball = new Ball(origo.x, origo.y + 150);
        // set default velocity for testing
        ball.velocity = new Vector(2, -2)

        this.gameObjects.push(ball)
        this.gameObjects.push(new Wall(0, this.gameArea.canvas.height))
        this.gameObjects.push(new Wall(this.gameArea.canvas.width - 10, this.gameArea.canvas.height));
        this.gameObjects.push(new Brick(origo.x+25, 25));

        // TODO create bricks
        // TODO create player

        const context = this.gameArea.getContext();
        setInterval(() => {
            this.gameArea.refreshGameArea();

            for (const gameObject of this.gameObjects) {
                gameObject.move();
                gameObject.draw(context);

                if (gameObject.type !== "ball") {

                    const collisionAxis = ball.detectCollisionAxis(gameObject);
                    if (collisionAxis) {
                        ball.bounce(collisionAxis)
                        console.log('<----[(=| collision |=)]---->', collisionAxis)
                    }
                }
            }
        }, 16);
    }
}