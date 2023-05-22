<script lang="ts">
	import type { Microservice } from "../models/Microservice";
	import mvm from '../stores/Microservice';

	export let microservices: Microservice[] = [];

	function gotoMicro(microservice: Microservice) {
		mvm().set(microservice);
	}
</script>

<style>
	table {
			width: 100%;
			border-collapse: collapse;
			background-color: rgb(50,50,50);
	}
	td, th {
			padding: 1rem;
	}

	th, caption {
			text-align: left;
	}

	caption {
			background-color: rgb(10,10,10);
			font-size: 2rem;
			font-weight: bold;
			padding: 1rem;
	}
	th {
			background-color: rgba(0,0,0,.1);
	}
	tr:nth-of-type(2n) {
      background-color: rgba(0,0,0,.2);
	}
	a {
			text-decoration: underline;
			color: white;
	}
</style>

<table>
	<caption>Microservices</caption>
	<tr>
		<th>Name</th>
		<th>Language</th>
		<th>API</th>
		<th>Database</th>
		<th>Edit</th>
	</tr>
	{#each microservices as micro}
		<tr>
			<td data-cell='name'>{micro.microserviceName}</td>
			{#if micro.microserviceFile}
				<td data-cell='language'>{micro.microserviceFile.microservice.language.name}</td>
				<td data-cell='api'>{micro.microserviceFile.microservice.api.type}</td>
				<td data-cell='database'>{micro.microserviceFile.microservice.database.name}</td>
			{:else}
				<td data-cell='language'> - </td>
				<td data-cell='api'> - </td>
				<td data-cell='database'> - </td>
			{/if}
			<td><a on:click={() => gotoMicro(micro)} href="/tool/microservice/{micro.microserviceId}">Edit</a></td>
		</tr>
	{/each}
</table>