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
                            if(gameObject.powerUp){
                                this.spawnPowerUp(gameObject);
                            }
                        } else {
                            if (!ball.bounced) {
                                ball.bounce(collisionAxis)
                                ball.bounced = true;
                            }
                        }

                    } else if (gameObject.type === "player") {
                        const direction = ball.getCenterX() > gameObject.getCenterX()
                            ? "right"
                            : "left";


                        ball.bounce(collisionAxis)
                        if ((direction === "left" && ball.velocity.x > 0) || (direction === "right" && ball.velocity.x <= 0)) {
                            ball.bounceOnY();
                        }
                    } else  {
                        if(gameObject.type !== "power-up"){
                            ball.bounce(collisionAxis)
                        }
                    }
                }


                if(gameObject.type === "power-up"){


                    if (this.player.detectCollision(gameObject)){
                        gameObject.destroy();
                        if (gameObject.powerUp.type === "size"){
                            this.player.changeSize(gameObject.powerUp.level);
                        }
                        if (gameObject.powerUp.type === "playerSpeed"){
                            this.player.changeSpeed(gameObject.powerUp.level);
                        }
                        console.log('<----[(=| powerup catched |=)]---->', gameObject.powerUp, this.player);
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
     * Creates a row of bricks for the ball to interact with.
     *
     */
    spawnBricks(bricks) {

        for (const brickData of bricks) {
            const brickParams = JSON.parse(JSON.stringify( this.entities.bricks[brickData.type]));
            brickParams.powerUp = brickData.powerUp

            const brick = new Brick(brickData.x, 25, brickParams);
            this.gameObjects.push(brick)
        }
    }

    spawnPowerUp(brick){
        const powerUp = new PowerUp(brick.getCenterX(), brick.getCenterY(), brick.powerUp.type, brick.powerUp.level)
        this.gameObjects.push(powerUp)
    }
    generateBrickLine() {
        const n = Math.round(this.gameArea.canvas.width / 70)
        const offset = 20;


        return Array(n)
            .fill({})
            .map((item, i) => {
                let type = 'medium';
                const noPowerup = 0.5;
                let lastIntervalEnd = 0;

                const availablePowerUps = Object.entries(this.entities.powerUps)
                    .filter(([key, item]) => Object.keys(item.dropRate).includes(type))
                    .map(([key, item], idx) => {
                        const ret = JSON.parse(JSON.stringify(item))
                        ret.dropRate = item.dropRate[type];
                        ret.interval = [lastIntervalEnd + 0.01, lastIntervalEnd + ret.dropRate]
                        ret.level = Math.ceil(Math.random() * item.maxLevel);
                        ret.type = key;

                        lastIntervalEnd = ret.interval[1]
                        return ret;
                    })

                const rn = Math.random() * (lastIntervalEnd + noPowerup);
                let powerUp = null;
                if(rn < lastIntervalEnd){
                   powerUp = availablePowerUps.find(i => i.interval[0] <= rn && i.interval[1] >= rn)
                }



              //  return {type: type, x: offset + i * 65, powerUp}
                return {type: type, x: offset + i * 65, powerUp: {type: 'playerSpeed', level: 2}}
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
                this.player.startMovement(event.key.replace('Arrow','').toLowerCase())
                return;
            }


        });
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                this.player.stopMovement(event.key)
                return;
            }
        });
        document.addEventListener("game-over", () => {
            this.gameOver();
        });
    }
}