/*------ cached element references ------*/
//canvas related constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasW = ctx.canvas.width;
const canvasH = ctx.canvas.height;
const goalW = 20;
const goalH = canvasH/2;


/*------ constanats ------*/
//canvas related constants
radians_360 = (Math.Pi)*2;
const rinkCoord = {
    cL: {x1: canvasW/2, y1: 0, x2: canvasW/2, y2: canvasH, color: 'red', lineWidth: 5},
    homeBl: {x1: canvasW/3, y1: 0, x2: canvasW/3, y2: canvasH, color: 'blue', lineWidth: 5},
    awayBl: {x1: canvasW*(2/3), y1: 0, x2: canvasW*(2/3), y2: canvasH, color: 'blue', lineWidth: 5},
    homeGoal: {x1: 0, y1: canvasH/4, w: goalW, h: goalH, color: 'black'},
    awayGoal: {x1: canvasW - goalW, y1: canvasH/4, w: goalW, h: goalH, color: 'black'},
    centerCir: {x1: canvasW/2, y1: canvasH/2, r: 60, start: 0, end: Math.PI*2, color: 'blue'},
    drawLineOnRink: function(line) {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.lineWidth = line.lineWidth;
        ctx.strokeStyle = line.color;
        ctx.stroke();
    },
    drawGoal: function(goal) {
        ctx.beginPath();
        ctx.fillStyle = goal.color;
        ctx.fillRect(goal.x1, goal.y1, goal.w, goal.h);
        ctx.fill();
    },
    drawCircle: function(cir) {
        ctx.beginPath();
        ctx.strokeStyle = cir.color;
        ctx.arc(cir.x1, cir.y1, cir.r, cir.start, cir.end);
        ctx.stroke();
        ctx.closePath();
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

    //draw home goal area
    rinkCoord.drawGoal(rinkCoord.homeGoal);

    //draw away goal area
    rinkCoord.drawGoal(rinkCoord.awayGoal);

    //draw center circle
    rinkCoord.drawCircle(rinkCoord.centerCir);


}

drawRink();