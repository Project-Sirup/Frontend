<script lang="ts">
	import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
	import type { Organisation } from "../models/Organisation";
	import ovm, { organisations } from "../stores/Organisation";
	import pvm from "../stores/Project";
    import uvm, { token, user } from "../stores/User";
	import Logout from "./Logout.svelte";
	import ivm, { invites } from "../stores/Invites";
	import type { Invite } from "../models/Invite";
	import ColorBackground from "./ColorBackground.svelte";

    export let top = 0;

    let width = "10rem";
    const showSideBar: Writable<boolean> = writable<boolean>(true);
    const showOrgs: Writable<boolean> = writable(false);
    const showInv: Writable<boolean> = writable(false);

    onMount(async () => {
        await uvm().init()
        .then(async () => {
            await uvm().findOrganisations();
            await ivm().findAll();
        });
    });

    function toggleOrgs() {
        showOrgs.update(showOrgs => !showOrgs);
    }
    function toggleInvs() {
        showInv.update(showInv => !showInv);
    }
    function gotoOrg(organisation: Organisation) {
        ovm().set(organisation);
        pvm().findAll(organisation.organisationId);
        ovm().findUsers(organisation.organisationId)
        .then(res => console.log(res));
    }
    function respond(invite: Invite, accept: boolean) {
        ivm().respond(invite, accept)
        .then(() => invites.set($invites.filter(_invite => !(_invite.senderId === invite.senderId && _invite.organisationId === invite.organisationId))));
    }
    function toggleSideBar() {
        $showSideBar = !$showSideBar;
        width =  $showSideBar? "10rem" : "1rem";
    }


</script>


<style>
    @property --color-1 {
		syntax: '<color>';
		inherits: true;
		initial-value: cyan;
	}
	@property --color-2 {
		syntax: '<color>';
		inherits: true;
		initial-value: magenta;
	}
	@keyframes move {
		50%{
			--angle: 360deg;
            --color-1: magenta;
            --color-2: cyan;
		}
	}

    .edge {
        position: relative;
        top: 0;
        width: 1rem;
        height: 100%;
        left: 100%;
        background: linear-gradient(var(--color-1), var(--color-2));
        border: none;
        cursor: pointer;
        animation: move 15000ms infinite alternate;
    }
    .side-bar {
        display: flex;
        flex-direction: row;
        background-color: rgb(50,50,50);
        position: fixed;
        left: 0;
        top: var(--top);
        bottom: 3rem;
        width: 10rem;
    }
    .side-bar-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 10rem;
    }
    .section-header {
        width: 100%;
        background: linear-gradient(rgb(75,75,75), rgba(0,0,0,0));
        color: white;
        cursor: pointer;
        border: none;
    }
    .section-content {
        color: white;
        text-decoration: none;
        text-align: center;
    }
    .section-content > a {
        color: white;
    }
    .top > a {
        color: white;
        display: flex;
        justify-content: center;
        padding: .5rem;
        text-decoration: none;
        background: linear-gradient(rgba(0, 0, 0, .25), rgba(0,0,0,0));
    }
    .bottom {
        position: fixed;
        bottom: 3rem;
        width: inherit;
    }
    .invites-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: .5rem;
    }
    .invite {
        background: linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,0));
        margin-block: .5rem;
    }
    .invite-control {
        margin-top: .125rem;
        width: 100%;
        display: flex;
    }
    .invite-control > button {
        width: 50%;
        border: none;
        cursor: pointer;
    }
    .invite-control > .decline {
        background-color: tomato;
    }
    .invite-control > .accept {
        background-color: yellowgreen;
    }
    .invite-number {
        background: red;
        border-radius: 50px;
        width: 1.25rem;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
    }
    .organisation {
        background-color: rgb(75,75,75);
        text-decoration: none;
        margin-block: .25rem;
    }
    .organisation:hover {
        background-color: rgb(100,100,100);
    }
    .organisation > h4 {
        text-align: left;
        margin-inline: .5rem;
        margin-block: 0;
        padding: .5rem;
    }
</style>

<div class="side-bar" style='width: {width}; --top: {top};'>
    <button class='edge' on:click={() => toggleSideBar()}></button>
    {#if $showSideBar}
        <div class='side-bar-content'>
            <div class="top">
                <a href="/tool">Home</a>
            </div>
            <div class="organisations">
                <button class="section-header" on:click={toggleOrgs}><h3>Organisations</h3></button>
                {#if $showOrgs}
                    {#if $organisations.length === 0}
                        <div class="section-content">
                            <h4>You have no organisations.
                                Click <a href="/tool/organisation">Here</a> to create one.
                            </h4>
                        </div>
                    {:else}
                        <div class="section-content">
                            <a href="/tool/organisation">Create a new organisation</a>
                        </div>
                        {#each $organisations as org}
                            <div class="section-content organisation">
                                <a class="organisation" on:click={() => gotoOrg(org)} href="/tool/organisation/{org.organisationId}">
                                    <h4>{org.organisationName}</h4>
                                </a>
                            </div>
                        {/each}
                    {/if}
                {/if}
            </div>
            <div class="invites">
                <button class="section-header" on:click={toggleInvs}><h3 class="invites-header">Invites
                    {#if $invites.length > 0}
                        <p class="invite-number">{$invites.length}</p>
                    {/if}
                    </h3>
                </button>
                {#if $showInv}
                    {#if $invites.length > 0}
                        {#each $invites as invite}
                        <div class="section-content invite">
                            {invite.senderName} has invited you to {invite.organisationName}
                            <div class="invite-control">
                                <button class="accept" on:click={() => respond(invite, true)}>Accept</button>
                                <button class="decline" on:click={() => respond(invite, false)}>Decline</button>
                            </div>
                        </div>
                        {/each}
                    {:else}
                        <div class="section-content">
                            <p>You have no invites</p>
                        </div>
                    {/if}
                {/if}
            </div>
            <div class="bottom">
                <Logout></Logout>
            </div>
        </div>
    {/if}
</div>
