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

	const users: Writable<User[]> = writable<User[]>([]);

	onMount(async () => {
		await pvm().findAll($organisation.organisationId);
	});

	function deleteOrg() {
		ovm()
			.delete($organisation.organisationId)
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
			senderId: $user.userId,
			receiverId: _user.userId,
			organisationId: $organisation.organisationId
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

<h2>Invite a user</h2>

<input
	type="text"
	name="userSearch"
	id="userSearch"
	bind:value={userSearch}
	on:input={() => searchUsers()}
/>
{#each $users as user}
	<div class="user">
		{user.userName}
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
</style>
