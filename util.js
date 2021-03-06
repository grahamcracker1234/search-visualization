const wait = (millis) => new Promise(resolve => setTimeout(resolve, millis));

const equal = (obj1, obj2) => obj1[0] === obj2[0] && obj1[1] === obj2[1];

const Stack = () => {
	let stack = [];

	const push = (element) => stack.push(element);
	const pop = () => stack.pop();
	const clear = () => stack = [];
	const isEmpty = () => stack.length === 0;
	const toArray = () => stack;
	const print = () => console.log(stack);

	return { push, pop, clear, isEmpty, toArray, print };
};

const Queue = () => {
	let queue = [];

	const push = (element) => queue.splice(0,0, element);
	const pop = () => queue.pop();
	const clear = () => queue = [];
	const isEmpty = () => queue.length === 0;
	const toArray = () => queue;
	const print = () => console.log(queue);

	return { push, pop, clear, isEmpty, toArray, print };
};

const PriorityQueue = () => {
	let heap = [];

	const push = (element, priority) => {
		let queueElement = { element, priority };
		let contain = false;
		for (let i = 0; i < heap.length; i++) {
			if (heap[i].priority <= priority) continue;
				
			heap.splice(i, 0, queueElement);
			contain = true;
			break;
		}

		if (!contain) heap.push(queueElement);
	};
	const pop = () => heap.shift();
	const clear = () => heap = [];
	const isEmpty = () => heap.length === 0;
	const toArray = () => heap;
	const print = () => console.log(heap);

	return { push, pop, clear, isEmpty, toArray, print };
};

export { wait, equal, Stack, Queue, PriorityQueue };