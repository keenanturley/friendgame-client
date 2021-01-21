import { Player } from './Player.js';
import { PlayerController } from './PlayerController.js';
import { Renderer } from './Renderer.js';

// Update rate is updates per second
export const UPDATE_RATE = 60;

// Handles the game loop: 
// rendering, state management, assigning a controller
export class Game {
    constructor(renderer) {
        this.renderer = renderer;
        this.init();
    }
    init() {
        this.connect();
        this.start();
    }
    connect() {
        this.player = new Player(0, 'red', 0, 0, 2);
        this.players = [ this.player ];
        return true;
    }
    start() {
        // Connect player controller
        this.playerController = new PlayerController(this.player);   
        // Start updating
        setInterval(() => this.update(), Math.round((1 / UPDATE_RATE) * 1000));
        // Start rendering
        window.requestAnimationFrame(() => this.draw());
    }
    update() {
        this.playerController.update();
    }
    draw() {
        this.renderer.clear();
        this.players.forEach((player) => this.renderer.drawPlayer(player));
        window.requestAnimationFrame(() => this.draw());
    }
}