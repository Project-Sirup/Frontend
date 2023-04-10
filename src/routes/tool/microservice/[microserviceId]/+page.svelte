<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type { Writable } from "svelte/store";
	import type { ApiType, Database, Generator, Language, Manifest, OptionType } from '../../../../models/Generator';
	import type { GenCollection, GenField, GenFile } from '../../../../models/GenFile';
	import gvm, { generators } from "../../../../stores/Generators";
	import mvm, { microservice } from "../../../../stores/Microservice";

	onMount(async () => {
		await gvm().getAll();
		currentGen.set($generators[0]);
		language.set($generators[0].manifest.languages[0]);
		api.set($generators[0].manifest.apiTypes[0]);
		database.set($generators[0].manifest.databases[0]);
		genJson.update(genJson => {
			genJson.microservice.language.name = $language.language;
			genJson.microservice.api.type = $api.apiType;
			genJson.microservice.database.name = $database.database;
			genJson.microservice.language.options["buildTool"] = "Maven";
			return genJson;
		});
		console.log($genJson);
	});

	const viewJson: Writable<boolean> = writable<boolean>(false);

	const chooseLanguage: Writable<boolean> = writable<boolean>(false);

	const configureLanguage: Writable<boolean> = writable<boolean>(false);

	const languageConfigsShow: Writable<boolean[]> = writable<boolean[]>([]);

	const languageConfigs: Writable<string[]> = writable<string[]>([]);

	const chooseApi: Writable<boolean> = writable<boolean>(false);

	const chooseDatabase: Writable<boolean> = writable<boolean>(false);

	const configureDatabase: Writable<boolean> = writable<boolean>(false);

	const downloadLink: Writable<string | undefined> = writable<string | undefined>(undefined);

	const generating: Writable<boolean> = writable<boolean>(false);

	const currentGen: Writable<Generator> = writable<Generator>();
	
	const language: Writable<Language> = writable<Language>();

	const api: Writable<ApiType> = writable<ApiType>();

	const database: Writable<Database> = writable<Database>();

	const collections: Writable<GenCollection[]> = writable<GenCollection[]>([]);

	const currentCollection: Writable<GenCollection> = writable<GenCollection>();

	const collectionName: Writable<string> = writable<string>("");

	const fieldName: Writable<string> = writable<string>("");

	const fieldType: Writable<string> = writable<string>("Type");

	const fieldRef: Writable<string> = writable<string>("Reference");

	const genJson: Writable<GenFile> = writable({
		sirup_v: 1,
		docker: true,
		microservice: {
			microserviceName: $microservice?.microserviceName,
			microserviceId: $microservice?.microserviceId,
			language: {
				name: $language,
				options: {},
			},
			database: {
				name: $database,
				data: {
					collections: [],
				},
				options: {},
			},
			api: {
				type: $api,
				options: {},
			},
			external: {
				name: "EXTERNAL",
			},
		},
	} as GenFile);

	function selectLanguage(gen: Generator, _language: Language) {
		$language = _language;
		genJson.update(genJson => {
			genJson.sirup_v = gen.manifest.sirup_v;
			genJson.microservice.language.name = $language.language;
			genJson.microservice.language.options["buildTool"] = "Maven";
			return genJson;
		});

		$currentGen = gen;
		$chooseLanguage = !$chooseLanguage;
	}

	function selectApi(_api: ApiType) {
		$api = _api;
		genJson.update(genJson => {
			genJson.microservice.api.type = $api.apiType;
			return genJson;
		});
		$chooseApi = !$chooseApi;
	}

	function selectDb(_database: Database) {
		$database = _database
		genJson.update(genJson => {
			genJson.microservice.database.name = $database.database;
			return genJson;
		});
		$chooseDatabase = !$chooseDatabase;
	}

	function addCollection() {
		const collection = {name: $collectionName, fields: []} as GenCollection;
		$currentCollection = collection;
		collections.update(collections => {
			collections.push(collection);
			return collections;
		});
		genJson.update(genJson => {
			genJson.microservice.database.data.collections = $collections;
			return genJson;
		});

	}

	function selectCollection(_col: GenCollection) {
		if ($currentCollection === _col){
			$currentCollection = undefined;
			return;
		}
		$currentCollection = _col;
	}

	function addDataField(index: number) {
		collections.update(collections => {
			const field = {name: $fieldName, type: $fieldType, ref: $fieldRef === "Reference" ? undefined : $fieldRef} as GenField;
			collections[index].fields.push(field);
			return collections;
		});
		$genJson = $genJson;
	}

	function addLanguageOption(option: string, index: number) {
		genJson.update(genJson => {
			genJson.microservice.language.options[option] = $languageConfigs[index];
			return genJson;
		});
	}

	function addLanguageOptionValue(option: string, value: string, index: number) {
		genJson.update(genJson => {
			genJson.microservice.language.options[option] = value;
			return genJson;
		});
		$languageConfigsShow[index] = !$languageConfigsShow[index];
	}

	async function sendGenFile() {
		$generating = true;
		const res = await fetch($currentGen.serviceAddress, {
			method: "POST",
			body: JSON.stringify($genJson),
		});
		const json = await res.json();
		downloadLink.set(json.data);
		console.log(json);
		$generating = false;
	}

	function save() {
		$microservice.microserviceFile = $genJson;
		mvm().save($microservice);
	}

