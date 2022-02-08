import Canvas from "./canvas.js";
import { generate, draw } from "./grid.js";
import { wait } from "./util.js";

// eslint-disable-next-line no-unused-vars
import { depthFirstSearch as dfs, breadthFirstSearch as bfs } from "./search.js";

(async () => {
	const canvas = Canvas();
	const context = canvas.getContext("2d");

	canvas.style.opacity = 0;
	canvas.style.transition = "opacity 1s ease-in";	

	const black = "#000";
	context.fillStyle = black;
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
	document.body.style.background = black;

	document.body.appendChild(canvas);
	const grid = await generate("layouts/2");
	draw(canvas, grid);

	canvas.style.opacity = 1;

	await wait(2000);

	bfs(grid, canvas);
})();