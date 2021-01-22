import { Player } from './Player.js';
import { PlayerController } from './PlayerController.js';
import { Renderer } from './Renderer.js';

// Update rate is updates per second
export const UPDATE_RATE = 60;
const NET_UPDATE_RATE = 20;

// Handles the game loop: 
// rendering, state management, assigning a controller
export class Game {
    constructor(renderer) {
        this.renderer = renderer;
        this.init();
        // Map of player id -> player object
        this.players = new Map();
    }
    init() {
        this.connect();
    }
    connect() {
        // Create a websocket
        const host = window.location.host;
        this.socket = new WebSocket(`ws://${host}:8080`);
        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'fg_connected') {
                const player = data.player; 
                console.log(`${player.id}`);
                this.player = new Player(
                    player.id,
                    player.color,
                    player.x,
                    player.y,
                    player.speed
                );
                this.start();
            }
            if (data.type === 'fg_players_update') {
                const playersData = data.players;
                const newPlayers = new Map();
                for (const [id, player] of Object.entries(playersData)) {
                    if (id == this.player.id) continue;
                    newPlayers.set(id, player);
                }
                this.players = newPlayers;
            }
        });
    }
    start() {
        // Attach player controller
        this.playerController = new PlayerController(this.player);
        // Start updating
        setInterval(() => this.update(), Math.round((1 / UPDATE_RATE) * 1000));
        // Start network updating
        setInterval(() => this.netUpdate(), Math.round((1 / NET_UPDATE_RATE) * 1000));
        // Start rendering
        window.requestAnimationFrame(() => this.draw());
    }
    update() {
        if (this.playerController) {
            this.playerController.update();
        }
    }
    netUpdate() {
        // Send player pos
        this.socket.send(JSON.stringify({
            type: 'fg_client_pos',
            pos: {
                x: this.player.x,
                y: this.player.y
            }
        }));        
    }
    draw() {
        this.renderer.clear();
        this.players.forEach((player) => this.renderer.drawPlayer(player));
        // Player is rendered over everyone else
        this.renderer.drawPlayer(this.player);
        window.requestAnimationFrame(() => this.draw());
    }
}