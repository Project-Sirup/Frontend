<script lang="ts">
	  import { onMount } from "svelte";
    import SideBar from "../../components/SideBar.svelte";
    import { user } from "../../stores/User";
	  import { invites } from "../../stores/Invites";
	  import type { Invite } from "../../models/Invite";

    let sse;

    onMount(async () => {
        //await uvm().init();
        //gvm().getAll();
        sse = new EventSource(`http://127.0.0.1:2104/api/v1/sse/${$user?.userId}`);
        sse.onmessage = (res) => {
            invites.update(invites => {
                invites.push(JSON.parse(res.data) as Invite);
                return invites;
            })
            console.log(res.data);
        }
    });
</script>

<style>
    .content {
        margin-inline: 25%;
        margin-bottom: 3rem;
    }
</style>


<SideBar></SideBar>
<div class="content">
    <slot></slot>
</div>