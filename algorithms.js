import { wait, matrixGen, find, equal, Stack } from "./util.js";


// const grid = [
// 	"A00",
// 	"00S"
// ];
// const matrix = matrixGen(grid);
const matrix = [
	[2, 0],
	[1, 0],
	[3, 0]
];
const start = find(matrix, 2);
const goal = find(matrix, 3);

const depthFirstSearch = (matrix) => {
	const stack = new Stack();
	// get the starting point
	stack.push([start, []]);
	const visited = [];
	while (!stack.isEmpty()) {
		const [state, path] = stack.pop();
		if (visited.find(pos => (pos[0] === state[0] && pos[1] === state[1]))) continue;
		visited.push(state);
		if (equal(state, goal)) return [...path, state];
		const neighbors = getNeighbors(matrix, state[0], state[1]);
		for(const neighbor of neighbors) {
			if (visited.find(pos => (pos[0] === neighbor[0] && pos[1] === neighbor[1]))) continue;
			stack.push([neighbor, [...path, state]]);
		}
	}
};

const getNeighbors = (matrix, row, col) => {
	const neighbors = [];
	// check up
	if (row-1 >= 0 && matrix[row-1][col] != 1) {
		neighbors.push([row-1, col]);
	}
	// check down
	if (row+1 < matrix.length && matrix[row+1][col] != 1) {
		neighbors.push([row+1, col]);
	}
	// check left
	if (col-1 >= 0 && matrix[row][col-1] != 1) {
		neighbors.push([row, col-1]);
	}
	// check right
	if (col+1 < matrix[0].length && matrix[row][col+1] != 1) {
		neighbors.push([row, col+1]);
	}
	return neighbors;
};
(()=> {
	console.log(depthFirstSearch(matrix));
})();