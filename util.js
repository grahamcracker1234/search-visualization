const wait = (millis) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("");
		}, millis);
	});
};

const matrixGen = (grid) => {
	grid = grid.map(row => row.replace(/ /g, "0"));
	return grid.map(row => row.split("").map(c => parseInt(c)));
};

const find = (matrix, state) => {
	for(let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === parseInt(state)) return  [row, col];
		}
	}
};

const equal = (obj1, obj2) => {
	if (obj1[0] === obj2[0] && obj1[1] === obj2[1]) return true;
	return false;
};

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

	print() {
		console.log(this.stack);
	}
}

class Queue {
	constructor() {
		this.queue = [];
	}
	push(element) {
		this.queue.splice( 0, 0, element );
	}

	pop() {
		return this.queue.pop();
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	print() {
		console.log(this.queue);
	}
}

export { wait, matrixGen, find, equal, Stack, Queue }; 