const matrixGen = (grid)=> {
	const matrix = [];
	for (let row of grid) {
		matrix.push(row.split(""));
	}
	return matrix;
};

const find = (matrix, state)=> {
	for(let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === state) return  [row, col];
		}
	}
};
export {matrixGen, find};