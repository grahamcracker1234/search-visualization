import gridDraw from "./gridRenderer.js";
import Canvas from "./canvas.js";

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
		[2, 1, 1, 1, 0], 
		[0, 0, 1, 1, 0], 
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 3]
	];
	gridDraw(context, grid);

	// Draw next frame.
	requestAnimationFrame(() => update());
};

(() => {
	setup();
	update();
})();