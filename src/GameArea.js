class GameArea{
    constructor(){
        this.canvas = null;
        this.origo = {x:0, y:0}
    }
    initGameArea(parent, width = 500, height = 500){
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.style.backgroundColor = "#DDAACC";
        parent.appendChild(canvas);

        this.origo.x = width/2;
        this.origo.y = height/2;

        this.canvas = canvas;
    }
    getContext(){
        return this.canvas.getContext("2d");
    }

    refreshGameArea(){
        const context = this.getContext();
        context.fillStyle = '#DDAACC'
        context.fillRect(0,0, this.canvas.width, this.canvas.height);
        context.fill();
    }
}