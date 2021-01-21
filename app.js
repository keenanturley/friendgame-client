import { Renderer } from './Renderer.js';
import { Game } from './Game.js';

const canvas = document.getElementById('canvas');
const renderer = new Renderer(canvas);

const game = new Game(renderer);