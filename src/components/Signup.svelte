<script lang="ts">
	import type { User } from "../models/User";
	import { error, type Error } from "../stores/Error";
	import uvm from "../stores/User";


    let userName = "";
    let password = "";
    let password2 = "";

    async function signup() {
        if (password !== password2) {
            alert("Passwords are not the same!");
            return;
        }
        uvm().create({userName: userName, password: password} as User)
        .then(_ => window.location.href = "/tool"); 
    }
</script>


<form on:submit|preventDefault={signup}>
    <input type="text" name="userName" id="userName" bind:value={userName} placeholder="Username">
    <input type="password" name="password" id="password" bind:value={password} placeholder="Password">
    <input type="password" name="password2" id="password2" bind:value={password2} placeholder="Confirm Password">
    <input type="submit" value="Sign up">
</form>