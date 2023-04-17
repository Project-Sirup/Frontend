<script lang="ts">
	import type { Microservice } from "../models/Microservice";
	import mvm, { microservice } from "../stores/Microservice";
	import { organisation } from "../stores/Organisation";
	import { project } from "../stores/Project";
    
    let microName = "";
    
    function createMicroservice() {
        mvm().create({microserviceName: microName, projectId: $project?.projectId} as Microservice)
        .then(res => window.location.href = `/tool/microservice/${res.microserviceId}`);
    }
</script>

<div class='new-data'>
    <input class='new-text' type="text" name="microName" id="microName" bind:value={microName} placeholder='Microservice name'>
    <input class='new-submit' type="submit" value="Create new microservice" on:click={() => createMicroservice()}>
</div>
