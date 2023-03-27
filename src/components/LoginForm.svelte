<script lang="ts">
	import { getContext } from "svelte";
    import type User from "./UserContext.svelte";

    export let userName: String = "";
    export let password: String = "";
    const user: User = getContext("user");
    let token: String = getContext("token");
    const login = () => {
        console.log(userName);
        console.log(password);
        fetch("http://127.0.0.1:2102/api/v1/user/login", {
            method: "POST",
            body: JSON.stringify({
                user: {
                    userName: userName,
                    password: password,
                },
            }),
        })
        .then(res => res.json())
        .then(json => {
            user.userName = json.data.user.userName;
            user.userId = json.data.user.userId;
            token = json.data.token;
        })
        .catch(err => {
            alert("Could not login... please try again later");
        })
    }

</script>

<form on:submit|preventDefault={login}>
    <label for="userName">userName
        <input type="text" name="userName" id="userName" bind:value={userName}>
    </label>
    <label for="password">password
        <input type="password" name="password" id="password" bind:value={password}>
    </label>
    <input type="submit" value="Login">
</form>