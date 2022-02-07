// eslint-disable-next-line no-unused-vars
const EMPTY = 0;
const WALL = 1;
const START = 2;
const END = 3;

const generate = async filepath => {
	return fetch(filepath)
		.then(response => response.text())
		.then(text => text.replace(/%/g, "1").replace(/S/g, "2").replace(/E/g, "3"))
		.then(text => text.split(/\n/g))
		.then(rows => rows.map(row => row.split("").map(cell => parseInt(cell) || 0)))
		.then(grid => {
			return grid;
		});
};

const draw = (context, grid, visited, path, frame) => {
	const [rowCount, colCount] = [grid.length, grid[0].length];

	const size = Math.floor(Math.min(window.innerWidth / colCount, window.innerHeight / rowCount));
	const transform = context.getTransform();
	context.translate(-colCount * size / 2, -rowCount * size / 2);
	
	// White background
	context.fillStyle = "#FFF";
	context.fillRect(0, 0, size * colCount, size * rowCount);

	// Visited path
	context.fillStyle = "#000099";
	for (let i = 0; i < frame && i < visited.length; i++) {
		const [row, col] = visited[i];
		context.fillRect(col * size, row * size, size, size);
	}

	// Goal path
	if (frame > visited.length) {
		context.fillStyle = "#00FFFF";
		for (let i = 0; i < frame - visited.length && i < path.length; i++) {
			const [row, col] = path[i];
			context.fillRect(col * size, row * size, size, size);
		}
	}

	// Everything
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
			}
		}
	}

	context.setTransform(transform);
};

export { generate, draw };