</script>

<style>
		.selection {
				width: 100%;
		}
		ul {
				list-style-type: none;
				list-style-position: outside;
				padding: 0;
				margin: 0;
				gap: 0;
				width: 100%;
		}
    .selection-title, .selection-description, .selected {
        padding: 1rem;
        margin: 0;
        user-select: none;
        cursor: pointer;
    }
    .selection-title {
				background-color: rgba(255,255,255,.1);
		}
    .selection-description {
				background-color: rgba(255,255,255,.2);
		}
		li:hover {
				background-color: rgba(255,255,255,.2);
		}
		.selected {
				background-color: rgba(255,255,255,.3);
				padding: 1rem;
		}
		.collections > li, .option-values > li {
				background-color: rgba(0,0,0,.1);
		}
    .collections > li:hover, .option-values > li:hover {
        background-color: rgba(255,255,255,.1);
		}
    .collections > li:nth-child(odd), .option-values > li:nth-child(odd) {
        background-color: rgba(0,0,0,.2);
		}
    .collections > li:nth-child(odd):hover, .option-values > li:nth-child(odd):hover {
        background-color: rgba(255,255,255,.2);
    }
    .add {
				display: flex;
				width: 100%;
		}
		.collection-controls {
				display: flex;
		}
		::placeholder {
				color: rgba(255,255,255,.5)
		}
		input[type="text"] {
        border: none;
        background-color: rgba(255, 255, 255, .2);
        font-size: 1rem;
        padding: .5rem 1rem;
        color: white;
        width: 100%;
		}
		input[type="submit"] {
        border: none;
        background-color: rgba(255, 255, 255, .3);
        font-size: 1rem;
				padding: 1rem;
        color: white;
				cursor: pointer;
		}
		.config {
				background-color: rgba(255,255,255,.2);
				padding: 0;
				margin: 1rem 0;
		}
		.config-title {
        background-color: rgba(0,0,0,.1);
        cursor: pointer;
        padding: 1rem;
        margin: 1rem 0;
		}
		pre {
				border-radius: 5px;
				padding: 1rem;
				background-color: rgba(0,0,0,.5);
				width: fit-content;
		}
		select {
				width: 100%;
				background: rgba(255,255,255,.1);
				font-size: 1rem;
				padding: 1rem;
				color: white;
				border: none;
		}
		.option-name {
				padding: 1rem;
		}
</style>

<h1>{$microservice?.microserviceName}</h1>

