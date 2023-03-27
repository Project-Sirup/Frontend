<script lang="ts">
	import { onMount } from "svelte";
	import { writable, type Writable } from "svelte/store";

    type Invite = {
        senderId: String;
        senderName: String;
        receiverId: String;
        receiverName: String;
        organisationId: String;
        organisationName: String;
    }
    type Announcement = {
        announcement: String;
    }
    type Message = {
        invite: Invite | undefined;
        announcement: Announcement | undefined;
    }

    const invites: Writable<Invite[]> = writable([]);
    let error: String | undefined = undefined;

    onMount(() => {
        let sse = new EventSource("http://127.0.0.1:2300/sse/user01",{withCredentials:false});
        sse.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.invite) {
                invites.update(invites => ([...invites, data.invite]));
                return;
            }
            if (data.announcement) {
                console.log(data.announcement);
            }
        }
        sse.onerror = (err) => {
            error = err.type
        }
    });
</script>

<p>USER</p>
<div>
    {#each $invites as invite}
        <div>{invite.senderName} invited you to join {invite.organisationName}</div>
    {/each}
</div>