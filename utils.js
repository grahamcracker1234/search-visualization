function wait(milisec) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("");
		}, milisec);
	});
}