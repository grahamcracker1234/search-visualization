const wait = (millis) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, millis);
	});
};

const equal = (obj1, obj2) => obj1[0] === obj2[0] && obj1[1] === obj2[1];

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

	toArray() {
		return this.stack;
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
		this.queue.splice(0, 0, element);
	}

	pop() {
		return this.queue.pop();
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	toArray() {
		return this.queue;
	}

	print() {
		console.log(this.queue);
	}
}

export { wait, equal, Stack, Queue };