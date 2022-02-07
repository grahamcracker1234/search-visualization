const Canvas = () => {
	const ratio = window.devicePixelRatio;
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	const resize = () => {
		const [width, height] = [window.innerWidth, window.innerHeight];
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		context.scale(ratio, ratio);
		context.translate(width / 2, height / 2);
	};
	
	resize();
	window.addEventListener("resize", resize);

	return canvas;
};

export default Canvas;