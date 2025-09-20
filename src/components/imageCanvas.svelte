<!-- Takes an image as an input and renders it to a canvas -->

<script lang="ts">
	import { onMount } from 'svelte';

	// export let imageSrc = '';
	// export let pixelArray: boolean[][] = [];

	let { imageSrc, pixelArray = $bindable<number[][]>([]) } = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let isBlackAndWhite = $state(false);
	let oneBit = $state(false);
	let pixelate = $state(false);
	let invert = $state(false);

	let outWidth = $state(10);
	let outHeight = $state(10);
	let pixelThreshold = $state(128);

	let vCropStart = $state(0);
	let vCropEnd = $state(0);
	let hCropStart = $state(0);
	let hCropEnd = $state(0);

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d');
			loadImage();
		}
	});

	// Function to load and draw the image on the canvas
	function loadImage() {
		if (imageSrc && ctx) {
			const img = new Image();
			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;

				if (vCropEnd === 0) vCropEnd = img.height;
				if (hCropEnd === 0) hCropEnd = img.width;

				if (!ctx) return;
				ctx.drawImage(img, 0, 0);
				let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				if (!imageData) return;

				// Apply cropping
				const cropWidth = hCropEnd - hCropStart;
				const cropHeight = vCropEnd - vCropStart;
				if (cropWidth > 0 && cropHeight > 0 && cropWidth <= img.width && cropHeight <= img.height) {
					const croppedData = ctx.getImageData(hCropStart, vCropStart, cropWidth, cropHeight);
					canvas.width = cropWidth;
					canvas.height = cropHeight;
					ctx.putImageData(croppedData, 0, 0);
					imageData = croppedData;
				}

				if (invert) {
					const data = imageData.data;
					for (let i = 0; i < data.length; i += 4) {
						data[i] = 255 - data[i]; // Red
						data[i + 1] = 255 - data[i + 1]; // Green
						data[i + 2] = 255 - data[i + 2]; // Blue
					}
					ctx.putImageData(imageData, 0, 0);
				}

				if (isBlackAndWhite) {
					const data = imageData.data;
					for (let i = 0; i < data.length; i += 4) {
						const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
						data[i] = avg; // Red
						data[i + 1] = avg; // Green
						data[i + 2] = avg; // Blue
					}
				}

				if (pixelate) {
					const tempCanvas = document.createElement('canvas');
					const tempCtx = tempCanvas.getContext('2d');
					if (!tempCtx) return;

					tempCanvas.width = outWidth;
					tempCanvas.height = outHeight;
					tempCtx.drawImage(canvas, 0, 0, outWidth, outHeight);

					// Create pixel array
					pixelArray = [];

					const tempImageData = tempCtx.getImageData(0, 0, outWidth, outHeight);
					for (let y = 0; y < outHeight; y++) {
						const row = [];
						for (let x = 0; x < outWidth; x++) {
							const index = (y * outWidth + x) * 4;
							const r = tempImageData.data[index];
							const g = tempImageData.data[index + 1];
							const b = tempImageData.data[index + 2];
							// Convert to grayscale value
							const gray = Math.round((r + g + b) / 3);
							row.push(gray < pixelThreshold ? 1 : 0); // true for black, false for white
						}
						pixelArray.push(row);
					}

					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
					imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				}

				if (oneBit) {
					const data = imageData.data;
					for (let i = 0; i < data.length; i += 4) {
						const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
						const bit = avg < pixelThreshold ? 0 : 255;
						data[i] = bit; // Red
						data[i + 1] = bit; // Green
						data[i + 2] = bit; // Blue
						data[i + 3] = 255; // Alpha
					}
				}
				ctx.putImageData(imageData, 0, 0);
			};
			img.src = imageSrc;
		}
	}

	$effect(loadImage);
</script>

<label for="black_and_white">Black and white</label>
<input
	type="checkbox"
	name="B&W"
	id="black_and_white"
	bind:checked={isBlackAndWhite}
	oninput={loadImage}
/>
<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
	<label for="one_bit">One Bit</label>
	<input type="checkbox" name="1-bit" id="one_bit" bind:checked={oneBit} oninput={loadImage} />

	<label for="pixelate">Pixelate</label>
	<input
		type="checkbox"
		name="Pixelate"
		id="pixelate"
		bind:checked={pixelate}
		oninput={loadImage}
	/>

	<label for="out_width">Output Width</label>
	<input
		type="number"
		id="out_width"
		min="1"
		bind:value={outWidth}
		oninput={pixelate ? loadImage : null}
	/>

	<label for="out_height">Output Height</label>
	<input
		type="number"
		id="out_height"
		min="1"
		bind:value={outHeight}
		oninput={pixelate ? loadImage : null}
	/>

	<label for="invert">Invert Colors</label>
	<input type="checkbox" name="Invert" id="invert" bind:checked={invert} oninput={loadImage} />

	<label for="pixel_threshold">Pixel Threshold</label>
	<input
		type="number"
		id="pixel_threshold"
		min="0"
		max="255"
		bind:value={pixelThreshold}
		oninput={pixelate || oneBit ? loadImage : null}
	/>

	<label for="v_crop_start">Vertical Crop Start</label>
	<input type="number" id="v_crop_start" min="0" bind:value={vCropStart} oninput={loadImage} />

	<label for="v_crop_end">Vertical Crop End</label>
	<input type="number" id="v_crop_end" min="0" bind:value={vCropEnd} oninput={loadImage} />

	<label for="h_crop_start">Horizontal Crop Start</label>
	<input type="number" id="h_crop_start" min="0" bind:value={hCropStart} oninput={loadImage} />

	<label for="h_crop_end">Horizontal Crop End</label>
	<input type="number" id="h_crop_end" min="0" bind:value={hCropEnd} oninput={loadImage} />
</div>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		border: 1px solid #ccc;
	}
</style>
