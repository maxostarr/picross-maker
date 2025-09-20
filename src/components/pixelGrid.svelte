<!-- Takes in a 2d array of booleans and draws as a grid of black and white squares -->
<script lang="ts">
	// export let pixelArray: boolean[][] = [];
	// export let showGrid: boolean = true;
	const {
		pixelArray,
		showGrid,
		rowLabels,
		colLabels,
		showSolution
	}: {
		pixelArray: boolean[][];
		showGrid?: boolean;
		rowLabels: number[][];
		colLabels: number[][];
		showSolution: boolean;
	} = $props();

	let playArray = $state(pixelArray.map((row) => row.map(() => false)));
	let displayArray = $derived.by(() => (showSolution ? pixelArray : playArray));

	console.log({ rowLabels, colLabels });

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (showSolution) return;
		playArray[rowIndex][colIndex] = !playArray[rowIndex][colIndex];
	};

	let correct = $derived.by(() => {
		let correct = true;

		if (pixelArray.length !== playArray.length) return false;
		if (pixelArray[0].length !== playArray[0].length) return false;

		for (let i = 0; i < pixelArray.length; i++) {
			for (let j = 0; j < pixelArray[i].length; j++) {
				if (pixelArray[i][j] !== playArray[i][j]) {
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
					class="cell {cell ? 'filled' : 'empty'} {showGrid ? 'with-grid' : ''}"
					onclick={() => handleCellClick(rowIndex, colIndex)}
				></div>
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
	}

	.cell {
		box-sizing: border-box;
		min-width: 40px;
		min-height: 40px;
		width: 100%;
		height: 100%;
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
