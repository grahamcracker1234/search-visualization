import gridDraw from "./gridRenderer.js";
import Canvas from "./canvas.js";
import { wait, matrixGen, find, equal, Stack } from "./util.js";

import depthFirstSearch from "./algorithms.js";


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
		"21     ",
		" 1 111 ",
		" 1 1 1 ",
		"     13"
	];
	grid = matrixGen(grid);
	const path = depthFirstSearch(grid);
	
	gridDraw(context, grid, path, frame);

	// Draw next frame.
	requestAnimationFrame(() => update(frame + 1));
};

(() => {
	setup();
	update(0);
})();