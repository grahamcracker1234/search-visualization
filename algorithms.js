import { find, equal, Stack, Queue } from "./util.js";

const depthFirstSearch = (matrix) => {
	const frontier = new Stack();
	const start = find(matrix, 2);
	const goal = find(matrix, 3);
	// get the starting point
	frontier.push([start, []]);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (equal(state, goal)) return [[...path, state], visited];

		const neighbors = getNeighbors(matrix, ...state);
		for(const neighbor of neighbors) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]]);
		}
	}
};

const breadthFirstSearch = (matrix) => {
	const stack = new Queue();
	const start = find(matrix, 2);
	const goal = find(matrix, 3);
	// get the starting point
	stack.push([start, []]);
	const visited = [];
	while (!stack.isEmpty()) {
		const [state, path] = stack.pop();

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (equal(state, goal)) return [[...path, state], visited];

		const neighbors = getNeighbors(matrix, ...state);
		for(const neighbor of neighbors) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			stack.push([neighbor, [...path, state]]);
		}
	}
};

const getNeighbors = (matrix, row, col) => {
	const neighbors = [];
	// check up
	if (row - 1 >= 0 && matrix[row - 1][col] != 1) {
		neighbors.push([row - 1, col]);
	}
	// check down
	if (row + 1 < matrix.length && matrix[row + 1][col] != 1) {
		neighbors.push([row + 1, col]);
	}
	// check left
	if (col - 1 >= 0 && matrix[row][col - 1] != 1) {
		neighbors.push([row, col - 1]);
	}
	// check right
	if (col + 1 < matrix[0].length && matrix[row][col + 1] != 1) {
		neighbors.push([row, col + 1]);
	}
	return neighbors;
};

export { depthFirstSearch, breadthFirstSearch };