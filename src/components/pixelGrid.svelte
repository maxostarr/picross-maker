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

	import {
		getImageGrid,
		getPlayGrid,
		getRowLabels,
		getColLabels,
		toggleCell,
		getRowLabelState,
		getColLabelState
	} from '../lib/board.svelte';
	let imageGrid = $derived(getImageGrid());
	let playGrid = $derived(getPlayGrid());

	let displayArray = $derived.by(() => (showSolution ? imageGrid : playGrid));
	let colLabels = $derived(getColLabels());
	let rowLabels = $derived(getRowLabels());
	let rowLabelState = $derived(getRowLabelState());
	let colLabelState = $derived(getColLabelState());

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (showSolution) return;
		toggleCell(rowIndex, colIndex);
	};

	const handleMouseEnter = (rowIndex: number, colIndex: number) => (e: MouseEvent) => {
		if (e.buttons !== 1) return;
		if (showSolution) return;
		toggleCell(rowIndex, colIndex);
	};

	const getRowLabelStateClass = (rowIndex: number, labelIndex: number) => {
		if (rowLabelState[rowIndex]?.[labelIndex] === 1) return 'correct';
		if (rowLabelState[rowIndex]?.[labelIndex] === 2) return 'incorrect';
		return '';
	};

	const getColLabelStateClass = (colIndex: number, labelIndex: number) => {
		if (colLabelState[colIndex]?.[labelIndex] === 1) return 'correct';
		if (colLabelState[colIndex]?.[labelIndex] === 2) return 'incorrect';
		return '';
	};

	let correct = $derived.by(() => {
		let correct = true;

		if (imageGrid.length !== playGrid.length) return false;
		if (imageGrid[0]?.length !== playGrid[0]?.length) return false;

		for (let i = 0; i < imageGrid.length; i++) {
			for (let j = 0; j < imageGrid[i].length; j++) {
				if (imageGrid[i][j] === 1 && playGrid[i][j] !== 1) {
					correct = false;
					break;
				}
				if (imageGrid[i][j] === 0 && playGrid[i][j] === 1) {
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
		{#each colLabels as colLabel, colIndex}
			<div class="label vertical with-grid">
				{#each colLabel as label, labelIndex}
					<div
						class="
            {getColLabelStateClass(colIndex, labelIndex)}
          "
					>
						{label}
					</div>
				{/each}
			</div>
		{/each}
		{#each displayArray as row, rowIndex}
			<div class="label with-grid">
				{#each rowLabels[rowIndex] as label, labelIndex}<div
						class={getRowLabelStateClass(rowIndex, labelIndex)}
					>
						{label}
					</div>{/each}
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
		grid-template-rows: min-content repeat(var(--rows), 1fr);
		grid-template-columns: min-content repeat(var(--cols), 1fr);
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

	.correct {
		color: green;
	}

	.incorrect {
		color: red;
	}

	.vertical {
		flex-direction: column;
		justify-content: flex-end;
	}

	.solved .cell.filled {
		background-color: green;
	}
</style>
