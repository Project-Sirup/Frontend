<script lang="ts">
	  import { onMount } from "svelte";
    import SideBar from "../../components/SideBar.svelte";
    import { user } from "../../stores/User";
	  import { invites } from "../../stores/Invites";
	  import type { Invite } from "../../models/Invite";
    import GlobalNotificationBar from '../../components/GlobalNotificationBar.svelte';
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import { PUBLIC_NOTI_ADDRESS, PUBLIC_NOTI_PORT } from "$env/static/public";

    let sse;

    const globalMes: Writable<string> = writable<string | undefined>(undefined);

    type EventType = "invite" | "global" | "other";
    type Event = {
        eventType: EventType;
        message: string;
        data: any;
    }

    onMount(async () => {
        //await uvm().init();
        //gvm().getAll();
        sse = new EventSource(`${PUBLIC_NOTI_ADDRESS}:${PUBLIC_NOTI_PORT}/api/v1/subscribe/${$user?.userId}`);
        sse.onmessage = (res) => {
            const event: Event = JSON.parse(res.data);
            console.log(event);
            if(event.eventType === "invite") {
                invites.update(invites => {
                    invites.push(JSON.parse(event.data) as Invite);
                    return invites;
                })
                console.log(res.data);
            }
            else if(event.eventType === "global") {
                console.log(event.message);
                globalMes.set(event.message);
            }
        }
    });
</script>

<style>
    .content {
        margin-inline: 25%;
        margin-bottom: 4rem;
    }
    .less {
        margin-top: 3rem;
    }
</style>


<div class="content">
    {#if $globalMes}
        <GlobalNotificationBar message={$globalMes}/>
        <div class='less'>
            <slot></slot>
            <SideBar top='3rem'/>
        </div>
    {:else}
        <slot></slot>
        <SideBar/>
    {/if}
</div>