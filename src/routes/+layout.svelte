<script lang="ts">
	import Footer from "../components/Footer.svelte";
	import { error } from "../stores/Error";
	import Error from "../components/Error.svelte";
	import uvm from "../stores/User";
</script>

<link rel="stylesheet" href="/global.css">

{#if !$error}
	<slot></slot>
{:else}
	<Error></Error>
{/if}
<Footer></Footer>