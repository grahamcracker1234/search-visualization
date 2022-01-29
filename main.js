const Canvas = () => {
	const ratio = window.devicePixelRatio;
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	const resize = () => {
		const [width, height] = [window.innerWidth, window.innerHeight];
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.scale(ratio, ratio);
		ctx.translate(width / 2, height / 2);
	};
	
	resize();
	window.addEventListener("resize", resize);

	return canvas;
};

const setup = () => {
	const canvas = Canvas();
	const context = canvas.getContext("2d");
	context.fillStyle = "grey";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
};

(() => {
	setup();
})();