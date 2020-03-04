/*------ cached element references ------*/
//canvas related constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const $msgp = $('.msg-p');
const $msgp2 = $('.msg-p2');
const $homeScoreImg = $('.home-score-img');
const $awayScoreImg = $('.away-score-img');
const $numPucks = $('.num-pucks > p');
const $pHowTo = $('.pHowTo');

//start button
const $start_btn = $('.start-btn');

//reset button
const $reset_btn = $('.reset-btn');

//how to play button
const $howTo_btn = $('.how-to-play-btn');

//audio
const $audioSiren = $('.siren');
const $audioShot = $('.shot');
const $audioCheer = $('.cheer');
const $audioBoo = $('.boo');
const $audioStart = $('.start-up');
const $audioBounce = $('.bounce');

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
let dxPuck = 6;
let dyPuck = 6;
    
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

//number of pucks left to play
let numPucks = 7;

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

$start_btn.click(startGame);
$reset_btn.click(reloadGame);
$howTo_btn.click(function() {
    $pHowTo.toggle();
});
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

//function to render the home score
function renderHomeScore() {
    switch(players.home.score) {
        case 0:
            $homeScoreImg.attr("src", "images/Home/0.png");
            break;
        case 1:
            $homeScoreImg.attr("src", "images/Home/1.png")
            break;
        case 2:
            $homeScoreImg.attr("src", "images/Home/2.png");
            break;
        case 3:
            $homeScoreImg.attr("src", "images/Home/3.png");
            break;
        case 4:
            $homeScoreImg.attr("src", "images/Home/4.png")
    }
}

//function to render the away score
function renderAwayScore() {
    switch(players.away.score) {
        case 0:
            $awayScoreImg.attr("src", "images/Away/0.png");
            break;
        case 1:
            $awayScoreImg.attr("src", "images/Away/1.png");
            break;
        case 2: 
            $awayScoreImg.attr("src", "images/Away/2.png");
            break;
        case 3:
            $awayScoreImg.attr("src", "images/Away/3.png");
            break;
        case 4:
            $awayScoreImg.attr("src", "images/Away/4.png");
            break;
    }
}

//function to render the number of pucks
function renderNumPucks() {
    $numPucks.text(`${numPucks} Pucks Left`);
    if(numPucks == 1) {
        $numPucks.text(`1 Puck Left`)
        $numPucks.addClass('animated pulse');
    }
}

//global render function to render all render functions
function render() {
    drawRink();
    drawPuck();
    drawPaddles();
    renderHomeScore();
    renderAwayScore();
    renderNumPucks();
}

//function to restart the game
function reloadGame() {
    document.location.reload();
}

//function for key down pressed
function keyDown(evt) {
    if(evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = true;
        evt.view.event.preventDefault();
    }
    if(evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = true;
        evt.view.event.preventDefault();
    }
    if(evt.key == "Up" || evt.key == "ArrowUp") {
        upPressed = true;
        evt.view.event.preventDefault();
    }
    if(evt.key == "Down" || evt.key == "ArrowDown") {
        downPressed = true;
        evt.view.event.preventDefault();
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

//function for key up pressed (need to stop travel of paddle when key up)
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

//function when a goal is scored, set goalScored variable to true and increment team score by 1 and deincrement num pucks
function scoreGoal(team) {
    goalScored = true;
    $msgp.text(`${team.name} SCORES!!!`);
    $msgp.removeClass('animated flash');
    $msgp.addClass('animated pulse');
    team.score += 1;
    numPucks -= 1;
    if(team.score < 4) {
        $audioSiren[0].play();
    }
    //win logic
    if(team.score == 4) {
        cancelAnimationFrame(stopAnimate);
        $msgp.text(`${team.name} WINS!`);
        $start_btn.prop('disabled', true);
        $reset_btn.prop('disabled', false);
        if(team == players.home) {
            $audioCheer[0].play();
        }
        else {
            $audioBoo[0].play();
        }
    }
}

//function to detect collision between puck and paddles
function collisionDetection() {
    //collision detection between puck and home player's paddle
    if(Math.sqrt(Math.pow((xPuck - players.home.x1),2) + Math.pow((yPuck - players.home.y1),2)) < paddleRadius + rPuck) {
        dxPuck = -dxPuck;
        dyPuck = dyPuck;
        $audioShot[0].play();
    }
    //collision detection between puck and away player's paddle
    if(Math.sqrt(Math.pow((xPuck - players.away.x1),2) + Math.pow((yPuck - players.away.y1),2)) < paddleRadius + rPuck) {
        dxPuck = -dxPuck;
        dyPuck = dyPuck;
        $audioShot[0].play();
    }   
}

//function to reinitialize starting coordinates of paddle and puck after a goal has been scored
function restartPosition() {
    xPuck = canvasW/2; 
    yPuck = canvasH/2;
    players.home.x1 = xHome;
    players.home.y1 = yHome;
    players.away.x1 = xAway;
    players.away.y1 = yHome;
}

//function for starting the game
function startGame() {
    //pause all audio and remove messages
    $audioStart[0].pause();
    $audioSiren[0].pause();
    $audioSiren[0].currentTime = 0;
    $msgp.text('');
    $msgp2.text('');
    render();
    controls();
    collisionDetection();
    
    //collision detection between puck and horizontal surfaces
    if(yPuck + dyPuck > canvasH - rPuck || yPuck + dyPuck < rPuck) {
        dyPuck = -dyPuck;
        $audioBounce[0].play();
    }
    //collision detection between puck and vertical surfaces
    if((xPuck + rPuck > canvasW && (yPuck - rPuck < canvasH/4 || yPuck + rPuck > canvasH*(3/4))) || (xPuck < rPuck && (yPuck - rPuck < canvasH/4 || yPuck + rPuck > canvasH*(3/4)))) {
        dxPuck = -dxPuck;
        $audioBounce[0].play();
    }
    //no collision detection in goal area on away side, if puck crosses area, run scoreGoal function for home team
    if(xPuck > canvasW && (yPuck - rPuck > canvasH/4 || yPuck + rPuck < canvasH*(3/4))) {
        scoreGoal(players.home);
    }
    //no collision detection in goal area on home side, if puck crosses area, run scoreGoal function for away team
    else if(xPuck < 0 && (yPuck - rPuck > canvasH/4 || yPuck + rPuck < canvasH*(3/4))) {
        scoreGoal(players.away);
    }

    //increment position of puck
    xPuck += dxPuck;
    yPuck += dyPuck;

    //if no goal has been scored, request new frame
    if(!goalScored) {
        stopAnimate = requestAnimationFrame(startGame);
    }
    //if a goal has been scored, cancel animation and return puck to center ice
    else if(goalScored) {
        cancelAnimationFrame(stopAnimate);
        restartPosition();
        goalScored = false;
        if(players.home.score <= 3 && players.away.score <= 3) {
            $msgp2.text('Press Start for the Next Puck');
        }
        else {
            $msgp2.text('');
        }
        //If one puck left, make the puck faster
        if(numPucks === 1){
            dxPuck = 10;
            dyPuck = 10;
        }
        render();        
    }

}

//render the game elements before start
document.onload = $audioStart[0].play();
$pHowTo.toggle();
render();
$reset_btn.prop('disabled', true);

