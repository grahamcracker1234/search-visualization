import gridDraw from "./gridRenderer.js";
import Canvas from "./canvas.js";
import { wait, matrixGen, find, equal, Stack } from "./util.js";


let canvas;
let context;

const setup = () => {
	canvas = Canvas();
	context = canvas.getContext("2d");
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
};

const update = () => {
	// Reset frame.
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	const grid = [
		"21     ",
		" 1 111 ",
		" 1 1 1 ",
		"     13"
	];

	gridDraw(context, matrixGen(grid));

	// Draw next frame.
	// requestAnimationFrame(() => update());
};

(() => {
	setup();
	update();
})();