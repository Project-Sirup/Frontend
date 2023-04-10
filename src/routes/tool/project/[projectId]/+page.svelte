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
    .header {
        text-align: center;
    }
    .header > a {
        font-size: 2rem;
    }
    a {
        text-decoration: none;
    }
    .microservice {
        padding: 1rem;
        margin: .5rem;
        background-color: rgba(0,0,0,.5);
    }
    .microservice:hover {
        background-color: rgba(255,255,255,.1);
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
        padding: .5rem;
        margin: 0;
    }
    .lang {
        background-color: rgba(0,255,0,.1);
        border-color: rgba(0,255,0,.75);
        color: rgba(0,255,0,.75);
    }
    .api {
        background-color: rgba(0,255,255,.1);
        border-color: rgba(0,255,255,.75);
        color: rgba(0,255,255,.75);
    }
    .db {
        background-color: rgba(255,0,255,.1);
        border-color: rgba(255,0,255,.75);
        color: rgba(255,0,255,.75);
    }
</style>

<div class='header'>
    <h1>Project: {$project?.projectName}</h1>
    <a href="/tool/microservice">Create a new Microservice</a>
</div>

{#each $microservices as micro}
    <a on:click={() => gotoMicro(micro)}
        href="/tool/microservice/{micro.microserviceId}">
        <div class='microservice'>
            <h1 class='microservice-name'>{micro.microserviceName}</h1>
            <div class='tags'>
                {#if micro.microserviceFile}
                    <!--<pre>{JSON.stringify(micro.microserviceFile.microservice)}</pre>-->
                        {#if micro.microserviceFile.microservice.language}
                            <h2 class='tag lang'>{micro.microserviceFile.microservice.language.name}</h2>
                        {/if}
                        {#if micro.microserviceFile.microservice.api}
                            <h2 class='tag api'>{micro.microserviceFile.microservice.api.type}</h2>
                        {/if}
                        {#if micro.microserviceFile.microservice.database}
                            <h2 class='tag db'>{micro.microserviceFile.microservice.database.name}</h2>
                        {/if}
                {:else}
                    <h2>No generation file</h2>
                {/if}
            </div>
        </div>
    </a>
{/each}