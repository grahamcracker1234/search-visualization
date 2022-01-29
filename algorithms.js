/*
We can start with DFS and BFS
*/

class Stack {
	constructor() {
		this.stack = [];
	}
	push(element) {
		this.stack.push(element);
	}

	pop() {
		return this.stack.pop();
	}

	isEmpty() {
		return this.stack.length === 0;
	}
}

let goal = [10,10];

export const depthFirstSearch = (matrix) => {
	const stack = Stack();
	// get the starting point
	let startState = [0,0];
	stack.push([startState, []]);
	const visited = [];

	while (!stack.isEmpty()) {
		const [state, path] = stack.pop();
		if (visited.includes(state)) continue;
		visited.push(state);

		if (state === goal) break;
		const neighbors = getNeighbors(matrix, state[0], state[1]);
		for(const neighbor in neighbors) {
			if (visited.includes(neighbor)) continue;
			stack.push([neighbor, path + [state]]);
		}

	}
};

const getNeighbors = (matrix, x, y) => {
	const neighbors = [];
	// check up
	if (y-1 > 0 && matrix[y-1][x] != 1) {
		neighbors.push([x, y-1]);
	}
	// check down
	if (y+1 < matrix.length && matrix[y+1][x] != 1) {
		neighbors.push([x, y+1]);
	}
	// check left
	if (x-1 > 0 && matrix[y][x-1] != 1) {
		neighbors.push([x-1, y]);
	}
	// check right
	if (x+1 < matrix[0].length && matrix[y][x+1] != 1) {
		neighbors.push([x+1, y]);
	}
	return neighbors;
};