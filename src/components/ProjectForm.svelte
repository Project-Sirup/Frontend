<script lang="ts">
	import type { Project } from "../models/Project";
	import { organisation } from "../stores/Organisation";
	import pvm from "../stores/Project";
  import { error } from '../stores/Error';
  import type { Error } from '../stores/Error';

    let projectName = "";

    async function createProject() {
        pvm().create({projectName: projectName, organisationId: $organisation?.organisationId} as Project)
        .then(res => {
            if(res) {
                window.location.href = `/tool/project/${res.projectId}`;
                return;
            }
            error.set({ code: 500, type: "Service", message: "Could not create project" } as Error)
        })
    }
</script>

<div class='new-data'>
    <input class='new-text' type="text" name="projectName" id="ProjectName" bind:value={projectName} placeholder='Project name'>
    <input class='new-submit' type="submit" value="Create new project" on:click={() => createProject()}>
</div>
