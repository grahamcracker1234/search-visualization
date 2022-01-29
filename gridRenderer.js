const EMPTY = 0;
const WALL = 1;
const START = 2;
const END = 3;

// const drawGrid = (context, grid, path, frame) => {
// 	const [rowCount, colCount] = [grid.length, grid[0].length];

// 	const size = Math.floor(Math.min(window.innerWidth / colCount, window.innerHeight / rowCount));
// 	const transform = context.getTransform();
// 	context.translate(-colCount * size / 2, -rowCount * size / 2);
		
// 	for (let row = 0; row < rowCount; row++) {
// 		for (let col = 0; col < colCount; col++) {
// 			const cell = grid[row][col];
// 			if (cell === WALL) {
// 				context.fillStyle = "#777";
// 				context.fillRect(col * size, row * size, size, size);
// 			} else if (cell === START) {
// 				context.fillStyle = "#FF00FF";
// 				context.fillRect(col * size, row * size, size, size);
// 			} else if (cell === END) {
// 				context.fillStyle = "#00FF00";
// 				context.fillRect(col * size, row * size, size, size);
// 			} else {
// 				context.fillStyle = "#FFF";
// 				context.fillRect(col * size, row * size, size, size);
// 			}
// 		}
// 	}
// 	context.setTransform(transform);
// };

const drawGrid = (context, grid, visited, path, frame) => {
	const [rowCount, colCount] = [grid.length, grid[0].length];

	const size = Math.floor(Math.min(window.innerWidth / colCount, window.innerHeight / rowCount));
	const transform = context.getTransform();
	context.translate(-colCount * size / 2, -rowCount * size / 2);
		
	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			const cell = grid[row][col];
			if (cell === WALL) {
				context.fillStyle = "#777";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === START) {
				context.fillStyle = "#FF00FF";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === END) {
				context.fillStyle = "#00FF00";
				context.fillRect(col * size, row * size, size, size);
			} else {
				context.fillStyle = "#FFF";
				context.fillRect(col * size, row * size, size, size);
			}
		}
	}

	context.fillStyle = "#000099";
	for (let i = 0; i < frame && i < visited.length; i++) {
		const [row, col] = visited[i];
		context.fillRect(col * size, row * size, size, size);
	}

	if (frame > visited.length) {
		context.fillStyle = "#000033";
		for (let i = 0; i < frame - visited.length && i < path.length; i++) {
			const [row, col] = path[i];
			context.fillRect(col * size, row * size, size, size);
		}
	}

	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			const cell = grid[row][col];
			if (cell === START) {
				context.fillStyle = "#FF00FF";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === END) {
				context.fillStyle = "#00FF00";
				context.fillRect(col * size, row * size, size, size);
			}
		}
	}

	context.setTransform(transform);
};

export default drawGrid;