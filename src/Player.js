class Player extends GameObject {
    constructor(x, y) {
        super('player', x, y, 80, 15, 'green');
        this.speed = 2;
    }

    changeSize(size) {
        let unit = 6;
        let actualWidth =this.width + unit * size;
        let maxWidth = 200;
        if (actualWidth <= 0) {
            document.dispatchEvent(new CustomEvent('game-over'));
        }else{
            this.width = Math.min(actualWidth, maxWidth)
        }
    }
    changeSpeed(speed){

        let maxSpeed = 6;
        this.speed = Math.min(Math.max(1,this.speed+ speed),maxSpeed);

    }
    startMovement(direction){
        const x = direction === "right"
            ? this.speed
            : - this.speed
        this.velocity = new Vector(x, 0)
    }
    stopMovement(){
        this.velocity = new Vector(0, 0)
    }

}