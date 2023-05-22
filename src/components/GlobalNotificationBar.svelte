<script lang="ts">
	export var message: string;
</script>

<style>
	.top-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 3rem;
			background: linear-gradient(45deg, #FF00FF, #00FFFF);
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: black;
	}
</style>

<div class='top-bar'>
	<h1>{message}</h1>
</div>
