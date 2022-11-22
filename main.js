window.addEventListener('load', function(){

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let bot_image = document.getElementById('space_bot');
let space_background_image = document.getElementById('space_background');
let player_down_image = document.getElementById('space_player_down');
let player_left_image = document.getElementById('space_player_left');
let player_right_image = document.getElementById('space_player_right');
let space_bullet_green_image = document.getElementById('space_bullet_green');


// bot_image.src = 'images/space_bot.png';
// player_down_image.src = 'images/space_player_down.png';
// player_left_image.src = 'images/space_player_left.png';
// player_right_image.src = 'images/space_player_right.png';
// space_bullet_green.src = 'images/space_bullet_green.png';

let keydown_info = {
    key: 'down',
}

let components = {
    bot: bot_image,
    player_down: player_down_image,
    player_left: player_left_image,
    player_right: player_right_image,
    space_background: space_background_image,
    space_bullet_green: space_bullet_green_image,
}


let enemyleNum = 10;
let enemyArray = [];
let playerArray = [];

ctx.drawImage(components.space_background, 0, 0, canvas.width, canvas.height);

function player_push() {
    playerArray.pop();
    playerArray.push(new Player());
    playerArray[0].uptade();
    playerArray[0].draw();
}

class Enemy {
    constructor(){
        this.x = 350;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.speed = 10;
        this.width = 100;
        this.height = 100;
        this.score = true;
        this.dead = false;
        this.color = 'red';
    }
    uptade(){
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(){
        // ctx.beginPath()
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(components.bot, this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

class Player {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 5;
        this.speed = 10;
        this.width = 150;
        this.height = 200;
        this.originalX = canvas.width / 2.2;
        this.originalY = canvas.height - this.height - 10;
        this.dead = false;
        this.color = 'blue';
    }
    uptade(){
        // this.x += this.vx;
        // this.y += this.vy;
        this.x = this.originalX;
        this.y = this.originalY;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (keydown_info.key=='down') {
            ctx.drawImage(components.player_down, this.x, this.y, this.width, this.height);
        }
        if (keydown_info.key=='left') {
            ctx.drawImage(components.player_left, this.x, this.y, this.width, this.height);
        }
        if (keydown_info.key=='right') {
            ctx.drawImage(components.player_right, this.x, this.y, this.width, this.height);
        }
        ctx.fill();
    }
}

function init() {
    playerArray.push(new Player());
    playerArray[0].uptade();
    playerArray[0].draw();
    for (let i = 0; i < enemyleNum; i++) {
        enemyArray.push(new Enemy());
    }
    let num = 0;
    for (let i = 0; i < enemyArray.length; i++) {
        if (i==10) {
            num = 0;
            enemyArray[i].x += num;
        }
        // else if (i>10) {
        //     enemyArray[i].x += num;
        //     enemyArray[i].y += enemyArray[i].y + 250;
        //     num += 180;
        // }
        else{
            enemyArray[i].x += num;
            num += 130;
        }
        enemyArray[i].uptade();
        enemyArray[i].draw();
    }

}
init();

function keydownPlayer() {
    window.addEventListener('keydown', function (e) {
        let keycode = e.key;
        if (keycode=='ArrowLeft') {
            keydown_info.key = 'left';
            player_push();
        }
    })
}

function handleColision() {
    
    for (let i = 0; i < enemyArray.length; i++) {

    }

}

function animate(){
    keydownPlayer();
    handleColision();
    // drawBackground();
    requestAnimationFrame(animate);
}

animate()

})