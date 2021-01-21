import { Player } from './Player.js';

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.init();
    }
    init() {
        this.clear();
        console.log('Canvas ready.');
    }
    clear() { 
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }
    randomCssColor() {
        const randomByte = () => Math.floor(Math.random() * 256);
        return `rgb(${randomByte()}, ${randomByte()}, ${randomByte()})`;
    }
    drawPlayer(player) {
        this.context.fillStyle = player.color;
        this.context.fillRect(player.x, player.y, player.width, player.height);
    }
}