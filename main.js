import Canvas from "./canvas.js";
import { generate, draw } from "./grid.js";
import { wait } from "./util.js";

// eslint-disable-next-line no-unused-vars
import { depthFirstSearch, breadthFirstSearch } from "./search.js";

(async () => {
	const canvas = Canvas();
	const context = canvas.getContext("2d");
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
	const grid = await generate("gridLayouts/4");
	draw(canvas, grid);

	await wait(1000);

	depthFirstSearch(grid, canvas);
})();