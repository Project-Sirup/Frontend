<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Project } from '../../../../models/Project';
	import mvm from '../../../../stores/Microservice';
	import ovm, { organisation, organisationUsers } from '../../../../stores/Organisation';
	import pvm from '../../../../stores/Project';
	import { projects } from '../../../../stores/Project';
	import type { User } from '../../../../models/User';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import aj from '../../../../util/AJ';
	import ivm from '../../../../stores/Invites';
	import type { Invite } from '../../../../models/Invite';
	import { user } from '../../../../stores/User';
	import ColorBackground from '../../../../components/ColorBackground.svelte';

	const organisationId: string = $page.params.organisationId;

	let userSearch = '';

	const showInvitations: Writable<boolean> = writable<boolean>(false);

	const users: Writable<User[]> = writable<User[]>([]);

	onMount(async () => {
		await pvm().findAll($organisation!.organisationId);
	});

	function deleteOrg() {
		ovm()
			.delete($organisation!.organisationId)
			.then(() => (window.location.href = '/tool/organisation'));
	}

	async function gotoPro(project: Project) {
		await pvm().set(project);
		await mvm().findAll(project.projectId);
	}

	async function searchUsers() {
		const res = await aj().user().GET_PROTECTED<User[]>(`/user/?userName=${userSearch}&amount=10`);
		const filtered = res.data;
		/* .filter(user => $organisationUsers.get("OWNER")?.includes(user))
        .filter(user => $organisationUsers.get("ADMIN")?.includes(user))
        .filter(user => $organisationUsers.get("MANAGER")?.includes(user))
        .filter(user => $organisationUsers.get("EDIT")?.includes(user))
        .filter(user => $organisationUsers.get("VIEW")?.includes(user));
        console.log(Object.values($organisationUsers)); */

		users.set(filtered);
	}

	async function inviteUser(_user: User) {
		await ivm().invite({
			senderId: $user!.userId,
			receiverId: _user.userId,
			organisationId: $organisation!.organisationId
		} as Invite);
	}
</script>

<svelte:head>
	<title>Sirup/{$organisation?.organisationName}</title>
</svelte:head>

<div class="head">
    <h1>Organisation: {$organisation?.organisationName}</h1>
    <a class="a-button" href="/tool/project">Create a new project</a>
    <button class="a-button" on:click={deleteOrg}>Delete organisation</button>
</div>


{#if $projects.length > 0}
	<ColorBackground>
		{#each $projects as pro}
			<div class="project-border">
				<a on:click={() => gotoPro(pro)} href="/tool/project/{pro.projectId}">
					<div class="project">
						<h3>{pro.projectName}</h3>
					</div>
				</a>
			</div>
			<div class="project-gap"/>
		{/each}
	</ColorBackground>
{:else}
	<h3>This organisation has no projects</h3>
{/if}


<div class="controls">
	<div class="invitations">
		<h2 class="a-button" on:click={() => $showInvitations = !$showInvitations}>Invite a user</h2>
		{#if $showInvitations}
			<input
				class='new-text'
				type="text"
				name="userSearch"
				id="userSearch"
				placeholder="Search for a user"
				bind:value={userSearch}
				on:input={() => searchUsers()}
			/>
			{#each $users as user}
				<div class="user">
					{user.userName}
					<button on:click={() => inviteUser(user)}>Invite</button>
				</div>
			{/each}
		{/if}
	</div>
	<div class='current-users'>
		{#each Object.entries($organisationUsers) as [permission, users]}
			<div>
				<h2 class="permission">{permission}</h2>
				{#each users as _user}
					<div class="user">
						{#if _user.userId === $user?.userId}
							<h3 class="username">{_user.userName} (you)</h3>
						{:else}
							<h3 class="username">{_user.userName}</h3>
						{/if}
						<h4 class="userid">{_user.userId}</h4>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.project-gap {
		background: rgb(25, 25, 25);
		height: 1rem;
	}
	.project {
		background-color: rgb(50, 50, 50);
		padding: 1rem;
		font-size: 1.5rem;
		color: white;
		text-align: center;
	}
	.project:hover {
		background-color: rgba(0,0,0,.5);
	}
	.project-border {
		background: transparent;
		padding: 0.5rem;
	}
	a {
		text-decoration: none;
	}
	.controls {
		position: absolute;
		right: 0;
		top: 2rem;
		width: 20%;
		display: flex;
		flex-direction: column;
		padding-bottom: 2rem;
		margin-right: 1rem;
		border-left: solid rgb(100,100,100) 2px;
		height: calc(100% - 5rem);
			overflow: hidden;
	}
	.current-users {
      overflow-x: auto;
	}
	.user {
		background-color: rgb(50,50,50);
		padding: .5rem;
		margin: .25rem;
		border-radius: 5px;
	}
	.username {

	}
	.userid {
		color: rgb(175,175,175);
	}
	.permission {
			padding-left: .5rem;
		border-bottom: solid rgb(75,75,75) 2px;
	}
</style>
