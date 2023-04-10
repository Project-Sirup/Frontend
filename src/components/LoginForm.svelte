<script lang="ts">
    import uvm from "../stores/User";
    import { error } from "../stores/Error";
	import type { User } from "../models/User";
	import { writable, type Writable } from "svelte/store";

    let userName = "";
    let password = "";

    const wrong: Writable<boolean> = writable<boolean>(false);

    const login = async () => {
        uvm().login({userName: userName, password: password} as User)
        .then(success => {
            wrong.set(!success);
            if (success) {
                window.location.href = "/tool";
                return;
            }
        })
        .catch(console.log);
    }
</script>

<style>
    :global(form) {
        display: flex;
        flex-direction: column;
        max-width: 20rem;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        gap: 1rem;
    }
    :global(label) {
        font-size: 2rem;
    }
    :global(input[type="text"], input[type="password"]) {
        border: none;
        background-color: rgba(255, 255, 255, .1);
        font-size: 1rem;
        padding: .5rem 1rem;
        color: white;
        width: 100%;
    }
    :global(input[type="submit"]) {
        background-color: rgba(0, 0, 0, .5);
        border: none;
        color: dodgerblue;
        font-size: 2rem;
        cursor: pointer;
        width: 100%;
        padding: .25rem 1rem;
        font-weight: bold;
    }
</style>

<form on:submit|preventDefault={login}>
    <input type="text" name="userName" id="userName" bind:value={userName} placeholder="Username">
    <input type="password" name="password" id="password" bind:value={password} placeholder="Passord">
    <input type="submit" value="Login">
    {#if $wrong}
        <div>Wrong credentials</div>
    {/if}
</form>