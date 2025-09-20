<!-- component for uploading an image -->
<!-- Also previews the uploaded image -->

<script>
	let { file = $bindable() } = $props();
	let previewUrl = $state('');

	// Function to handle file input change
	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			file = selectedFile;
			previewUrl = URL.createObjectURL(file);
		}
	}
</script>

<div>
	<input type="file" accept="image/*" onchange={handleFileChange} />
	{#if previewUrl}
		<img src={previewUrl} alt="Uploaded Preview" class="preview" />
	{/if}
</div>

<style>
	.preview {
		margin-top: 10px;
		max-width: 100%;
		height: auto;
		border: 1px solid #ccc;
		padding: 5px;
	}
</style>
