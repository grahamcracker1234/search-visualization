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

let canvas;
let context;

const setup = () => {
	canvas = Canvas();
	context = canvas.getContext("2d");
	context.fillStyle = "black";
	context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

	document.body.appendChild(canvas);
};

const grid = (width, height) => {
	const size = Math.floor(Math.min(window.innerWidth / width, window.innerHeight / height));
	context.translate(-width * size / 2, -height * size / 2);

	context.strokeStyle = "#FF00FF";
	context.lineWidth = size / 10;
	context.fillStyle = "#333";
	
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			context.strokeRect(x * size, y * size, size, size);
			context.fillRect(x * size, y * size, size, size);
		}
	}
};

(() => {
	setup();
	grid(15, 10);
})();