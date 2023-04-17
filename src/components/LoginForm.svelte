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

<form on:submit|preventDefault={login}>
    <input class='cred-text' type="text" name="userName" id="userName" bind:value={userName} placeholder="Username">
    <input class='cred-text' type="password" name="password" id="password" bind:value={password} placeholder="Passord">
    <input class='cred-submit' type="submit" value="Login">
    {#if $wrong}
        <div>Wrong credentials</div>
    {/if}
</form>