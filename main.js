import { generate, draw } from "./grid.js";
import Canvas from "./canvas.js";

// eslint-disable-next-line no-unused-vars
import { depthFirstSearch, breadthFirstSearch } from "./algorithms.js";

let canvas;
let context;

const setup = async () => {
	canvas = Canvas();
	context = canvas.getContext("2d");
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
	const grid = await generate("gridLayouts/big1");
	return grid;
};

const update = (grid, frame = 0) => {
	// Reset frame.
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	const [path, visited] = breadthFirstSearch(grid);
	
	draw(context, grid, visited, path, frame);

	// Draw next frame.
	requestAnimationFrame(() => update(grid, frame + 1));
};

(async () => {
	const grid = await setup();
	update(grid);
})();