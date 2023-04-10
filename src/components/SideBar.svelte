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

    const showOrgs: Writable<boolean> = writable(false);
    const showInv: Writable<boolean> = writable(false);

    onMount(async () => {
        uvm().init()
        .then(() => {
            uvm().findOrganisations()
            .then(res => console.table(res));
            ivm().findAll()
            .then(res => console.log(res));
        });
    });

    function toggleOrgs() {
        showOrgs.update(showOrgs => showOrgs = !showOrgs);
    }
    function toggleInvs() {
        showInv.update(showInv => showInv = !showInv);
    }
    function gotoOrg(organisation: Organisation) {
        ovm().set(organisation);
        pvm().findAll(organisation.organisationId);
        ovm().findUsers(organisation.organisationId)
        .then(res => console.log(res));
    }
    function respond(invite: Invite, accept: boolean) {
        ivm().respond(invite, accept)
        .then(_ => invites.set($invites.filter(_invite => !(_invite.senderId === invite.senderId && _invite.organisationId === invite.organisationId))));
    }

</script>

<style>
    .side-bar {
        background: linear-gradient(cyan, purple);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 2rem;
        width: 10rem;
        overflow-y: auto;
    }
    .section-header {
        width: 100%;
        background: linear-gradient(rgba(0, 0, 0, .25), rgb(0,0,0,0));
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
        bottom: 2rem;
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
    }
</style>

<div class="side-bar">
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
                <a href="/tool/organisation">New</a>
                {#each $organisations as org}
                    <div class="section-content organisation">
                        <a on:click={() => gotoOrg(org)} href="/tool/organisation/{org.organisationId}">
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