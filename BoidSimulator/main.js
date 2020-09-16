const NUM_BIRDS = 100;
const HEIGHT= 32;
const BASE = 14;
const SPEED = 0.1;
const ROTATION_SPEED = 0.03;
const RADIUS = 1.1;

class Bird {
    constructor(id, posX, posY, angle) {
        angle = -1*angle;
        this.id = id;
        this.posX = posX;
        this.posY = posY;
        this.angle = angle;
        let node = document.createElement("div");
        node.innerHTML = '<div id="' + id.toString()  + '"></div>';
        document.getElementById("birds").appendChild(node);
        this.el = document.getElementById(id.toString());
        this.startTriangle();

        //120 to 30
    
    }

    startTriangle() {
        this.el.style.position = "absolute";
        this.el.style.height = "0";
        this.el.style.width = "0";
        this.el.style.borderTop = (BASE).toString() + "px solid transparent";
        this.el.style.borderLeft = (HEIGHT).toString() + "px solid red";
        if(this.id == "1")
        this.el.style.borderLeft = (HEIGHT).toString() + "px solid blue";
        this.el.style.borderBottom = (BASE).toString() + "px solid transparent";
        this.el.style.left = (this.posX).toString() + "%";
        this.el.style.top = (this.posY).toString() + "%";
        this.el.style.transform = "rotate(" + (this.angle).toString() + "deg)";
    }

    move = (angle) => {
        this.angle -= ROTATION_SPEED * (this.angle - -1 *angle);
        this.posX += SPEED*Math.cos(this.angle*Math.PI/180);
        this.posY += SPEED*Math.sin(this.angle*Math.PI/180);
        if(this.posX > 102) this.posX = -2;
        if(this.posX < -2) this.posX = 102;
        if(this.posY > 102) this.posY = -2;
        if(this.posY < -2) this.posY = 102;
        this.el.style.left = (this.posX).toString() + "%";
        this.el.style.top = (this.posY).toString() + "%";
        this.el.style.transform = "rotate(" + (this.angle).toString() + "deg)";
    }


    cohesion(birds) {
        let px = 0;
        let py = 0;
        let neightborCount = 0;
        for(let i = 0; i < NUM_BIRDS; ++i ) {
            let dis = Math.sqrt(Math.pow((this.posX - birds[i].posX), 2) + Math.pow((this.posY - birds[i].posY), 2));
            if(dis > 0 && dis < RADIUS) {
                px += birds[i].posX;
                py += birds[i].posY;
                neightborCount++;
            }
        } 
        if(neightborCount > 0) {
            px /= neightborCount;
            py /= neightborCount;
            return Math.atan2((this.posY-py),(px-this.posX));
        } 
        return this.angle*-1;
    }

    alignment(birds) {
        let avgAngle = 0;
        let neightborCount = 0;
        for(let i = 0; i < NUM_BIRDS; ++i ) {
            let dis = Math.sqrt(Math.pow((this.posX - birds[i].posX), 2) + Math.pow((this.posY - birds[i].posY), 2));
            if(dis > 0 && dis < RADIUS) {
                avgAngle += birds[i].angle;
                neightborCount++;
            }
        } 
        if(neightborCount > 0) {
            return avgAngle/neightborCount * -1;
        }
        return this.angle * -1;

    }

    separation(birds) {
        let avgAngle = 0;
        let neightborCount = 0;
        for(let i = 0; i < NUM_BIRDS; ++i ) {
            let dis = Math.sqrt(Math.pow((this.posX - birds[i].posX), 2) + Math.pow((this.posY - birds[i].posY), 2));
            if(dis > 0 && dis < RADIUS) {
                avgAngle += birds[i].angle;
                neightborCount++;
            }
        } 
        if(neightborCount > 0) {
            return avgAngle/neightborCount * -1 + 90;
        }
        return this.angle * -1;

    }


}

document.addEventListener("DOMContentLoaded", function(event) { 
    let birds = {};
    for(let i = 0; i < NUM_BIRDS; ++i) {
        birds[i] = new Bird(i+1, Math.random() * 100, Math.random() * 100, Math.random() * 360);
    }
    setInterval(function() {
        for(let i = 0; i < NUM_BIRDS; ++i) {
            birds[i].move((birds[i].cohesion(birds) + birds[i].alignment(birds) + birds[i].separation(birds))/3);
        }
    }, 0.1);


});

