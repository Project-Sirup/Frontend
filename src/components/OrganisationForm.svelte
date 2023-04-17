<script lang="ts">
	import type { Organisation } from "../models/Organisation";
	import ovm from "../stores/Organisation";
  import { error } from '../stores/Error';
  import type { Error } from '../stores/Error';

    let orgName = "";

    async function newOrg() {
        ovm().create({organisationName: orgName} as Organisation)
        .then(res => {
            if(res) {
                window.location.href = `/tool/organisation/${res.organisationId}`;
                return;
            }
            error.set({ code: 500, type: "Service", message: "Failed to create organisation" } as Error);
        });
    }
</script>

<div class='new-data new-organisation'>
    <input class='new-text' bind:value={orgName} type="text" name="orgName" id="orgName" placeholder='Organisation name'>
    <input class='new-submit' type="submit" value="Create new organisation" on:click={() => newOrg()}>
</div>
