<script lang="ts">
	import Board from '../components/board.svelte';
	import ImageCanvas from '../components/imageCanvas.svelte';
	import ImageUpload from '../components/imageUpload.svelte';

	let file: File | undefined = $state();
	let imageSrc = $derived(file ? URL.createObjectURL(file) : '');
	let pixelArray: boolean[][] = $state([]);
</script>

<ImageUpload bind:file />
<ImageCanvas {imageSrc} bind:pixelArray />
<Board {pixelArray} />
