<!-- Takes in a 2d array of booleans and draws as a grid of black and white squares -->
<script lang="ts">
	// export let pixelArray: boolean[][] = [];
	// export let showGrid: boolean = true;
	const { pixelArray, showGrid, rowLabels, colLabels } = $props<{
		pixelArray: boolean[][];
		showGrid?: boolean;
		rowLabels: number[][];
		colLabels: number[][];
	}>();

	console.log({ rowLabels, colLabels });
</script>

{#if pixelArray.length > 0}
	<div class="grid-container" style="--rows: {pixelArray.length}; --cols: {pixelArray[0].length};">
		<div>&nbsp;</div>
		{#each colLabels as colLabel}
			<div>
				{#each colLabel as label}
					<div class="label vertical with-grid">{label}</div>
				{/each}
			</div>
		{/each}
		{#each pixelArray as row, rowIndex}
			<div class="label with-grid">
				{#each rowLabels[rowIndex] as label}<div>{label}</div>{/each}
			</div>
			{#each row as cell, colIndex}
				<div class="cell {cell ? 'filled' : 'empty'} {showGrid ? 'with-grid' : ''}"></div>
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
</style>
