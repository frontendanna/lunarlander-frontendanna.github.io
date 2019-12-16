width = windowWidth;
height = windowHeight;

// define colors
let white = color(255);
let black = color(0);
let gascolor = color(162, 181, 205);

// define states
let win = true;
let run = false;
let finish = false;

const ground = height * 0.9;

// variables
let count = 0;
let Textfield = "";
let capsule = {
    x: 0,
    y: 0,
    angle: 0,
    gas: 250,
    gasgas: 0,
    xSpeed: 0,
    ySpeed: 0
};

function draw() {
    Background();
    Instructions(width / 2, height / 2);

    if (finish) {
        Textfield = "";
        capsule.gasgas = 0;
        if (win) {
            Capsule(capsule.x, capsule.y, capsule.angle);
            Textfield = "Du hast es geschafft!";
            run = false;
        } else {
            if (count < 10) {
                count++;
            } else {
                Textfield = "Die Kapsel wurde zerstört!";
                run = false;
            }
        }
    } else if (run) {
        Capsule(capsule.x, capsule.y, capsule.angle);

        // check if capsule is outside of screen
        if (capsule.x < -10 || capsule.x > width + 10) {
            Textfield = "Tschüss Kapsel!";
            run = false;
        }
        // move capsule
        capsule.x += capsule.xSpeed;
        if (capsule.xSpeed > 0) {
            capsule.xSpeed -= 0.06;
        } else if (capsule.xSpeed < 0) {
            capsule.xSpeed += 0.05;
        }

        capsule.y += capsule.ySpeed;
        capsule.ySpeed += 0.1;
        capsule.xSpeed += capsule.angle * 0.005;

        if (capsule.gas) {
            if (keyIsDown(LEFT_ARROW)) {
                capsule.angle -= 3;
                capsule.gas--;
            } else if (keyIsDown(RIGHT_ARROW)) {
                capsule.angle += 3;
                capsule.gas--;
            }
            if (keyIsDown(UP_ARROW)) {
                capsule.ySpeed -= 0.3;
                capsule.gas--;
                capsule.gasgas += 1;
            } else if (capsule.gasgas > 0) {
                capsule.gasgas -= 2;
            }
        }
        // check if capsule hits ground
        if (capsule.y + 17 >= ground) {
            if (capsule.ySpeed > 2 || capsule.angle > 10 || capsule.angle < -10) {
                win = false;
            } else {
                win = true;
                capsule.gas = 100 + capsule.gas;
            }
            capsule.ySpeed = 0;
            finish = true;
        }
    }
}

function Background() {
    background(black);
    // planet
    ellipse(width / 3, height, width * 4, height * 0.2);

    // text center
    fill(255);
    if (Textfield !== "") {
        stroke(white);
        strokeWeight(2);
        fill(black);
        rectMode(CENTER);
        rect(width / 2, height / 2, 450, 170);
        fill(white);
        noStroke();
    }
    textAlign(CENTER, CENTER);
    textSize(20);
    text(Textfield, width / 2, height / 2);
}

function Capsule(x, y, angle) {
    // capsule
    noStroke();
    fill(white);
    rectMode(CENTER);
    push();
    translate(x, y);
    rotate(radians(angle));
    ellipse(0, 0, 18, 50);
    fill(28, 134, 238);
    ellipse(0, -5, 8, 12);

    // gas level
    fill(gascolor);
    if (capsule.gasgas > 0) {
        triangle(-5, 20, 5, 20, 0, 20 + capsule.gasgas);
        triangle(-5, 20, 5, 20, 0, 20 + capsule.gasgas * 0.6);
        triangle(-5, 20, 5, 20, 0, 20 + capsule.gasgas * 0.2);
    }
    pop();
}

function Instructions(x, y) {
    // text
    textAlign(CENTER, CENTER);
    textSize(14);
    text(
        "Bringe die Kapsel sicher auf den Boden! Benutze dafür die Pfeiltasten.",
        x,
        y - 300
    );

    fill(white);
    count++;
}

function keyPressed() {
    if (!run) {
        resetGame();
    }
}

function mousePressed() {
    if (!run) {
        resetGame();
    }
}

function resetGame() {
    // reset capsule
    capsule.angle = 0;
    capsule.gasgas = 0;
    capsule.xSpeed = 0;
    capsule.ySpeed = 2;
    capsule.x = width / 2;
    capsule.y = 50;

    run = true;
    finish = false;
    count = 0;
    capsule.gas = 150;
    Textfield = "";
}