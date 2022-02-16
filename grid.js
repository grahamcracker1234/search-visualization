const Grid = async (filepath) => {
	const Cell = Object.freeze({
		EMPTY: 0,
		WALL: 1,
		START: 2,
		END: 3
	});

	const grid = await fetch(filepath)
		.then(response => response.text())
		.then(text => text.replace(/%/g, Cell.WALL).replace(/S/g, Cell.START).replace(/E/g, Cell.END))
		.then(text => text.split(/\n/g))
		.then(rows => rows.map(row => row.split("").map(cell => parseInt(cell) || Cell.EMPTY)))
		.then(grid => {
			return grid;
		});
	const [rowCount, colCount] = [grid.length, grid[0].length];

	const getCell = (row, col) => grid[row][col];
	const getDimensions = () => [grid.length, grid[0].length];
	const iterator = function*() {
		for(let row = 0; row < rowCount; row++) {
			for (let col = 0; col < colCount; col++) {
				yield [[row, col], getCell(row, col)];
			}
		}
	};

	const self = { getCell, iterator, getDimensions, Cell };
	return self;
};

export default Grid;