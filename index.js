let width = 800;
let height = 600;

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

    for (let i = 0; i < 1000; ++i) {
        stars.push({
            r: Math.random() * width,
            a: Math.random() * Math.PI * 2,
            d: (1 - Math.random() * 2) / 30,
            z: 2 + Math.random() * 5,
            rect: this.add.rectangle(0, 0, 4, 4, 0xffffff)});
    }

}

let tick = 0;

function update () {
    let centerX = width / 2;
    let centerY = height / 2;

    stars.forEach(v => {
        let x = v.r * Math.sin(v.a);
        let y = v.r * Math.cos(v.a);

        v.a += v.d;
        v.r += v.z;

        if (v.r > width) {
            v.r = Math.random() * 100;
        }

        v.rect.setPosition(centerX + x, centerY + y);
        v.rect.setAlpha(0.5 + v.r / width * Math.sin(tick));

    });
    tick = tick + 0.1;
}
