class Brick extends GameObject{
    constructor(x, y, brickParams) {
        super('brick', x, y, 60, 30, brickParams.colors[0]);

        this.colors = brickParams.colors;
        this.hp = brickParams.hp;
        this.score = brickParams.score;
        this.powerUps = brickParams.powerUps;
    }
}