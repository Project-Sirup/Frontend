<script lang="ts">
	import ColorBackground from '../../components/ColorBackground.svelte';
	import { microservice } from '../../stores/Microservice';
	import { organisation } from '../../stores/Organisation';
	import { project } from '../../stores/Project';
	import { user } from '../../stores/User';
</script>

<svelte:head>
	<title>Sirup/{$user?.userName}</title>
</svelte:head>

<div>
	<div class="user">
		<h1>Welcome {$user?.userName}</h1>
	</div>
	<ColorBackground>
		<h2 class="last-work-header">Continue where you left of...</h2>
		{#if $organisation}
			<h3 class="last-work-header">Last visited organisation</h3>
			<div class="last-work-border">
				<a href="/tool/organisation/{$organisation?.organisationId}">
					<div class="last-visited organisation">
						<h3>{$organisation?.organisationName}</h3>
					</div>
				</a>
			</div>
		{/if}
		{#if $project}
			<h3 class="last-work-header">Last visited project</h3>
			<div class="last-work-border">
				<a href="/tool/project/{$project?.projectId}">
					<div class="last-visited project">
						<h3>{$project?.projectName}</h3>
					</div>
				</a>
			</div>
		{/if}
		{#if $microservice}
			<h3 class="last-work-header">Last visited microservice</h3>
			<div class="last-work-border">
				<a href="/tool/microservice/{$microservice?.microserviceId}">
					<div class="last-visited microservice">
						<h3>{$microservice?.microserviceName}</h3>
					</div>
				</a>
			</div>
		{/if}
	</ColorBackground>
</div>

<style>
	.last-visited {
		background-color: rgb(75, 75, 75);
		padding: 1rem;
		text-align: center;
		font-size: 1.5rem;
		color: white;
	}
	.last-visited:hover {
		background-color: rgba(0,0,0,.5);
	}
	a {
		text-decoration: none;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.5rem;
	}
	.last-work-header {
		background-color: rgb(50, 50, 50);
		margin: 0;
		padding: 1rem;
	}
	.last-work-border {
		padding: 0.5rem;
		background-color: transparent;
	}
</style>
