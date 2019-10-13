let width = 800;
let height = 600;

let centerX = width / 2;
let centerY = height / 2;

let delta = 5000;
let deltaZ = 2000;

let config = {
    type: Phaser.AUTO,
    width,
    height,
    scene: {
        // preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var stars = [];

function preload ()
{
}

function create () {
    graphics = this.add.graphics();

    for (let i = 0; i < 2000; ++i) {
        stars.push({
            coords: newDot(),
            rect: this.add.rectangle(0, 0, 4, 4, 0xffffff)});
    }
}

function newDot() {
    return {
        x: -delta / 2 + Math.random() * delta,
        y: -delta / 2 + Math.random() * delta,
        z: -deltaZ
    };
}

function translate(coords) {
    let temp = height / coords.z;

    return {
        x: coords.x * temp,
        y: coords.y * temp
    };
}

function update () {
    stars.forEach(v => {
        let coords = translate(v.coords);
        let x = centerX + coords.x;
        let y = centerY + coords.y;
        v.coords.z += 10;

        if (v.coords.z >= 0 || x < 0 || x > width || y < 0 || y > height) {
            v.coords = newDot();
            v.rect.setAlpha(0);
            return;
        }

        v.rect.setPosition(x, y);
        v.rect.setAlpha(0.01 + (deltaZ - Math.abs(v.coords.z)) / deltaZ);
    });
}
