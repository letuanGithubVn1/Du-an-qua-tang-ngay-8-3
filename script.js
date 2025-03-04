// script.js
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = y;
        this.color = color;
        this.particles = [];
        this.speed = Math.random() * 3 + 4;
        this.exploded = false;
    }
    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.exploded = true;
                for (let i = 0; i < 50; i++) {
                    this.particles.push({
                        x: this.x,
                        y: this.y,
                        speed: Math.random() * 4 + 1,
                        angle: Math.random() * Math.PI * 2,
                        alpha: 1,
                    });
                }
            }
        } else {
            this.particles.forEach(p => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                p.alpha -= 0.02;
            });
            this.particles = this.particles.filter(p => p.alpha > 0);
        }
    }
    draw() {
        if (!this.exploded) {
            ctx.fillStyle = `rgb(${this.color})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            this.particles.forEach(p => {
                ctx.fillStyle = `rgba(${this.color}, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
}

let fireworks = [];
function createFirework() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2;
    let color = `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
    fireworks.push(new Firework(x, y, color));
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });
    fireworks = fireworks.filter(firework => firework.particles.length > 0 || !firework.exploded);
    requestAnimationFrame(animate);
}


function startCounting() {
    let counter = 0;
    let counterElement = document.getElementById("counter");
    let interval = setInterval(function() {
        counterElement.innerText = counter;
        counter++;
        if (counter > 20) {
            // clearInterval(interval);
            document.getElementById("second_message_").style.opacity = 1;
        }
        if (counter > 31) {
            clearInterval(interval);
            document.getElementById("second_message").remove();
            document.getElementById("third_message").style.opacity = 1;
            restartFireworks();
        }
    }, 1000); 
}


function startShow() {
    let count = 0;
    let interval = setInterval(() => {
        createFirework();
        count++;
        if (count > 8) {
            setTimeout(() => {
                document.getElementById("first_message").style.opacity = 1;
                // setTimeout(countdown, 2000);
            }, 1000);
        }
        if (count > 15) {
            clearInterval(interval);
            document.getElementById("first_message").remove();
            document.getElementById("second_message").style.opacity = 1;
            startCounting();
        }
    }, 500);
}

function restartFireworks() {
    setTimeout(() => {
        let burstCount = 6;
        for (let i = 0; i < burstCount; i++) {
            createFirework();
        }
    }, 1000);
}

animate();
startShow(); 

