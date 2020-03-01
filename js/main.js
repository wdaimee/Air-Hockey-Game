/*------ cached element references ------*/
//canvas related constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//start button
const start_btn = document.querySelector('.start-btn');

/*------ constanats ------*/
//puck realted constants
    //radius of puck
let rPuck = 20;
    //amount to increment puck when frame refreshed
let dxPuck = 2;
let dyPuck = 2;

//canvas related constants
const canvasW = ctx.canvas.width;
const canvasH = ctx.canvas.height;
const goalW = 20;
const goalH = canvasH/2;
const paddleRadius = 30;
//object that holds coordinates for drawing rink background as well as methods to draw the background to canvas
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

//object for player information, intial position of paddles
const players = {
    home: {x1: canvasW/8, y1: canvasH/2, r: paddleRadius, color: 'red', score: 0},
    away: {x1: canvasW*(7/8), y1: canvasH/2, r: paddleRadius, color: 'blue', score: 0},
    drawPaddle: function(team) {
        ctx.beginPath();
        ctx.fillStyle = team.color;
        ctx.arc(team.x1, team.y1, team.r, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(team.x1, team.y1, team.r/2, 0, Math.PI*2);
        ctx.stroke();
    }
};

/*------ app's state variables ------*/
//state variables related to controls
    //away team control state variables
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

    //home team control state variables
let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;

//puck initial coordinates
let xPuck = canvasW/2;
let yPuck = canvasH/2;

/*------ event listeners ------*/

start_btn.addEventListener('click', startGame);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

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

//function to draw the main puck element of the game
function drawPuck() {
    ctx.beginPath();
    ctx.arc(xPuck, yPuck, rPuck, 0, Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

//function to draw the user paddles
function drawPaddles() {
    players.drawPaddle(players.home);
    players.drawPaddle(players.away);

}

drawRink();
drawPuck();
drawPaddles();

function keyDown(evt) {
    if(evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(evt.key == "Up" || evt.key == "ArrowUp") {
        upPressed = true;
    }
    else if(evt.key == "Down" || evt.key == "ArrowDown") {
        downPressed = true;
    }
    else if(evt.key == "w") {
        wPressed = true;
    }
    else if(evt.key == "s") {
        sPressed = true;
    }
    else if(evt.key == "a") {
        aPressed = true;
    }
    else if(evt.key == "d") {
        aPressed = true;
    }

}

function keyUp(evt) {
    if(evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(evt.key == "Up" || evt.key == "ArrowUp") {
        upPressed = false;
    }
    else if(evt.key == "Down" || evt.key == "ArrowDown") {
        downPressed = false;
    }
    else if(evt.key == "w") {
        wPressed = false;
    }
    else if(evt.key == "s") {
        sPressed = false;
    }
    else if(evt.key == "a") {
        aPressed = false;
    }
    else if(evt.key == "d") {
        aPressed = false;
    }

}



//function for controls to move the paddles
function controls() {
    
}

function scoreGoal(team) {
    team.score += 1;

}


//function for starting the game
function startGame() {
    drawRink();
    drawPuck();
    drawPaddles();

    if(yPuck + rPuck > canvasH || yPuck < rPuck) {
        dyPuck = -dyPuck;
    }
    if((xPuck + rPuck > canvasW && (yPuck < canvasH/4 || yPuck > canvasH*(3/4))) || (xPuck < rPuck && (yPuck < canvasH/4 || yPuck > canvasH*(3/4)))) {
        dxPuck = -dxPuck;
    }
    if(xPuck + rPuck > canvasW && (yPuck > canvasH/4 || yPuck < canvasH*(3/4))) {
        scoreGoal(players.home);
    }
    else if(xPuck < rPuck && (yPuck > canvasH/4 || yPuck < canvasH*(3/4))) {
        scoreGoal(players.away);
    }

    console.log(players.home.score);
    console.log(players.away.score);


    xPuck += dxPuck;
    yPuck += dyPuck;


    requestAnimationFrame(startGame);


}

