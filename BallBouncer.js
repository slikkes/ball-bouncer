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
        this.gameObjects.push(ball)
        this.gameObjects.push(new Wall(0, this.gameArea.canvas.height))
        this.gameObjects.push(new Wall(this.gameArea.canvas.width - 10, this.gameArea.canvas.height));
        this.gameObjects.push(new Brick(origo.x, origo.y));

        // TODO create bricks
        // TODO create player

        const context = this.gameArea.getContext();
        setInterval(() => {
            this.gameArea.refreshGameArea();

            for (const gameObject of this.gameObjects) {
                gameObject.move();
                gameObject.draw(context);

                if (gameObject.type !== "ball") {

                    const collisionAxis = ball.detectCollision(gameObject);
                    if (collisionAxis) {
                        //right y 490 0  460 190
                        //left y  0   0  10  160
                        //bottom x 250 250 250 280
                        ball.bounce()
                        console.log('<----[(=| collision |=)]---->', gameObject.x - ball.x,
                            gameObject.y - ball.y,)
                    }
                }
            }
        }, 16);
    }
}