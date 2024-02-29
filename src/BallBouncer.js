class BallBouncer {
    constructor() {
        this.gameArea = new GameArea();
        this.gameObjects = [];
        this.gameIntervalID = null;
        this.score = null;
        this.entities = {}
    }

    init() {
        this.entities = entities;
        const canvasHolder = document.getElementById("canvas-holder")
        if (!canvasHolder) {
            throw new Error("missing canvas holder")
        }
        this.gameArea.initGameArea(canvasHolder);
        this.registerListeners();
    }

    start() {
        this.stop();

        this.setScore(0)

        const origo = this.gameArea.origo
        let ball = new Ball(origo.x, origo.y + 150);
        // set default velocity for testing
        ball.velocity = new Vector(2, -2)

        this.gameObjects.push(ball)
        this.gameObjects.push(new Wall(0, this.gameArea.canvas.height))
        this.gameObjects.push(new Wall(this.gameArea.canvas.width - 10, this.gameArea.canvas.height));
        this.spawnBricks();
        this.player = new Player(origo.x, this.gameArea.canvas.height - 10);
        this.gameObjects.push(this.player);


        // TODO create bricks
        // TODO create player

        const context = this.gameArea.getContext();
        let i = 0;
        this.gameIntervalID = setInterval(() => {
            this.gameArea.refreshGameArea();

            for (const gameObject of this.gameObjects) {
                gameObject.move(context);
                gameObject.draw(context);

                if (gameObject.type !== "ball") {

                    const collisionAxis = ball.detectCollisionAxis(gameObject);
                    if (collisionAxis) {
                        ball.bounce(collisionAxis)
                        if (gameObject.type === "brick") {
                            gameObject.destroy()
                            this.setScore(this.score + 10)

                        }
                    }
                }
            }
            this.gameObjects = this.gameObjects.filter(gameObject => !gameObject.destroyed)

            if (i >= 30) {
                i = 0;
                const hasBricks = this.gameObjects.some(gameObject => gameObject.type === "brick")
                if (!hasBricks) {
                    this.spawnBricks();
                }


            }
            i++;
        }, 16);
    }

    stop() {
        if (!this.gameIntervalID) {
            return;
        }
        this.gameObjects = [];
        this.gameArea.refreshGameArea(this);
        clearInterval(this.gameIntervalID)
    }

    startMovePlayer(key) {
        const x = key === "ArrowRight"
            ? 2
            : -2
        this.player.velocity = new Vector(x, 0)
    }

    stopMovePlayer(key) {
        this.player.velocity = new Vector(0, 0)
    }

    spawnBricks() {
        const n = Math.round(this.gameArea.canvas.width / 70)
        const offset=20;
        for (let i = 0; i < n; i++) {
            const brick = new Brick(offset + i * 65, 25, this.entities.bricks.medium);
            this.gameObjects.push(brick)
        }

        /*  const origo = this.gameArea.origo
          this.gameObjects.push(new Brick(origo.x + 65, 25));
          this.gameObjects.push(new Brick(origo.x - 65, 25));
          this.gameObjects.push(new Brick(origo.x - 130, 25));
          this.gameObjects.push(new Brick(origo.x, 25));
          this.gameObjects.push(new Brick(origo.x + 130, 25));*/
    }

    setScore(score) {
        this.score = score;
        document.querySelector("#score-output").innerHTML = this.score;
    }

    gameOver() {
        console.log("GAME OVER")
        setTimeout(() => {
            this.stop();
            this.gameArea.showGameOver(this.score);
        }, 1)
    }

    registerListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                console.log(event.key === "ArrowLeft" || event.key === "ArrowRight");
                this.startMovePlayer(event.key)
                return;
            }


        });
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                console.log(event.key === "ArrowLeft" || event.key === "ArrowRight");
                this.stopMovePlayer(event.key)
                return;
            }
        });
        document.addEventListener("game-over", () => {
            this.gameOver();
        });
    }
}