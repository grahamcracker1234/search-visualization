import Canvas from "./canvas.js";
import { generate, draw } from "./grid.js";
import { wait } from "./util.js";

// eslint-disable-next-line no-unused-vars
import { depthFirstSearch as dfs, breadthFirstSearch as bfs } from "./search.js";

const start = async (canvas, search) => {
	document.querySelector("#home").style.opacity = 0;

	document.body.appendChild(canvas);
	const url = window.location.href;
	const layout = parseInt(url[url.length - 1]) || 1;
	const grid = await generate(`layouts/${layout}`);
	draw(canvas, grid);

	canvas.style.opacity = 1;
	await wait(2000);

	search(grid, canvas);
};

(async () => {
	const canvas = Canvas();
	const context = canvas.getContext("2d");

	canvas.style.opacity = 0;
	canvas.style.transition = "opacity 1s ease-in";	
	canvas.style.position = "absolute";
	canvas.style.top = 0;
	canvas.style.bottom = 0;

	const black = "#000";
	context.fillStyle = black;
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
	document.body.style.background = black;
	
	document.querySelector("#dfs").addEventListener("click", () => start(canvas, dfs));
	document.querySelector("#bfs").addEventListener("click", () => start(canvas, bfs));
})();