<div class='selection language'>
	<h2>Select Language</h2>
		{#each $generators as gen}

			{#if $language}
				<h3 class='selected' on:click={() => $chooseLanguage = !$chooseLanguage}>{$language.language}</h3>
			{/if}
			{#if $chooseLanguage}
				<ul>
					{#each gen.manifest.languages as lang}
						<li class='selection-option' on:click={() => selectLanguage(gen, lang)}>
							<h4 class='selection-title'>{lang.language}</h4>
							<h5 class='selection-description'>{lang.description}</h5>
						</li>
					{/each}
				</ul>
			{/if}
		{/each}

	<div class='config'>
		<h3 class='config-title' on:click={() => $configureLanguage = !$configureLanguage}>Language Options</h3>
		{#if $configureLanguage}
			{#each $language.options as option, i}
				{#each Object.entries(option) as [optionName, optionValue]}
					{#each Object.entries(optionValue) as [key, values]}
						{#if key === "value"}
							<h3 class='option-name'>{optionName}</h3>
							<div class='add'>
								<input type='text' name='{optionName}' id='i_{optionName}' bind:value={$languageConfigs[i]} placeholder='{optionName}'>
								<input type='submit' value='Submit' on:click={() => addLanguageOption(optionName,i)}>
							</div>
						{:else}
							<h3 class='option-name selection-title' on:click={() => $languageConfigsShow[i] = !$languageConfigsShow[i]}>{optionName}: {$genJson.microservice.language.options[optionName]}</h3>
							{#if $languageConfigsShow[i]}
								<ul class='option-values'>
									{#each values as value}
										<li class='selection-option' on:click={() => addLanguageOptionValue(optionName,value,i)}>
											<h4 class='selection-title'>{value}</h4>
										</li>
									{/each}
								</ul>
							{/if}
						{/if}
					{/each}
				{/each}
			{/each}
		{/if}
	</div>
</div>

<div class='selection api'>
	<h2>Select API</h2>
		{#if $currentGen}
			{#if $api}
				<h3 class='selected' on:click={() => $chooseApi = !$chooseApi}>{$api.apiType}</h3>
			{/if}
			{#if $chooseApi}
				<ul>
					{#each $currentGen.manifest.apiTypes as api}
						<li on:click={() => selectApi(api)}>
							<h4 class='selection-title'>{api.apiType}</h4>
							<h5 class='selection-description'>{api.description}</h5>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}

	<h3>API Options</h3>
</div>

<div class='selection database'>
	<h2>Select Database</h2>
		{#if $currentGen}
			{#if $database}
				<h3 class='selected' on:click={() => $chooseDatabase = !$chooseDatabase}>{$database.database}</h3>
			{/if}
			{#if $chooseDatabase}
				<ul>
					{#each $currentGen.manifest.databases as db}
						<li on:click={() => selectDb(db)}>
							<h4 class='selection-title'>{db.database}</h4>
							<h5 class='selection-description'>{db.description}</h5>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	<div class='config'>
		<h3 class='config-title' on:click={() => $configureDatabase = !$configureDatabase}>Database Options</h3>
		{#if $configureDatabase}
			<div class='add'>
				<input type='text' name='collectionName' id='collectionName' bind:value={$collectionName} placeholder='Collection name'>
				<input type='submit' value='Add Collection' on:click={() => addCollection()}>
			</div>
			<ul class='collections'>
				{#each $collections as col, i}
					<li>
						<h4 class='selection-title selection-option' on:click={() => selectCollection(col)}>{col.name}</h4>
						{#if col === $currentCollection}
							<div class='collection-controls'>
								<input type='text' name='fieldName' id='fieldName' bind:value={$fieldName} placeholder='Field name'>
								<select name='fieldType' id='fieldType' bind:value={$fieldType}>
									<option value='Type' disabled>Type</option>
									{#each $database.supportedTypes as type}
										<option value='{type}'>{type}</option>
									{/each}
								</select>
								<select name='ref' id='ref' bind:value={$fieldRef}>
										<option disabled value='Reference'>Reference</option>
									{#each $collections as c}
										{#if c !== col}
											{#each c.fields as f}
												<option value='{c.name}.{f.name}'>{c.name}.{f.name}</option>
											{/each}
										{/if}
									{/each}
								</select>
							<!--	<input type='text' name='fieldType' id='fieldType' bind:value={$fieldType}>-->
								<input type='submit' value='Add Field' on:click|preventDefault={() => addDataField(i)}>
							</div>
							{#each col.fields as field}
								<div class='field'>
								</div>
									<div>{field.name}: {field.type}{field.ref ? " references " + field.ref : ""}</div>
							{/each}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>


<button on:click={() => $viewJson = !$viewJson}>Show JSON</button>

{#if $viewJson}
	<h3>JSON</h3>
	<pre><code>{JSON.stringify($genJson,null,4)}</code></pre>
{/if}

<button on:click={() => save()}>Save</button>

<button on:click={() => sendGenFile()}>Generate</button>
{#if $generating}
	Generating code...
{/if}
{#if $downloadLink}
	<a href={$downloadLink}>Download</a>
{/if}
