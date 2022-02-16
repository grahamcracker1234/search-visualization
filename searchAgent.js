import Grid from "./grid.js";
import { equal } from "./util.js";

const SearchAgent = async (_canvas, filepath = null) => {

	const url = window.location.href;
	const layout = filepath == null ? parseInt(url[url.length - 1]) || 1 : filepath;
	const grid = await Grid(`layouts/${layout}`);

	const canvas = _canvas;
	const context = canvas.getContext("2d");

	const find = (state) => {
		for (let [[row, col], cell] of grid.iterator()) {
			if (cell === state) return [row, col];
		}
	};

	const getCanvas = () => canvas;
	const getContext = () => context;
	const search = (searchFn) => searchFn(self);
	const getStartState = () => find(grid.Cell.START);
	const isGoalState = (state) => equal(state, find(grid.Cell.END));
	const expand = function* (state) {
		const [row, col] = state;
		const [rowCount, colCount] = grid.getDimensions();

		if (row - 1 >= 0 && grid.getCell(row - 1, col) !== grid.Cell.WALL) yield [row - 1, col];
		if (row + 1 < rowCount && grid.getCell(row + 1, col) !== grid.Cell.WALL) yield [row + 1, col];
		if (col - 1 >= 0 && grid.getCell(row, col - 1) !== grid.Cell.WALL) yield [row, col - 1];
		if (col + 1 < colCount && grid.getCell(row, col + 1) !== grid.Cell.WALL) yield [row, col + 1];
	};
	const draw = (frontier = [], visited = [], path = []) => {
		const [rowCount, colCount] = grid.getDimensions();

		// Clear frame
		context.fillStyle = "#000";
		context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

		const size = Math.floor(Math.min(window.innerWidth / colCount, window.innerHeight / rowCount));
		const transform = context.getTransform();
		context.translate(-colCount * size / 2, -rowCount * size / 2);
		
		// White background
		context.fillStyle = "#FFF";
		context.fillRect(0, 0, size * colCount, size * rowCount);

		// Frontier path
		context.fillStyle = "#009999";
		for (let [row, col] of frontier) {
			context.fillRect(col * size, row * size, size, size);
		}

		// Visited path
		context.fillStyle = "#000099";
		for (let [row, col] of visited) {
			context.fillRect(col * size, row * size, size, size);
		}

		// Goal path
		context.fillStyle = "#00FFFF";
		for (let [row, col] of path) {
			context.fillRect(col * size, row * size, size, size);
		}

		// Everything
		for (let [[row, col], cell] of grid.iterator()) {
			if (cell === grid.Cell.WALL) {
				context.fillStyle = "#777";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === grid.Cell.START) {
				context.fillStyle = "#FF00FF";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === grid.Cell.END) {
				context.fillStyle = "#00FF00";
				context.fillRect(col * size, row * size, size, size);
			}
		}

		context.setTransform(transform);
	};

	const self = { search, getStartState, isGoalState, expand, getCanvas, getContext, draw };
	return self;
};

export default SearchAgent;
