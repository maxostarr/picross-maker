<script lang="ts">
	import Board from '../components/board.svelte';
	import ImageCanvas from '../components/imageCanvas.svelte';
	import ImageUpload from '../components/imageUpload.svelte';
	import { queryifyBoard } from '../lib';

	let file: File | undefined = $state();
	let imageSrc = $derived(file ? URL.createObjectURL(file) : '');
	let pixelArray: boolean[][] = $state([]);

	function play() {
		const boardQuery = queryifyBoard(pixelArray);

		const url = new URL(window.location.href);
		url.pathname = '/play';
		url.searchParams.set('board', boardQuery);
		window.location.href = url.toString();
	}
</script>

<ImageUpload bind:file />
<ImageCanvas {imageSrc} bind:pixelArray />
<Board {pixelArray} showSolution />
<button onclick={play}>Play</button>
