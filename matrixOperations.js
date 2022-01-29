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
			if (matrix[row][col] === parseInt(state)) return  [row, col];
		}
	}
};

const equal = (obj1, obj2)=> {
	if (obj1[0] === obj2[0] && obj1[1] === obj2[1]) return true;
	return false;
};
export {matrixGen, find, equal}; 