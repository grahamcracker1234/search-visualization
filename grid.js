const Cell = Object.freeze({
	EMPTY: 0,
	WALL: 1,
	START: 2,
	END: 3
});

const generate = async (filepath) => {
	return fetch(filepath)
		.then(response => response.text())
		.then(text => text.replace(/%/g, Cell.WALL).replace(/S/g, Cell.START).replace(/E/g, Cell.END))
		.then(text => text.split(/\n/g))
		.then(rows => rows.map(row => row.split("").map(cell => parseInt(cell) || 0)))
		.then(grid => {
			return grid;
		});
};

const draw = (canvas, grid, frontier = [], visited = [], path = []) => {
	const	context = canvas.getContext("2d");

	// Clear frame
	context.fillStyle = "#000";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	const [rowCount, colCount] = [grid.length, grid[0].length];
	const size = Math.floor(Math.min(window.innerWidth / colCount, window.innerHeight / rowCount));
	const transform = context.getTransform();
	context.translate(-colCount * size / 2, -rowCount * size / 2);
	
	// White background
	context.fillStyle = "#FFF";
	context.fillRect(0, 0, size * colCount, size * rowCount);

	// Frontier path
	context.fillStyle = "#009999";
	for (let i = 0; i < frontier.length; i++) {
		const [row, col] = frontier[i];
		context.fillRect(col * size, row * size, size, size);
	}

	// Visited path
	context.fillStyle = "#000099";
	for (let i = 0; i < visited.length; i++) {
		const [row, col] = visited[i];
		context.fillRect(col * size, row * size, size, size);
	}

	// Goal path
	context.fillStyle = "#00FFFF";
	for (let i = 0; i < path.length; i++) {
		const [row, col] = path[i];
		context.fillRect(col * size, row * size, size, size);
	}

	// Everything
	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			const cell = grid[row][col];
			if (cell === Cell.WALL) {
				context.fillStyle = "#777";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === Cell.START) {
				context.fillStyle = "#FF00FF";
				context.fillRect(col * size, row * size, size, size);
			} else if (cell === Cell.END) {
				context.fillStyle = "#00FF00";
				context.fillRect(col * size, row * size, size, size);
			}
		}
	}

	context.setTransform(transform);
};

export { generate, draw, Cell };