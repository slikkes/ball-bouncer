class PowerUp extends GameObject {
    constructor(x, y, type, level) {
        super('power-up', x, y, 10, 10, '#d563de');
        this.velocity = new Vector(0, 1);
        this.powerUp = {type, level};
    }

}