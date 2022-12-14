window.addEventListener('load', function(){

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let hue = 0;
let score = 0;
let enemyNum = 0;
let enemyArray = [];
let playerArray = [];
let bulletArray = [];
let particleArray = [];
let enemy_recovery_time = 1000;

let bot_image = document.getElementById('space_bot');
let boom_music = document.getElementById('boom_music');
let shoot_music = document.getElementById('shoot_music');
let space_boom_image = this.document.getElementById('space_boom');
let background_music = document.getElementById('background_music');
let player_down_image = document.getElementById('space_player_down');
let player_left_image = document.getElementById('space_player_left');
let player_right_image = document.getElementById('space_player_right');
let space_background_image = document.getElementById('space_background');
let space_bullet_green_image = document.getElementById('space_bullet_green');
let space_bullet_green_boom_image = this.document.getElementById('space_bullet_green_boom');
let bomb_sprites = [];

let keydown_info = {
    key: 'down',
}

let components = {
    bot: bot_image,
    boom: boom_music,
    shoot: shoot_music,
    background: background_music,
    space_boom: space_boom_image,
    player_down: player_down_image,
    player_left: player_left_image,
    player_right: player_right_image,
    space_background: space_background_image,
    space_bullet_green: space_bullet_green_image,
    space_bullet_green_boom: space_bullet_green_boom_image,
}

class Particle {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = 'hsl('+ hue + ', 100%, 50%)'
    }
    uptade(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size>0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill()
    }
}

class Enemy {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 2;
        this.right = 0;
        this.frame = 0;
        this.speed = 10;
        this.width = 100;
        this.height = 100;
        this.bullet = 0;
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
        else if(this.frame%1 === 0&&this.frame<6){
            ctx.drawImage(bomb_sprites[this.frame], this.x, this.y, this.width, this.height);
            this.frame++;
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
        this.frame = 0;
        this.size = 150;
        this.speed = 40;
        this.width = 150;
        this.height = 150;
        this.originalX = canvas.width / 2.2;
        this.originalY = canvas.height - this.height - 100;
        this.originalDead = false;
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
        if (this.dead==false) {
            if (keydown_info.key=='down') {
                ctx.drawImage(components.player_down, this.x, this.y, this.width, this.height);
            }
            if (keydown_info.key=='left') {
                ctx.drawImage(components.player_left, this.x, this.y, this.width, this.height);
            }
            if (keydown_info.key=='right') {
                ctx.drawImage(components.player_right, this.x, this.y, this.width, this.height);
            }
        }
        else{
            if(this.frame%1 === 0&&this.frame<6){
                ctx.drawImage(bomb_sprites[this.frame], this.x, this.y, this.width, this.height);
                this.frame++;
            }
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
        this.push = null;
        this.color = 'green';
        this.remove = false;
        this.colision = false;
    }
    uptade(){
        if (this.colision == false) {
            this.x += this.vx;
            this.y -= this.vy;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        if (this.colision==false) {
            ctx.drawImage(components.space_bullet_green, this.x, this.y, this.width, this.height);
        }
        else{
            ctx.drawImage(components.space_bullet_green_boom, this.x, this.y, this.width, this.height);
        }
        ctx.fill();
    }
}


function init() {
    playerArray.push(new Player());
    for (let i = 0; i < enemyNum; i++) {
        enemyArray.push(new Enemy());
    }
    for (let i = 1; i < 7; i++) {
        let image = document.getElementById(`bomb-${i}`);
        bomb_sprites.push(image);
    }

} init();


function draw(){
    playerArray[0].uptade();
    playerArray[0].draw();
    enemyArray.forEach(function (enemy) {
        if (enemy.x + enemy.width > canvas.width) {
            enemy.vx = -2;
        }
        else if (enemy.x < 0) {
            enemy.vx = 2;
        }
    })
    for (let i = 0; i < enemyArray.length; i++) {
        if (enemyArray[i].originalDead==false) {
            for (let x = 0; x < enemyArray.length; x++) {
                if (enemyArray[i].x == enemyArray[x].x) {
                    enemyArray[i].x == Math.random() * canvas.width;
                }
            }
            enemyArray[i].uptade();
            enemyArray[i].draw();   
        }
    }
    for (let i = 0; i < bulletArray.length; i++) {
        if (bulletArray[i].remove==false) {
            bulletArray[i].uptade();
            bulletArray[i].draw();
        }
    }
    for (let i = 0; i < particleArray.length; i++) {
        let particle = particleArray[i];
        if (particle.size > 2) {
            particle.uptade();
            particle.draw();
        }
    }
    ctx.fillStyle = 'red';
    ctx.font = '50px san-serif';
    ctx.fillText(`Score: ${score}`, 100, 100);
    components.background.play();
    ctx.fill();
}


function enemy_bullet() {
    for (let i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i];
        if (enemy.dead==false) {
            if (enemy.bullet<200) {
                enemy.bullet+=1;
            }
            else if (enemy.bullet>=100){
                enemy.bullet = 0;
                let newBullet = new Bullet();
                newBullet.vy = -10;
                newBullet.push = 'enemy';
                newBullet.y = enemy.y + enemy.height/2;
                newBullet.x = enemy.x + (enemy.width/2.3);
                bulletArray.push(newBullet);
            }
        }
    }
}

window.addEventListener('keyup', function(e){
    let keycode = e.key;
    if (keycode==' '&&playerArray[0].dead==false) {
        let newBullet = new Bullet();
        newBullet.x = playerArray[0].x + (playerArray[0].width/2.3);
        newBullet.y = playerArray[0].y - playerArray[0].height/2;
        newBullet.push = 'player';
        bulletArray.push(newBullet);
        components.shoot.play();
    }
});

function create_enemy_fun(){
    let new_enemy = new Enemy();
    let random = Math.random() * canvas.width;
    new_enemy.x = random;
    enemyArray.push(new_enemy);
}

let create_enemy = setInterval(() => {
    if (playerArray[0].dead==false) {
        create_enemy_fun();
    }
}, enemy_recovery_time);

function reload_game(){
    score = 0;
    enemyArray.length = 0;
    bulletArray.length = 0;
    playerArray[0].dead = false;
    playerArray[0].originalDead = false;
}

function animate(){
    let reload_box = document.querySelector('.controllers');
    if (playerArray[0].originalDead==false) {
        reload_box.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(components.space_background, 0, 0, canvas.width, canvas.height);

        draw();
    }
    else{
        components.background.play();
        reload_box.style.display = 'flex';
        document.getElementById('score_text').innerHTML = `Your score is:  ${score}`;
        document.getElementById('reload_button').addEventListener('click', function(){
            reload_game();
        })
    }
    enemy_bullet();
    handleColision();
    requestAnimationFrame(animate);
}

animate()


function handleColision() {
    
    for (let i = 0; i < enemyArray.length; i++) {
        for (let e = 0; e < bulletArray.length; e++) {
            let enemy = enemyArray[i];
            let bullet = bulletArray[e];
            let player = playerArray[0];
            // enemy & bullet colision
            if (enemy.x < bullet.x
                &&enemy.x + enemy.width > bullet.x
                &&enemy.y < bullet.y
                &&bullet.y < enemy.y + enemy.height
                &&bullet.colision == false
                &&bullet.push=='player'
                &&enemy.dead==false
                &&enemy.score==false) {
                    bullet.colision = true;
                    bullet.width = canvas.width / 30;
                    bullet.height = bullet.width;
                    bullet.x = bullet.x - 25;
                    bullet.y = bullet.y - 25;
                    components.boom.play();
                    enemy.dead = true;
                    score++;
                setTimeout(() => {
                    bullet.remove = true;
                }, 200);
                setTimeout(() => {
                    enemy.originalDead = true;
                }, 1000);
            }
            // player & bullet colision
            if (player.x < bullet.x
                &&player.x + player.width > bullet.x
                &&player.y < bullet.y
                &&bullet.y < player.y + player.height
                &&bullet.colision == false
                &&bullet.push=='enemy'
                &&player.dead==false) {
                    bullet.colision = true;
                    bullet.width = canvas.width / 30;
                    bullet.height = bullet.width;
                    bullet.x = bullet.x - 25;
                    bullet.y = bullet.y - 25;
                    components.boom.play();
                    player.dead = true;
                setTimeout(() => {
                    bullet.remove = true;
                }, 200);
                setTimeout(() => {
                    player.originalDead = true;
                }, 500);
            }
        }
    }

}

function player_push() {
    if (playerArray[0].dead==false) {
    // hue++;
    // for (let i = 0; i < 1; i++) {
    //     let newParticle = new Particle();
    //     newParticle.x = playerArray[0].x + playerArray[0].width;
    //     newParticle.y = playerArray[0].y + playerArray[0].width/2;
    //     particleArray.push(newParticle);
    // }
    if (keydown_info.key=='left'&&playerArray[0].x > 0) {
        playerArray[0].originalX -= playerArray[0].speed;
    }
    else if (keydown_info.key=='right'&&playerArray[0].x + playerArray[0].width <canvas.width) {
        playerArray[0].originalX += playerArray[0].speed;
    }
    else if (keydown_info.key=='down') {
        // paste down fun()
    }
    }
}

window.addEventListener('keydown', function (e) {
    let keycode = e.key;
    if (keycode=='ArrowLeft') {
        keydown_info.key = 'left';
        player_push();
        // setTimeout(() => {
        //     keydown_info.key = 'down';
        // }, 10);
    }
    else if (keycode=='ArrowRight') {
        keydown_info.key = 'right';
        player_push();
        // setTimeout(() => {
        //     keydown_info.key = 'down';
        // }, 10);
    }
})

window.addEventListener('keyup', function(e){
    let keycode = e.key
    if (keycode=='ArrowLeft') {
        keydown_info.key = 'down';
        player_push();
    }
    else if (keycode=='ArrowRight') {
        keydown_info.key = 'down';
        player_push();
    }
})

})

