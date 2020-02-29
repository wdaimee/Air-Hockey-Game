/*------ cached element references ------*/
//canvas related constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasW = ctx.canvas.width;
const canvasH = ctx.canvas.height;


/*------ constanats ------*/
//canvas related constants
radians_360 = (Math.Pi)*2;
const rinkCoord = {
    cL: {x1: canvasW/2, y1: 0, x2: canvasW/2, y2: canvasH, color: 'red', lineWidth: 5},
    homeBl: {x1: canvasW/3, y1: 0, x2: canvasW/3, y2: canvasH, color: 'blue', lineWidth: 5},
    awayBl: {x1: canvasW*(2/3), y1: 0, x2: canvasW*(2/3), y2: canvasH, color: 'blue', lineWidth: 5},
    drawLineOnRink: function(line) {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.lineWidth = line.lineWidth;
        ctx.strokeStyle = line.color;
        ctx.stroke();
    }
};

/*------ app's state variables ------*/

/*------ event listeners ------*/

/*------ functions ------*/

//draw the background rink
function drawRink() {
    
    //set background colour to blue
    ctx.beginPath();
    ctx.fillStyle = '#d7f6fb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    
    //draw center line of rink
    rinkCoord.drawLineOnRink(rinkCoord.cL);

    //draw home blue line of rink
    rinkCoord.drawLineOnRink(rinkCoord.homeBl);

    //draw away blue line of rink
    rinkCoord.drawLineOnRink(rinkCoord.awayBl);


}

drawRink();