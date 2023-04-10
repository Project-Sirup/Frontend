<script lang="ts">
	import type { Microservice } from "../models/Microservice";
	import mvm, { microservice } from "../stores/Microservice";
	import { organisation } from "../stores/Organisation";
	import { project } from "../stores/Project";
    
    let microName = "";
    
    function createMicroservice() {
        mvm().create({microserviceName: microName, projectId: $project?.projectId} as Microservice)
        .then(res => window.location.href = `/tool/organisation/${$organisation?.organisationId}/project/${$project?.projectId}/microservice/${$microservice?.microservcieId}`);
    }
</script>

<form on:submit|preventDefault={createMicroservice}>
    <label for="microName">Microservice name
        <input type="text" name="microName" id="microName" bind:value={microName}>
    </label>
    <input type="submit" value="Create new microservice">
</form>