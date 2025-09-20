<script lang="ts">
	import Board from '../components/board.svelte';
	import ImageCanvas from '../components/imageCanvas.svelte';
	import ImageUpload from '../components/imageUpload.svelte';
	import PixelGrid from '../components/pixelGrid.svelte';

	let file: File | undefined = $state();
	let imageSrc = $derived(file ? URL.createObjectURL(file) : '');
	let pixelArray: boolean[][] = $state([]);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<ImageUpload bind:file />
<ImageCanvas {imageSrc} bind:pixelArray />
<Board {pixelArray} />
