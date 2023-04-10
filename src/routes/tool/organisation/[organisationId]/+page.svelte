<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import type { Project } from "../../../../models/Project";
	import mvm from "../../../../stores/Microservice";
	import ovm, { organisation, organisationUsers } from "../../../../stores/Organisation";
	import pvm from "../../../../stores/Project";
	import { projects } from "../../../../stores/Project";
	import type { User } from "../../../../models/User";
	import { writable, type Writable } from "svelte/store";
	import aj from "../../../../util/AJ";
	import ivm from "../../../../stores/Invites";
	import type { Invite } from "../../../../models/Invite";
    import { user } from "../../../../stores/User";
    const organisationId: string = $page.params.organisationId;

    let userSearch = "";

    const users: Writable<User[]> = writable<User[]>([]);

    onMount(() => {
        pvm().findAll($organisation!.organisationId);
    })

    function deleteOrg() {
        ovm().delete($organisation!.organisationId)
        .then(_ => window.location.href = "/tool/organisation");
    }

    function gotoPro(project: Project) {
        pvm().set(project);
        mvm().findAll(project.projectId);
    }

    async function searchUsers() {
        const res = await aj().user().GET_PROTECTED<User[]>(`/user/?userName=${userSearch}&amount=10`);
        const filtered = res.data
        .filter(user => $organisationUsers.get("OWNER")?.includes(user))
        .filter(user => $organisationUsers.get("ADMIN")?.includes(user))
        .filter(user => $organisationUsers.get("MANAGER")?.includes(user))
        .filter(user => $organisationUsers.get("EDIT")?.includes(user))
        .filter(user => $organisationUsers.get("VIEW")?.includes(user));
        console.log(Object.values($organisationUsers));
        
        users.set(filtered);
    }

    function inviteUser(user: User) {
        const res = ivm().invite({senderId: $user!.userId, receiverId: user.userId, organisationId: $organisation!.organisationId} as Invite)
    }

</script>

<div>{$organisation?.organisationName}</div>
<a href="/tool/project">Project</a>

<button on:click={deleteOrg}>Delete organisation</button>

{#each $projects as pro}
    <div class="project">
        <a on:click={() => gotoPro(pro)} href="/tool/project/{pro.projectId}">GOTO</a>
        <h3>{pro.projectName}</h3>
    </div>
{/each}

<h2>Invite a user</h2>

<input type="text" name="userSearch" id="userSearch" bind:value={userSearch} on:input={() => searchUsers()}>
{#each $users as user}
    <div class="user">{user.userName}
        <button on:click={() => inviteUser(user)}>Invite</button>
    </div>
{/each}

{#each Object.entries($organisationUsers) as [permission, users]}
    <div>
        <h2>{permission}</h2>
        {#each users as user}
            <h3>{user.userName}</h3>
        {/each}
    </div>
{/each}