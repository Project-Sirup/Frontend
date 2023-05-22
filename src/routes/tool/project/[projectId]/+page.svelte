<script lang="ts">
	import mvm, { microservices } from '../../../../stores/Microservice';
	import { organisation } from '../../../../stores/Organisation';
	import { project } from '../../../../stores/Project';
	import { microservice } from '../../../../stores/Microservice';
	import type { Microservice } from '../../../../models/Microservice';
	import { onMount } from 'svelte';
	import ColorBackground from '../../../../components/ColorBackground.svelte';
	import MicroserviceTable from '../../../../components/MicroserviceTable.svelte';

	onMount(() => {
		mvm().findAll($project?.projectId);
	});

	function gotoMicro(microservice: Microservice) {
		mvm().set(microservice);
	}
</script>

<svelte:head>
	<title>Sirup/{$organisation?.organisationName}/{$project?.projectName}</title>
</svelte:head>

<div class="head">
	<h1>Project: {$project?.projectName}</h1>
	<a class="a-button" href="/tool/organisation/{$organisation?.organisationId}"
		>Back to {$organisation?.organisationName}</a
	>
	<a class="a-button" href="/tool/microservice">Create a new Microservice</a>
</div>
{#if $microservices.length > 0}
<!--	<ColorBackground>
		{#each $microservices as micro}
        <div class="microservice-border">
			<a on:click={() => gotoMicro(micro)} href="/tool/microservice/{micro.microserviceId}">
				<div class="microservice">
					<h1 class="microservice-name">{micro.microserviceName}</h1>
					<div class="tags">
						{#if micro.microserviceFile}
							&lt;!&ndash;<pre>{JSON.stringify(micro.microserviceFile.microservice)}</pre>&ndash;&gt;
							{#if micro.microserviceFile.microservice.language}
								<h2 class="tag lang">{micro.microserviceFile.microservice.language.name}</h2>
							{/if}
							{#if micro.microserviceFile.microservice.api}
								<h2 class="tag api">{micro.microserviceFile.microservice.api.type}</h2>
							{/if}
							{#if micro.microserviceFile.microservice.database}
								<h2 class="tag db">{micro.microserviceFile.microservice.database.name}</h2>
							{/if}
						{:else}
							<h2>No generation file</h2>
						{/if}
					</div>
				</div>
			</a>
        </div>
        <div class="microservice-gap"/>
		{/each}
	</ColorBackground>-->
	<ColorBackground>
		<div class='microservice-border'>
			<MicroserviceTable microservices={$microservices}/>
		</div>
	</ColorBackground>
{:else}
	<h3>This project as no microservices</h3>
{/if}

<style>
	a {
		text-decoration: none;
        color: white;
	}
	.microservice {
		padding: 1rem;
		margin: 0.5rem;
		background-color: rgb(50,50,50);
	}
    .microservice-border {
        padding: .25rem;
    }
    .microservice-gap {
		background: rgb(25, 25, 25);
		height: 1rem;
	}
	.microservice:hover {
		background-color: rgba(0, 0, 0, 0.5);
	}
	.microservice-name {
		font-weight: bold;
		text-decoration: none;
		color: white;
	}
	.tags {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: center;
	}
	.tag {
		border: red solid 2px;
		border-radius: 50px;
		padding: 0.5rem;
		margin: 0;
	}
	.lang {
		background-color: rgba(0, 255, 0, 0.1);
		border-color: rgba(0, 255, 0, 0.75);
		color: rgba(0, 255, 0, 0.75);
	}
	.api {
		background-color: rgba(0, 255, 255, 0.1);
		border-color: rgba(0, 255, 255, 0.75);
		color: rgba(0, 255, 255, 0.75);
	}
	.db {
		background-color: rgba(255, 0, 255, 0.1);
		border-color: rgba(255, 0, 255, 0.75);
		color: rgba(255, 0, 255, 0.75);
	}
</style>
