<script lang="ts">
	import mvm, { microservices } from "../../../../stores/Microservice";
	import { organisation } from "../../../../stores/Organisation";
    import { project } from "../../../../stores/Project";
    import { microservice } from "../../../../stores/Microservice";
	import type { Microservice } from "../../../../models/Microservice";
	import { onMount } from "svelte";

    onMount(() => {
        mvm().findAll($project?.projectId);
    });

    function gotoMicro(microservice: Microservice) {
        mvm().set(microservice);
    }

</script>

<style>
    a {
        text-decoration: none;
    }
    .microservice {
        padding: 1rem;
        margin: .5rem;
        background-color: rgba(0,0,0,.5);
    }
    .microservice-name {
        font-weight: bold;
        text-decoration: none;
        color: white;

    }
</style>

<h1>{$project?.projectName}</h1>
<a href="/tool/microservice">MS</a>

{#each $microservices as micro}
    <a on:click={() => gotoMicro(micro)}
        href="/tool/microservice/{$microservice?.microserviceId}">
        <div class='microservice'>
            <h1 class='microservice-name'>{micro.microserviceName}</h1>
            {#if micro.genFile}
                <h2>{micro.genFile.microservice.language.name}</h2>
                <h2>{micro.genFile.microservice.api.type}</h2>
                <h2>{micro.genFile.microservice.database.name}</h2>
            {:else}
                <h2>No generation file</h2>
            {/if}
        </div>
    </a>
{/each}