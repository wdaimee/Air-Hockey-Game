/*------ cached element references ------*/
//canvas related constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const $msg = $('.msg-p');
const $homeScoreImg = $('.home-score-img');
const $awayScoreImg = $('.away-score-img');

//start button
const start_btn = document.querySelector('.start-btn');

/*------ constanats ------*/
//puck realted constants
    //radius of puck
const rPuck = 20;

//canvas related constants
const canvasW = ctx.canvas.width;
const canvasH = ctx.canvas.height;
const goalW = 20;
const goalH = canvasH/2;
const paddleRadius = 30;

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
//amount to increment puck when frame is refreshed
let dxPuck = 4;
let dyPuck = 4;
    
//home team paddle initial coordinates
let xHome = canvasW/8;
let yHome = canvasH/2;
//away team paddle initial coordinates
let xAway = canvasW*(7/8);
let yAway = canvasH/2;

//amount to increment paddle when frame is refreshed
let dxPaddle = 4;
let dyPaddle = 4;

//if goal scored turn to true
let goalScored = false;

//stopping the animantion frame after a goal
let stopAnimate;

/*------ Objects ------*/
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
    home: {name: "Home Team", x1: xHome, y1: yHome, r: paddleRadius, color: 'red', score: 0},
    away: {name: "Away Team", x1: xAway, y1: yAway, r: paddleRadius, color: 'blue', score: 0},
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

/*------ event handlers ------*/

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

function renderHomeScore() {
    if(players.home.score == 0) {
        $homeScoreImg.attr("src", "images/Home/0.png");
    }
    else if(players.home.score == 1) {
        $homeScoreImg.attr("src", "images/Home/1.png");
    }
    else if(players.home.score == 2) {
        $homeScoreImg.attr("src", "images/Home/2.png");
    }
    else if(players.home.score == 3) {
        $homeScoreImg.attr("src", "images/Home/3.png");
    }
    else if(players.home.score == 4) {
        $homeScoreImg.attr("src", "images/Home/4.png");
    }
}

function renderAwayScore() {
    if(players.away.score == 0) {
        $awayScoreImg.attr("src", "images/Away/0.png");
    }
    else if(players.away.score == 1) {
        $awayScoreImg.attr("src", "images/Away/1.png");
    }
    else if(players.away.score == 2) {
        $awayScoreImg.attr("src", "images/Away/2.png");
    }
    else if(players.away.score == 3) {
        $awayScoreImg.attr("src", "images/Away/3.png");
    }
    else if(players.away.score == 4) {
        $awayScoreImg.attr("src", "images/Away/4.png");
    }
}

function render() {
    drawRink();
    drawPuck();
    drawPaddles();
    renderHomeScore();
    renderAwayScore();
}

render();

function keyDown(evt) {
    if(evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = true;
    }
    if(evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(evt.key == "Up" || evt.key == "ArrowUp") {
        upPressed = true;
    }
    if(evt.key == "Down" || evt.key == "ArrowDown") {
        downPressed = true;
    }
    if(evt.key == "w") {
        wPressed = true;
    }
    if(evt.key == "s") {
        sPressed = true;
    }
    if(evt.key == "a") {
        aPressed = true;
    }
    if(evt.key == "d") {
        dPressed = true;
    }
}

function keyUp(evt) {
    if(evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = false;
    }
    if(evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(evt.key == "Up" || evt.key == "ArrowUp") {
        upPressed = false;
    }
    if(evt.key == "Down" || evt.key == "ArrowDown") {
        downPressed = false;
    }
    if(evt.key == "w") {
        wPressed = false;
    }
    if(evt.key == "s") {
        sPressed = false;
    }
    if(evt.key == "a") {
        aPressed = false;
    }
    if(evt.key == "d") {
        dPressed = false;
    }
}

//function for controls to move the paddles
function controls() {
  //controls for away team
    if(rightPressed) {
      players.away.x1 += dxPaddle;
      if(players.away.x1 > (canvasW - paddleRadius)) {
          players.away.x1 = canvasW - paddleRadius;
      }
    }
    else if(leftPressed) {
      players.away.x1 -= dxPaddle;
      if(players.away.x1 < ((canvasW/2) + paddleRadius)) {
          players.away.x1 = (canvasW/2) + paddleRadius;
      }
    }
    if(upPressed) {
      players.away.y1 -= dyPaddle;
      if(players.away.y1 < paddleRadius) {
          players.away.y1 = paddleRadius;
      }
    }
    else if(downPressed) {
      players.away.y1 += dyPaddle;
      if(players.away.y1 > (canvasH - paddleRadius)) {
          players.away.y1 = canvasH - paddleRadius;
      }
    }
  
  //controls for home team
    if(dPressed) {
      players.home.x1 += dxPaddle;
      if(players.home.x1 > (canvasW/2 - paddleRadius)) {
          players.home.x1 = canvasW/2 - paddleRadius;
      } 
    }
    else if(aPressed) {
      players.home.x1 -= dxPaddle;
      if(players.home.x1 < paddleRadius) {
          players.home.x1 = paddleRadius;
      }
    }
    if(wPressed) {
      players.home.y1 -= dyPaddle;
      if(players.home.y1 < paddleRadius) {
          players.home.y1 = paddleRadius;
      }
    }
    else if(sPressed) {
      players.home.y1 += dyPaddle;
      if(players.home.y1 > (canvasH - paddleRadius)) {
          players.home.y1 = canvasH - paddleRadius;
      }
    }  
}

function scoreGoal(team) {
    goalScored = true;
    $msg.text(`${team.name} SCORES!!!`);
    team.score += 1;
    renderHomeScore();
    renderAwayScore();
    
}

//function to detect collision between puck and paddles
function collisionDetection() {
    if(Math.sqrt(Math.pow((xPuck - players.home.x1),2) + Math.pow((yPuck - players.home.y1),2)) < paddleRadius + rPuck) {
        dxPuck = -dxPuck;
        dyPuck = -dyPuck;
    }
    if(Math.sqrt(Math.pow((xPuck - players.away.x1),2) + Math.pow((yPuck - players.away.y1),2)) < paddleRadius + rPuck) {
        dxPuck = -dxPuck;
        dyPuck = -dyPuck;
    }   
}

//function for starting the game
function startGame() {
    
    $msg.text('');
    render();
    controls();
    collisionDetection();
    
    if(yPuck + dyPuck > canvasH - rPuck || yPuck + dyPuck < rPuck) {
        dyPuck = -dyPuck;
    }
    if((xPuck + rPuck > canvasW && (yPuck - rPuck < canvasH/4 || yPuck + rPuck > canvasH*(3/4))) || (xPuck < rPuck && (yPuck - rPuck < canvasH/4 || yPuck + rPuck > canvasH*(3/4)))) {
        dxPuck = -dxPuck;
    }
    if(xPuck > canvasW && (yPuck - rPuck > canvasH/4 || yPuck + rPuck < canvasH*(3/4))) {
        scoreGoal(players.home);
    }
    else if(xPuck < 0 && (yPuck - rPuck > canvasH/4 || yPuck + rPuck < canvasH*(3/4))) {
        scoreGoal(players.away);
    }

    xPuck += dxPuck;
    yPuck += dyPuck;

    if(!goalScored) {
        stopAnimate = requestAnimationFrame(startGame);
    }
    else {
        cancelAnimationFrame(stopAnimate);
        xPuck = canvasW/2; 
        yPuck = canvasH/2;
        drawPuck();
    }

}

