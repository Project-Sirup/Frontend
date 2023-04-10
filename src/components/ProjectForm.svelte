<script lang="ts">
	import type { Project } from "../models/Project";
	import { organisation } from "../stores/Organisation";
	import pvm from "../stores/Project";

    let projectName = "";

    async function createProject() {
        pvm().create({projectName: projectName, organisationId: $organisation?.organisationId} as Project)
    }
</script>

<form on:submit|preventDefault={createProject}>
    <label for="projectName">Project Name
        <input type="text" name="projectName" id="ProjectName" bind:value={projectName}>
    </label>
    <input type="submit" value="Create new project">
</form>