class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDirection() {
        if (this.x === 0 && this.y === 0) {
            return 'none'
        }
        if (this.x < 0 && this.y > 0) {
            return 'top-left'
        }
        if (this.x > 0 && this.y > 0) {
            return 'top-right'
        }
        if (this.x < 0 && this.y < 0) {
            return 'bottom-left'
        }
        if (this.x > 0 && this.y < 0) {
            return 'bottom-right'
        }
    }


}