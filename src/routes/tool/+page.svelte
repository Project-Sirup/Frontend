<script lang="ts">
	import { onMount } from "svelte";
	import gvm from "../../stores/Generators";
	import { microservice } from "../../stores/Microservice";
	import { organisation } from "../../stores/Organisation";
	import { project } from "../../stores/Project";
    import { user } from "../../stores/User";
</script>

<style>
    .last-visited {
        background: linear-gradient(rgba(0,255,255,.5), rgba(255,0,255,.25));
        height: 2.5rem;
        margin: .5rem;
        width: 15rem;
        text-align: center;
        padding: 2rem;
        border-radius: 100px;
        color: white;
        text-decoration: none;
    }
    h3 {
        margin: 0;
    }
</style>

<div>
    <div class="user">
        <h1>Welcome {$user?.userName}</h1>
    </div>
    <h2>Continue where you left of...</h2>
    {#if $organisation}
        <h3>Last visted organisation</h3>
        <a href="/tool/organisation/{$organisation?.organisationId}">
            <div class="last-visited organisation">
                <h3>{$organisation?.organisationName}</h3>
            </div>
        </a>
    {/if}
    {#if $project}
        <h3>Last visited project</h3>
        <a href="/tool/project/{$project?.projectId}">
            <div class="last-visited project">
                <h3>{$project?.projectName}</h3>
            </div>
        </a>
    {/if}
    {#if $microservice}
        <h3>Last visited microservice</h3>
        <a href="/tool/microservice/{$microservice?.microserviceId}">
            <div class="last-visited microservice">
                <h3>{$microservice?.microserviceName}</h3>
            </div>
        </a>
    {/if}
</div>