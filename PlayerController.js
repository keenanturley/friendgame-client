const UP_KEY = 'w';
const DOWN_KEY = 's';
const LEFT_KEY = 'a';
const RIGHT_KEY = 'd';

export class PlayerController {
    constructor(player) {
        this.player = player;
        this.activeInputs = new Set();
        this.init();
    }
    init() {
        this.bindInputs();
    }
    bindInputs() {
        document.addEventListener('keydown', (e) => {
            if (e.repeat || this.activeInputs.has(e.key)) return;
            if (e.key === UP_KEY 
                || e.key === DOWN_KEY 
                || e.key === LEFT_KEY 
                || e.key === RIGHT_KEY) {
                    this.activeInputs.add(e.key);
                }
        });
        document.addEventListener('keyup', (e) => {
            this.activeInputs.delete(e.key);
        })
    }
    update() {
        if (this.activeInputs.has(UP_KEY)) this.moveUp();
        if (this.activeInputs.has(DOWN_KEY)) this.moveDown();
        if (this.activeInputs.has(LEFT_KEY)) this.moveLeft();
        if (this.activeInputs.has(RIGHT_KEY)) this.moveRight();
    }
    moveUp() {
        if (this.player.y === 0) return;
        this.player.y -= this.player.speed;
    }
    moveDown() {
        this.player.y += this.player.speed;
    }
    moveLeft() { 
        if (this.player.x === 0) return;
        this.player.x -= this.player.speed;
    }
    moveRight() {
        this.player.x += this.player.speed;
    }
}