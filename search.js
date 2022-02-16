import { equal, Stack, Queue, PriorityQueue } from "./util.js";

const depthFirstSearch = async (searchAgent) => {
	const frontier = Stack();
	const start = searchAgent.getStartState();

	frontier.push([start, []]);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();
		const frontierArray = frontier.toArray().map((entry) => entry[0]);

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (searchAgent.isGoalState(state)) return searchAgent.draw(frontierArray, visited, [...path, state]);

		for(const neighbor of searchAgent.expand(state)) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]]);
		}
		
		// Draw the frame and then wait until the next animation frame
		searchAgent.draw(frontierArray, visited);
		await new Promise(requestAnimationFrame);
	}
};

const breadthFirstSearch = async (searchAgent) => {
	const frontier = Queue();
	const start = searchAgent.getStartState();

	frontier.push([start, []]);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();
		const frontierArray = frontier.toArray().map((entry) => entry[0]);

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (searchAgent.isGoalState(state)) return searchAgent.draw(frontierArray, visited, [...path, state]);

		for(const neighbor of searchAgent.expand(state)) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]]);
		}

		// Draw the frame and then wait until the next animation frame
		searchAgent.draw(frontierArray, visited);
		await new Promise(requestAnimationFrame);
	}
};

const aStarSearch = async (searchAgent, heuristic = () => 0) => {
	const frontier = PriorityQueue();
	const start = searchAgent.getStartState();

	frontier.push([start, []], 0);
	const visited = [];
	while (!frontier.isEmpty()) {
		const [state, path] = frontier.pop();
		const frontierArray = frontier.toArray().map((entry) => entry[0]);

		if (visited.find(pos => equal(pos, state))) continue;
		visited.push(state);

		if (searchAgent.isGoalState(state)) return searchAgent.draw(frontierArray, visited, [...path, state]);

		for(const neighbor of searchAgent.expand(state)) {
			if (visited.find(pos => equal(pos, neighbor))) continue;
			frontier.push([neighbor, [...path, state]], heuristic(state, searchAgent));
		}

		// Draw the frame and then wait until the next animation frame
		searchAgent.draw(frontierArray, visited);
		await new Promise(requestAnimationFrame);
	}
};

export { depthFirstSearch, breadthFirstSearch, aStarSearch };