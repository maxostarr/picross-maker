<script lang="ts">
	import PixelGrid from './pixelGrid.svelte';

	const { pixelArray } = $props<{ pixelArray: boolean[][] }>();
	let showGrid = $state(true);

	let rowLabels = $derived.by(() => {
		let labels: number[][] = [];
		for (let i = 0; i < pixelArray.length; i++) {
			labels[i] = [0];
			for (let j = 0; j < pixelArray[i].length; j++) {
				if (pixelArray[i][j]) {
					labels[i][labels[i].length - 1]++;
				} else if (labels[i][labels[i].length - 1] !== 0) {
					labels[i].push(0);
				}
			}
			labels[i] = labels[i].filter(Boolean);
		}
		return labels;
	});

	let colLabels = $derived.by(() => {
		let labels: number[][] = [];
		if (pixelArray.length === 0) return labels;
		for (let j = 0; j < pixelArray[0].length; j++) {
			labels[j] = [0];
			for (let i = 0; i < pixelArray.length; i++) {
				if (pixelArray[i][j]) {
					labels[j][labels[j].length - 1]++;
				} else if (labels[j][labels[j].length - 1] !== 0) {
					labels[j].push(0);
				}
			}
			labels[j] = labels[j].filter(Boolean);
		}
		return labels;
	});
</script>

<PixelGrid {rowLabels} {colLabels} {pixelArray} {showGrid} />
