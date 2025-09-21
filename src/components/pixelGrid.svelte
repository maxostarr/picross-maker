<!-- Takes in a 2d array of booleans and draws as a grid of black and white squares -->
<script lang="ts">
	// export let imageGrid: boolean[][] = [];
	// export let showGrid: boolean = true;
	const {
		// imageGrid,
		showGrid,
		// rowLabels,
		// colLabels,
		showSolution
	}: {
		// imageGrid: number[][];
		showGrid?: boolean;
		// rowLabels: number[][];
		// colLabels: number[][];
		showSolution: boolean;
	} = $props();

	// let playGrid = $state(imageGrid.map((row) => row.map(() => 0)));

	import { getImageGrid, getPlayGrid, rowLabels, colLabels, toggleCell } from '../lib/board.svelte';
	let imageGrid = $derived(getImageGrid());
	let playGrid = $derived(getPlayGrid());

	let displayArray = $derived.by(() => (showSolution ? imageGrid : playGrid));

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (showSolution) return;
		toggleCell(rowIndex, colIndex);
	};

	const handleMouseEnter = (rowIndex: number, colIndex: number) => (e) => {
		if (e.buttons !== 1) return;
		if (showSolution) return;
		toggleCell(rowIndex, colIndex);
	};

	let correct = $derived.by(() => {
		let correct = true;

		if (imageGrid.length !== playGrid.length) return false;
		if (imageGrid[0]?.length !== playGrid[0]?.length) return false;

		for (let i = 0; i < imageGrid.length; i++) {
			for (let j = 0; j < imageGrid[i].length; j++) {
				if (imageGrid[i][j] !== playGrid[i][j]) {
					correct = false;
					break;
				}
			}
			if (!correct) break;
		}
		return correct;
	});
</script>

{#if displayArray.length > 0}
	<div
		class="grid-container {correct ? 'solved' : ''}"
		style="--rows: {displayArray.length}; --cols: {displayArray[0].length};"
	>
		<div>&nbsp;</div>
		{#each colLabels as colLabel}
			<div>
				{#each colLabel as label}
					<div class="label vertical with-grid">{label}</div>
				{/each}
			</div>
		{/each}
		{#each displayArray as row, rowIndex}
			<div class="label with-grid">
				{#each rowLabels[rowIndex] as label}<div>{label}</div>{/each}
			</div>
			{#each row as cell, colIndex}
				<div
					class="cell {cell === 1 ? 'filled' : 'empty'} {showGrid ? 'with-grid' : ''}"
					onmousedown={() => handleCellClick(rowIndex, colIndex)}
					onmouseenter={handleMouseEnter(rowIndex, colIndex)}
				>
					<span>
						{cell === 2 ? 'X' : ''}
					</span>
				</div>
			{/each}
		{/each}
	</div>
{:else}
	<p>No pixel data available.</p>
{/if}

<style>
	.grid-container {
		display: grid;
		grid-template-rows: 50px repeat(var(--rows), 1fr);
		grid-template-columns: 50px repeat(var(--cols), 1fr);
		width: max-content;
		height: max-content;
		border: 1px solid #ccc;
		user-select: none;
	}

	.cell {
		box-sizing: border-box;
		min-width: 40px;
		min-height: 40px;
		width: 100%;
		height: 100%;
		color: red;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		text-align: center;
	}

	.filled {
		background-color: black;
	}

	.empty {
		background-color: white;
	}

	.with-grid {
		border: 1px solid #ddd;
	}

	.label {
		display: flex;
		font-size: 0.75rem;
		width: 100%;
		height: 100%;
		justify-content: flex-end;
		align-items: center;
		gap: 1ch;
	}

	.vertical {
		flex-direction: column;
		justify-content: flex-end;
	}

	.solved .cell.filled {
		background-color: green;
	}
</style>
