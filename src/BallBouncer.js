class BallBouncer {
    constructor() {
        this.gameArea = new GameArea();         // Instance of the GameArea class
        this.gameObjects = [];                  // Holds all active game objects (ball, walls, player, etc.)
        this.score = null;                      // Player's current score
        this.entities = {};                     // Stores game entities (e.g., different brick types)
        this.gameInterval = {                   // Stores the ID of the game loop interval and frame id
            id: null,
            frame: 0
        }
    }

    /**
     * Initializes the game by loading entities, setting up the game area within the canvas,
     * and attaching event listeners for player input.
     *
     */
    init() {
        this.entities = entities;
        const canvasHolder = document.getElementById("canvas-holder")
        if (!canvasHolder) {
            throw new Error("missing canvas holder")
        }
        this.gameArea.initGameArea(canvasHolder);
        this.registerListeners();
    }

    /**
     * Resets the score, creates initial game, and begins the main game loop.
     *
     */
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
        this.spawnBricks(this.generateBrickLine());
        this.player = new Player(origo.x, this.gameArea.canvas.height - 10);
        this.gameObjects.push(this.player);


        // TODO create bricks
        // TODO create player

        const context = this.gameArea.getContext();
        this.gameInterval.frame = 0;
        this.gameInterval.id = setInterval(() => {
            this.update(context, ball);
        }, 16);
    }

    update(context, ball) {
        this.gameArea.refreshGameArea();
        ball.bounced = false;
        for (const gameObject of this.gameObjects) {
            gameObject.move(context);
            gameObject.draw(context);

            if (this.gameInterval.frame >= 20) {
                continue;
            }

            if (gameObject.type !== "ball") {

                const collisionAxis = ball.detectCollisionAxis(gameObject);
                if (collisionAxis) {
                    if (gameObject.type === "brick") {
                        const hp = gameObject.decreaseHP()
                        if (!hp) {
                            this.setScore(this.score + gameObject.score)
                        } else {
                            if(!ball.bounced){
                                ball.bounce(collisionAxis)
                                ball.bounced = true;
                            }
                        }

                    } else if (gameObject.type === "player") {
                        const direction = ball.getCenterX() > gameObject.getCenterX()
                            ? "right"
                            : "left";

                        console.log('<----[(=| asd |=)]---->', direction, ball.velocity)
                        ball.bounce(collisionAxis)
                        if ((direction === "left" && ball.velocity.x > 0) || (direction === "right" && ball.velocity.x <= 0)) {
                            ball.bounceOnY();
                        }
                    } else {
                        ball.bounce(collisionAxis)

                    }
                }
            }
        }
        this.gameObjects = this.gameObjects.filter(gameObject => !gameObject.destroyed)

        if (this.gameInterval.frame >= 30) {
            this.gameInterval.frame = 0;
            const hasBricks = this.gameObjects.some(gameObject => gameObject.type === "brick")
            if (!hasBricks) {
                this.spawnBricks(this.generateBrickLine());
            }


        }

        this.gameInterval.frame = this.gameInterval.frame >= 10 ? 0 : this.gameInterval.frame + 1;
    }

    /**
     *  Stops the current game, clearing the game objects and game loop.
     *
     */
    stop() {
        if (!this.gameInterval.id) {
            return;
        }
        this.gameObjects = [];
        this.gameArea.refreshGameArea(this);
        clearInterval(this.gameInterval.id)
    }

    /**
     * Updates the player's velocity for left or right movement based on arrow key presses.
     *
     * @param {string} key - the key pressed.
     */
    startMovePlayer(key) {
        const x = key === "ArrowRight"
            ? 2
            : -2
        this.player.velocity = new Vector(x, 0)
    }

    /**
     * Stops player
     *
     */
    stopMovePlayer() {
        this.player.velocity = new Vector(0, 0)
    }

    /**
     * Creates a row of bricks for the ball to interact with.
     *
     */
    spawnBricks(bricks) {
        console.log('<----[(=| bricks |=)]---->', bricks)
        for (const brickData of bricks) {
            const brick = new Brick(brickData.x, 25, this.entities.bricks[brickData.type]);
            this.gameObjects.push(brick)
        }


    }

    generateBrickLine() {
        const n = Math.round(this.gameArea.canvas.width / 70)
        const offset = 20;


        return Array(n)
            .fill({})
            .map((item, i) => {
                return {type: 'ultra', x: offset + i * 65, powerUps: []}
            })
    }

    /**
     * Updates the player's score and displays it.
     *
     */
    setScore(score) {
        this.score = score;
        document.querySelector("#score-output").innerHTML = this.score;
    }

    /**
     * Handles the game over sequence, stopping gameplay and displaying a game over message
     *
     */
    gameOver() {
        console.log("GAME OVER")
        setTimeout(() => {
            this.stop();
            this.gameArea.showGameOver(this.score);
        }, 1)
    }

    /**
     * Sets up event listeners for keyboard input (player movement) and the custom 'game-over' event.
     *
     */
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