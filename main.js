import Canvas from "./canvas.js";
import SearchAgent from "./searchAgent.js";
import { wait } from "./util.js";

// eslint-disable-next-line no-unused-vars
import { depthFirstSearch as dfs, breadthFirstSearch as bfs } from "./search.js";

const start = async (searchAgent, searchFn) => {
	const canvas = searchAgent.getCanvas();

	canvas.style.visibility = "visible";
	canvas.style.opacity = 1;
	document.querySelector("#home").style.opacity = 0;

	await wait(2000);

	searchAgent.search(searchFn);
};

(async () => {
	const canvas = Canvas();

	canvas.style.opacity = 0;
	canvas.style.transition = "opacity 1s ease-in";	
	canvas.style.position = "absolute";
	canvas.style.top = 0;
	canvas.style.bottom = 0;
	canvas.style.visibility = "hidden";

	document.body.appendChild(canvas);
	const searchAgent = await SearchAgent(canvas);
	searchAgent.draw();
	
	document.querySelector("#dfs").addEventListener("click", () => start(searchAgent, dfs));
	document.querySelector("#bfs").addEventListener("click", () => start(searchAgent, bfs));
})();