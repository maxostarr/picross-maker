<script lang="ts">
	import PixelGrid from '../../components/pixelGrid.svelte';
	import { dequeryifyBoard } from '$lib';
	import { setImageGrid } from '$lib/board.svelte';

	let { data } = $props();
	let showSolution = $state(false);

	if (data.board) {
		const board = dequeryifyBoard(data.board);
		// Set the imageGrid in the store
		setImageGrid(board);
	}
</script>

<PixelGrid {showSolution} showGrid />

<button onclick={() => (showSolution = !showSolution)}>
	{showSolution ? 'Hide Solution' : 'Show Solution'}
</button>
