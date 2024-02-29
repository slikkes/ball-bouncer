class GameArea {
    constructor() {
        this.canvas = null;            // This will store a reference to the game's canvas element.
        this.origo = {x: 0, y: 0}      // An object with x and y properties representing the center point of the canvas.
    }

    /**
     * Creates and sets canvas
     *
     * @param {Element} parent - The HTML element where the game's canvas will be placed.
     * @param {number} width - (Optional) Width of the canvas. Defaults to 500 pixels.
     * @param {number} height - (Optional) Height of the canvas. Defaults to 500 pixels.
     *
     */
    initGameArea(parent, width = 500, height = 500) {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.style.backgroundColor = "#DDAACC";
        parent.appendChild(canvas);

        this.origo.x = width / 2;
        this.origo.y = height / 2;

        this.canvas = canvas;
    }

    /**
     * Returns the 2D drawing context of the canvas.
     *
     * @return {CanvasRenderingContext2D} - The 2D drawing context of the game's canvas.
     *
     */
    getContext() {
        return this.canvas.getContext("2d");
    }

    /**
     * Clears the canvas by drawing a rectangle over the entire area, effectively resetting it for the next frame's rendering.
     *
     */
    refreshGameArea() {
        const context = this.getContext();
        context.fillStyle = '#DDAACC'
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.fill();
    }

    /**
     * Displays a "GAME OVER" message along with the player's final score on the canvas.
     *
     * @param {number} score - The final score
     *
     */
    showGameOver(score) {
        const context = this.getContext();
        context.fillStyle = 'black';
        context.font = "50px serif";
        context.fillText("GAME OVER", 50, 90);

        context.fillStyle = 'gold';
        context.font = "80px serif";
        context.fillText(score, 50, 190);
    }
}