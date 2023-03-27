<script context="module" lang="ts">
	import { getContext, setContext } from "svelte";

    export type User = {
        userId: String;
        userName: String;
    }
    setContext<User | undefined>("user", undefined)
    setContext<String | undefined>("token", undefined);
</script>
