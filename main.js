import gridDraw from "./gridRenderer.js";
import Canvas from "./canvas.js";
import { wait, matrixGen, find, equal, Stack } from "./util.js";

import {depthFirstSearch, breadthFirstSearch} from "./algorithms.js";


let canvas;
let context;

const setup = () => {
	canvas = Canvas();
	context = canvas.getContext("2d");
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
};

const update = (frame) => {
	// Reset frame.
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	let grid = [
		"20     ",
		" 1 111 ",
		" 0 1 1 ",
		"     13"
	];
	grid = matrixGen(grid);
	const [path, visited] = depthFirstSearch(grid);
	// console.log(path);
	
	gridDraw(context, grid, visited, path, frame);

	// Draw next frame.
	requestAnimationFrame(() => update(frame + 1));
};

(() => {
	setup();
	update(0);
})();