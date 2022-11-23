window.addEventListener('load', function(){

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let enemyleNum = 5;
let enemyArray = [];
let playerArray = [];
let bulletArray = [];
let bullet = false;
let score = 0;

let bot_image = document.getElementById('space_bot');
let shoot_music = document.getElementById('shoot_music');
let space_boom_image = this.document.getElementById('space_boom');
let background_music = document.getElementById('background_music');
let space_background_image = document.getElementById('space_background');
let player_down_image = document.getElementById('space_player_down');
let player_left_image = document.getElementById('space_player_left');
let player_right_image = document.getElementById('space_player_right');
let space_bullet_green_image = document.getElementById('space_bullet_green');

let keydown_info = {
    key: 'down',
}

let components = {
    bot: bot_image,
    space_boom: space_boom_image,
    player_down: player_down_image,
    player_left: player_left_image,
    player_right: player_right_image,
    space_background: space_background_image,
    space_bullet_green: space_bullet_green_image,
}


class Enemy {
    constructor(){
        this.x = canvas.width/4;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.speed = 10;
        this.width = 100;
        this.height = 100;
        this.score = false;
        this.dead = false;
        this.color = 'red';
        this.originalDead = false;
    }
    uptade(){
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(){
        // ctx.beginPath()
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.originalDead==false&&this.dead==false) {
            ctx.drawImage(components.bot, this.x, this.y, this.width, this.height);
        }
        else{
            ctx.drawImage(components.space_boom, this.x, this.y, this.width, this.height);
        }
        ctx.fill();
    }
}

class Player {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 150;
        this.speed = 0.1;
        this.width = 150;
        this.height = 150;
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

class Bullet {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 10;
        this.width = 20;
        this.height = 40;
        this.color = 'green';
        this.colision = false;
    }
    uptade(){
        this.x += this.vx;
        this.y -= this.vy;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.drawImage(components.space_bullet_green, this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}


function init() {
    playerArray.push(new Player());
    for (let i = 0; i < enemyleNum; i++) {
        enemyArray.push(new Enemy());
    }
    let num = enemyArray[0].x;
    for (let i = 0; i < enemyArray.length; i++) {
        enemyArray[i].x = num;
        num += 120;
    }

} init();


function draw(){
    playerArray[0].uptade();
    playerArray[0].draw();
    for (let i = 0; i < enemyArray.length; i++) {
        if (enemyArray[i].originalDead==false) {
            enemyArray[i].uptade();
            enemyArray[i].draw();
        }
    }
    for (let i = 0; i < bulletArray.length; i++) {
        bulletArray[i].uptade();
        bulletArray[i].draw();
    }
    ctx.fillStyle = 'red';
    ctx.font = '50px san-serif';
    ctx.fillText(`Score: ${score}`, 100, 100);
    ctx.fill();
}

window.addEventListener('keyup', function(e){
    let keycode = e.key;
    if (keycode==' ') {
        let newBullet = new Bullet();
        newBullet.x = playerArray[0].x + (playerArray[0].width/2.3);
        newBullet.y = playerArray[0].y - playerArray[0].height/2;
        bulletArray.push(newBullet);
    }
});

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(components.space_background, 0, 0, canvas.width, canvas.height);

    draw();
    keydownPlayer();
    handleColision();

    requestAnimationFrame(animate);
}

animate()


function handleColision() {
    
    for (let i = 0; i < enemyArray.length; i++) {
        for (let e = 0; e < bulletArray.length; e++) {
            let enemy = enemyArray[i];
            let bullet = bulletArray[e];
            if (enemy.x < bullet.x
                &&enemy.x + enemy.width > bullet.x
                &&bullet.y < enemy.y + enemy.height
                &&enemy.dead==false
                &&enemy.score==false) {
                enemy.dead = true;
                score++;
                setTimeout(() => {
                    enemy.originalDead = true;
                }, 500);
            }
        }
    }

}

function player_push() {
    if (keydown_info.key=='left'&&playerArray[0].x > 0) {
        playerArray[0].originalX -= playerArray[0].speed;
    }
    else if (keydown_info.key=='right'&&playerArray[0].x<canvas.width-playerArray[0].width) {
        playerArray[0].originalX += playerArray[0].speed;
    }
    else if (keydown_info.key=='down') {
        // paste down fun()
    }
    playerArray[0].uptade();
    playerArray[0].draw();
}

function keydownPlayer() {
    window.addEventListener('keydown', function (e) {
        let keycode = e.key;
        if (keycode=='ArrowLeft') {
            keydown_info.key = 'left';
            player_push();
        }
        else if (keycode=='ArrowRight') {
            keydown_info.key = 'right';
            player_push();
        }
        // else if (keycode) {
        //     keydown_info.key = 'down';
        // }
    })
    window.addEventListener('keyup', function (e) {
        let keycode = e.key;
        if (keycode=='ArrowLeft') {
            keydown_info.key = 'down';
        }
        if (keycode=='ArrowRight') {
            keydown_info.key = 'down';
        }
    })
}

})

// ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x -20, this.y - 12, this.width * 1.7, this.height * 1.7);