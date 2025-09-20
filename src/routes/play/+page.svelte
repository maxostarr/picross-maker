<script lang="ts">
	import Board from '../../components/board.svelte';
	import { dequeryifyBoard } from '../../lib';

	let { data } = $props();

	let pixelArray: number[][] = dequeryifyBoard(data.board ?? '');
	let showSolution = $state(false);
</script>

<Board {pixelArray} {showSolution} />

<button onclick={() => (showSolution = !showSolution)}>
	{showSolution ? 'Hide Solution' : 'Show Solution'}
</button>
