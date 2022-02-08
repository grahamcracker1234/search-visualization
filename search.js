import { equal, Stack, Queue } from "./util.js";
import { draw, Cell } from "./grid.js";

const depthFirstSearch = async (grid, canvas) => {
	const frontier = new Stack();
	const start = find(grid, 2);
	const goal = find(grid, 3);

	frontier.push([start, []]);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();
		const frontierArray = frontier.toArray().map((entry) => entry[0]);

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (equal(state, goal)) return draw(canvas, grid, frontierArray, visited, [...path, state]);

		const neighbors = getNeighbors(grid, ...state);
		for(const neighbor of neighbors) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]]);
		}
		
		// Draw the frame and then wait until the next animation frame
		draw(canvas, grid, frontierArray, visited);
		await new Promise(requestAnimationFrame);
	}
};

const breadthFirstSearch = async (grid, canvas) => {
	const frontier = new Queue();
	const start = find(grid, Cell.START);
	const goal = find(grid, Cell.END);

	frontier.push([start, []]);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();
		const frontierArray = frontier.toArray().map((entry) => entry[0]);

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (equal(state, goal)) return draw(canvas, grid, frontierArray, visited, [...path, state]);

		const neighbors = getNeighbors(grid, ...state);
		for(const neighbor of neighbors) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]]);
		}

		// Draw the frame and then wait until the next animation frame
		draw(canvas, grid, frontierArray, visited);
		await new Promise(requestAnimationFrame);
	}
};

const getNeighbors = (grid, row, col) => {
	const cells = [];
	const [rowCount, colCount] = [grid.length, grid[0].length];

	// Check up
	if (row - 1 >= 0 && grid[row - 1][col] !== Cell.WALL) cells.push([row - 1, col]);

	// Check down
	if (row + 1 < rowCount && grid[row + 1][col] !== Cell.WALL) cells.push([row + 1, col]);

	// Check left
	if (col - 1 >= 0 && grid[row][col - 1] !== Cell.WALL) cells.push([row, col - 1]);

	// Check right
	if (col + 1 < colCount && grid[row][col + 1] !== Cell.WALL) cells.push([row, col + 1]);

	return cells;
};

const find = (matrix, state) => {
	for(let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === state) return [row, col];
		}
	}
};

export { depthFirstSearch, breadthFirstSearch };