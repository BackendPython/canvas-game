const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let bot_image = new Image();
let player_down_image = new Image();
let player_left_image = new Image();
let player_right_image = new Image();

bot_image.src = 'images/space_bot.png';
player_down_image.src = 'images/space_player_down.png';
player_left_image.src = 'images/space_player_left.png';
player_right_image.src = 'images/space_player_right.png';

const components = {
    bot: bot_image,
    player_down: player_down_image,
    player_left: player_left_image,
    player_right: player_right_image,
}


let particleArray = [];
let playerArray = [];
let particleNum = 10;

class Particle {
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
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
        this.width = 120;
        this.height = 200;
        this.originalX = canvas.width / 2.2;
        this.originalY = canvas.height - this.height - 10;
        this.dead = false;
        this.color = 'blue';
    }
    uptade(){
        this.x += this.vx;
        this.y += this.vy;
        this.x = this.originalX;
        this.y = this.originalY;
    }
    draw(){
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

function init() {
    playerArray.push(new Player());
    playerArray[0].uptade();
    playerArray[0].draw();
    for (let i = 0; i < particleNum; i++) {
        particleArray.push(new Particle());
    }
    let num = 0;
    for (let i = 0; i < particleArray.length; i++) {
        if (i==10) {
            num = 0;
            particleArray[i].x += num;
        }
        // else if (i>10) {
        //     particleArray[i].x += num;
        //     particleArray[i].y += particleArray[i].y + 250;
        //     num += 180;
        // }
        else{
            particleArray[i].x += num;
            num += 130;
        }
        particleArray[i].uptade();
        particleArray[i].draw();
    }

}
init();

function handleColision() {
    
}

function animate(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleColision();
    requestAnimationFrame(animate);
}

// animate()
