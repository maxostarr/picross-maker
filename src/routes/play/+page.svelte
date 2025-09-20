<script lang="ts">
	import Board from '../../components/board.svelte';
	import { dequeryifyBoard } from '../../lib';

	let { data } = $props();

	let pixelArray: boolean[][] = dequeryifyBoard(data.board ?? '');
	let showSolution = $state(false);

	console.log(pixelArray);

	// const urlParams = new URLSearchParams(window.location.search);

	// $effect(() => {
	// 	const w = urlParams.get('width');
	// 	const h = urlParams.get('height');
	// 	if (w) width = parseInt(w);
	// 	if (h) height = parseInt(h);
	// 	pixelArray = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
	// 	console.log('Initialized pixelArray with dimensions:', width, height);
	// });
</script>

<Board {pixelArray} {showSolution} />

<button onclick={() => (showSolution = !showSolution)}>
	{showSolution ? 'Hide Solution' : 'Show Solution'}
</button>
