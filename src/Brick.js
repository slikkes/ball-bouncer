class Brick extends GameObject{
    constructor(x, y, brickParams) {
        super('brick', x, y, 60, 30, brickParams.colors[brickParams.colors.length-1]);

        this.colors = brickParams.colors.slice();
        this.totalHp = brickParams.hp;
        this.hp = brickParams.hp;
        this.score = brickParams.score;
        this.powerUps = brickParams.powerUps;
    }

    decreaseHP(){
        this.hp --;
        this.iframes = 50;

        if (this.hp <= 0){
            this.destroy();

            return 0;
        }

        const unit = this.totalHp / this.colors.length;
        const level = Math.ceil(this.hp / unit);

        this.color = this.colors[level-1]

        return this.hp;
    }

}