<script lang="ts">
	import ImageCanvas from '../components/imageCanvas.svelte';
	import ImageUpload from '../components/imageUpload.svelte';
	import PixelGrid from '../components/pixelGrid.svelte';
	import { queryifyBoard } from '../lib';
	import { getImageGrid } from '../lib/board.svelte';

	let file: File | undefined = $state();
	let imageSrc = $derived(file ? URL.createObjectURL(file) : '');

	function play() {
		const boardQuery = queryifyBoard(getImageGrid());

		const url = new URL(window.location.href);
		url.pathname = '/play';
		url.searchParams.set('board', boardQuery);
		window.location.href = url.toString();
	}
</script>

<ImageUpload bind:file />
<ImageCanvas {imageSrc} />
<PixelGrid showSolution />
<button onclick={play}>Play</button>
