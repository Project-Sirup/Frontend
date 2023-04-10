<script lang="ts">
	import type { Organisation } from "../models/Organisation";
	import ovm from "../stores/Organisation";
	import { token, user } from "../stores/User";

    let orgName = "";

    async function newOrg() {
        ovm().create({organisationName: orgName} as Organisation)
        .then(res => window.location.href = `/tool/organisation/${res.organisationId}`);
    }
</script>

<form on:submit|preventDefault={newOrg}>
    <label for="orgName">Organisation Name
        <input bind:value={orgName} type="text" name="orgName" id="orgName">
    </label>
    <input type="submit" value="Create new organisation">
</form>