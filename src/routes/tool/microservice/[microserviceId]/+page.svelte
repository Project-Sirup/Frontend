<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import type {
		ApiType,
		Database,
		Generator,
		Language,
		Manifest,
		OptionType
	} from '../../../../models/Generator';
	import type { GenCollection, GenField, GenFile } from '../../../../models/GenFile';
	import gvm, { generators } from '../../../../stores/Generators';
	import mvm, { microservice, microservices } from '../../../../stores/Microservice';
	import { organisation } from '../../../../stores/Organisation';
	import { project } from '../../../../stores/Project';
	import ColorBackground from '../../../../components/ColorBackground.svelte';

	onMount(async () => {
		await gvm().getAll();
		if ($microservice.microserviceFile && $microservice.microserviceFile.generatedFrom) {
			console.log($microservice.microserviceFile.generatedFrom);
			currentGen.set(
				$generators.filter(
					(gen) => (gen.serviceId = $microservice.microserviceFile.generatedFrom)
				)[0] || $generators[0]
			);
			language.set(
				$currentGen.manifest.languages.filter(
					(lang) => $microservice.microserviceFile.microservice.language.name === lang.language
				)[0] || $currentGen.manifest.languages[0]
			);
			api.set(
				$currentGen.manifest.apiTypes.filter(
					(api) => $microservice.microserviceFile.microservice.api.type === api.apiType
				)[0] || $currentGen.manifest.apiTypes[0]
			);
			database.set(
				$currentGen.manifest.databases.filter(
					(db) => $microservice.microserviceFile.microservice.database.name === db.database
				)[0] || $currentGen.manifest.databases[0]
			);
			genJson.update((genJson) => {
				genJson = $microservice.microserviceFile;
				return genJson;
			});
			console.log($genJson.generatedFrom);
		} else {
			currentGen.set($generators[0]);
			language.set($generators[0].manifest.languages[0]);
			api.set($generators[0].manifest.apiTypes[0]);
			database.set($generators[0].manifest.databases[0]);
			genJson.update((genJson) => {
				genJson.generatedFrom = $generators[0].serviceId;
				genJson.microservice.language.name = $language.language;
				genJson.microservice.api.type = $api.apiType;
				genJson.microservice.database.name = $database.database;
				genJson.microservice.language.options['buildTool'] = 'Maven';
				return genJson;
			});
			console.log($genJson);
		}
	});

	const saveText: Writable<string> = writable<string>('');

	const viewJson: Writable<boolean> = writable<boolean>(false);

	const configureExternal: Writable<boolean> = writable<boolean>(false);

	const chooseLanguage: Writable<boolean> = writable<boolean>(false);

	const configureLanguage: Writable<boolean> = writable<boolean>(false);

	const languageConfigsShow: Writable<boolean[]> = writable<boolean[]>([]);

	const languageConfigs: Writable<string[]> = writable<string[]>([]);

	const chooseApi: Writable<boolean> = writable<boolean>(false);

	const configureApi: Writable<boolean> = writable<boolean>(false);

	const apiConfigs: Writable<Map<string, any>> = writable<Map<string, any>>(new Map());

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

	const collectionName: Writable<string> = writable<string>('');

	const fieldName: Writable<string> = writable<string>('');

	const fieldType: Writable<string> = writable<string>('Type');

	const fieldRef: Writable<string> = writable<string>('Reference');

	const genJson: Writable<GenFile> = writable({
		sirup_v: 1,
		docker: true,
		microservice: {
			microserviceName: $microservice?.microserviceName,
			microserviceId: $microservice?.microserviceId,
			language: {
				name: $language,
				options: {}
			},
			database: {
				name: $database,
				data: {
					collections: []
				},
				options: {}
			},
			api: {
				type: $api,
				options: {}
			},
			external: {
				name: 'EXTERNAL'
			}
		}
	} as GenFile);

	function selectLanguage(gen: Generator, _language: Language) {
		$language = _language;
		/*microservice.update(micro => {
			micro.microserviceFile.generatedFrom = gen.serviceId;
			return micro;
		});*/
		genJson.update((genJson) => {
			genJson.sirup_v = gen.manifest.sirup_v;
			genJson.microservice.language.name = $language.language;
			genJson.microservice.language.options['buildTool'] = 'Maven';
			return genJson;
		});

		$currentGen = gen;
		$chooseLanguage = !$chooseLanguage;
	}

	function selectApi(_api: ApiType) {
		$api = _api;
		genJson.update((genJson) => {
			genJson.microservice.api.type = $api.apiType;
			return genJson;
		});
		$chooseApi = !$chooseApi;
	}

	function selectDb(_database: Database) {
		$database = _database;
		genJson.update((genJson) => {
			genJson.microservice.database.name = $database.database;
			return genJson;
		});
		$chooseDatabase = !$chooseDatabase;
	}

	function addCollection() {
		const collection = { name: $collectionName, fields: [] } as GenCollection;
		$currentCollection = collection;
		collections.update((collections) => {
			collections.push(collection);
			return collections;
		});
		genJson.update((genJson) => {
			genJson.microservice.database.data.collections = $collections;
			return genJson;
		});
	}

	function selectCollection(_col: GenCollection) {
		if ($currentCollection === _col) {
			$currentCollection = undefined;
			return;
		}
		$currentCollection = _col;
	}

	function addDataField(index: number) {
		collections.update((collections) => {
			const field = {
				name: $fieldName,
				type: $fieldType,
				ref: $fieldRef === 'Reference' ? undefined : $fieldRef
			} as GenField;
			collections[index].fields.push(field);
			return collections;
		});
		$genJson = $genJson;
		$fieldRef = 'Reference';
	}

	function addLanguageOption(option: string, index: number) {
		genJson.update((genJson) => {
			genJson.microservice.language.options[option] = $languageConfigs[index];
			return genJson;
		});
	}

	function addLanguageOptionValue(option: string, value: string, index: number) {
		genJson.update((genJson) => {
			genJson.microservice.language.options[option] = value;
			return genJson;
		});
		$languageConfigsShow[index] = !$languageConfigsShow[index];
	}

	function addApiOption(option: string, index: number) {
		genJson.update((genJson) => {
			genJson.microservice.api.options[option] = $apiConfigs[index];
			return genJson;
		});
	}

	function addApiOptionValue(option: string, value: string, index: number) {
		genJson.update((genJson) => {
			genJson.microservice.api.options[option] = value;
			return genJson;
		});
		$languageConfigsShow[index] = !$languageConfigsShow[index];
	}

	function addApiOptionRepeated(option: string, ...options) {
		console.log($apiConfigs);
		const obj = {};
		options.forEach((o) => {
			o.forEach((_o) => {
				console.log('_o', _o.name);
				console.log($apiConfigs[_o.name]);
				obj[_o.name] = $apiConfigs[_o.name];
			});
		});
		genJson.update((genJson) => {
			if (genJson.microservice.api.options[option]) {
				genJson.microservice.api.options[option].push(obj);
			} else {
				genJson.microservice.api.options[option] = [obj];
			}
			return genJson;
		});
		$apiConfigs = new Map();
	}

	function addApiOptionInnerRepeated(option: string, ...options) {
		const obj = {};
		console.log($apiConfigs);

		options.forEach((o) => {
			o.forEach((_o) => {
				console.log($apiConfigs[option]);
				obj[_o.name] = $apiConfigs[_o.name];
			});
		});
		if ($apiConfigs[option]) {
			apiConfigs.update((apiConfigs) => {
				apiConfigs[option].push(obj);
				return apiConfigs;
			});
		} else {
			apiConfigs.update((apiConfigs) => {
				apiConfigs[option] = [obj];
				return apiConfigs;
			});
		}
	}

	async function sendGenFile() {
		$generating = true;
		gvm()
			.generate($currentGen.serviceAddress, $genJson)
			.then((res) => {
				downloadLink.set(res);
				console.log(res);
				$generating = false;
			});
	}

	async function save() {
		$microservice.microserviceFile = $genJson;
		await mvm().save($microservice);
		$saveText = ' ✓';
		setTimeout(() => {
			$saveText = '';
		}, 500);
	}
</script>

<svelte:head>
	<title
		>Sirup/{$organisation?.organisationName}/{$project?.projectName}/{$microservice?.microserviceName}</title
	>
</svelte:head>

<div class="head">
	<h1>{$microservice?.microserviceName}</h1>
	<a class="a-button" href="/tool/project/{$microservice?.projectId}">Back to {$project?.projectName}</a
	>
</div>

<ColorBackground>
	<div class="section language">
		<h2 class="section-header">Select Language</h2>
			<div class="selection-border">
				<div class="selection">
					{#if $language}
						<h3 class="selected" on:click={() => ($chooseLanguage = !$chooseLanguage)}>
							{$language.language}
						</h3>
					{/if}
						{#each $generators as gen}
							{#if $chooseLanguage}
								<ul class="selection-list">
									{#each gen.manifest.languages as lang}
										<li class="selection-option lang-option" on:click={() => selectLanguage(gen, lang)}>
											<h4 class="selection-title">{lang.language}</h4>
											<h5 class="selection-description">{lang.description}</h5>
										</li>
									{/each}
								</ul>
							{/if}
						{/each}
				</div>
			</div>

		<div class="config">
			<h3 class="config-title" on:click={() => ($configureLanguage = !$configureLanguage)}>
				Language Options
			</h3>
			{#if $configureLanguage}
				{#each $language.options as option, i}
					<div class='option'>
						{#each Object.entries(option) as [optionName, optionValue]}
						{#each Object.entries(optionValue) as [key, values]}
							{#if key === 'value'}
								<h3 class="option-name">{optionName}</h3>
								<div class="add">
									{#if values === 'number'}
										<input
											type="number"
											name={optionName}
											id=ln_{optionName}
											bind:value={$languageConfigs[i]}
										/>
									{/if}
									{#if values === 'string'}
										<input
											type="text"
											name={optionName}
											id=ls_{optionName}
											bind:value={$languageConfigs[i]}
										/>
									{/if}
									<input
										type="submit"
										value="Submit"
										on:click={() => addLanguageOption(optionName, i)}
									/>
								</div>
							{/if}
							{#if key === 'selection'}
								<h3
									class="option-name selection-title"
									on:click={() => ($languageConfigsShow[i] = !$languageConfigsShow[i])}
								>
									{optionName}: {$genJson.microservice.language.options[optionName]}
								</h3>
								{#if $languageConfigsShow[i]}
									<ul>
										{#each values as value}
											<li on:click={() => addLanguageOptionValue(optionName, value, i)}>
												<h4 class="selection-title">{value}</h4>
											</li>
										{/each}
									</ul>
								{/if}
							{/if}
							{#if key === 'object'}
								<h1>obj</h1>
							{/if}
							{#if key === 'repeated'}
								<h1>rep</h1>
							{/if}
						{/each}
					{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div class="section-gap" />
	<div class="section api">
		<h2 class="section-header">Select API</h2>
		<div class="selection-border">
			<div class="selection">
				{#if $currentGen}
					{#if $api}
						<h3 class="selected" on:click={() => ($chooseApi = !$chooseApi)}>{$api.apiType}</h3>
					{/if}
					{#if $chooseApi}
						<ul class="selection-list">
							{#each $currentGen.manifest.apiTypes as api}
								<li class="selection-option api-option" on:click={() => selectApi(api)}>
									<h4 class="selection-title">{api.apiType}</h4>
									<h5 class="selection-description">{api.description}</h5>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</div>
		</div>

		<div class="config">
			<h3 class="config-title" on:click={() => ($configureApi = !$configureApi)}>API Options</h3>
			{#if $configureApi}
				{#each $api.options as option, i}
					<div class='option'>
						{#each Object.entries(option) as [optionName, optionValue]}
						{#each Object.entries(optionValue) as [key, value]}
							{#if key === 'value'}
								<h3 class="option-name">{optionName}</h3>
								<div class="add">
									{#if value === 'number'}
										<input
											type="number"
											name={optionName}
											id=n_{optionName}
											bind:value={$apiConfigs[i]}
										/>
									{/if}
									{#if value === 'string'}
										<input
											type="text"
											name={optionName}
											id=s_{optionName}
											bind:value={$apiConfigs[i]}
										/>
									{/if}
									<input
										type="submit"
										value="Submit"
										on:click={() => addApiOption(optionName, i)}
									/>
								</div>
							{/if}
							{#if key === 'selection'}
								<h3
									class="option-name selection-title"
									on:click={() => ($apiConfigs[i] = !$apiConfigs[i])}
								>
									{optionName}: {$genJson.microservice.api.options[optionName]}
								</h3>
								{#if $apiConfigs[i]}
									<ul>
										{#each value as v}
											<li on:click={() => addApiOptionValue(optionName,v, i)}>
												<h4 class="selection-title">{v}</h4>
											</li>
										{/each}
									</ul>
								{/if}
							{/if}
							{#if key === 'repeated'}
								<!-- Array of values -->
								<h3 class="option-name">{optionName}</h3>
								{#each Object.entries(value) as [innerKey, innerValue]}
									{#if innerKey === 'object'}
										{#each innerValue.values as objectValues}
											<div class="row1">
												{#if objectValues.value && objectValues.value === 'string'}
													<input
														type="text"
														name={optionName}
														id="j_{optionName}"
														bind:value={$apiConfigs[objectValues.name]}
														placeholder="Enter {objectValues.name}"
													/>
												{/if}
												{#if objectValues.selection}
													<select
														name={optionName}
														id="k_{optionName}"
														bind:value={$apiConfigs[objectValues.name]}
													>
														{#each objectValues.selection as select}
															<option value={select}>{select}</option>
														{/each}
													</select>
												{/if}
											</div>
											<div class="row1">
												{#if objectValues.repeated}
													<div class="inner-rows">
														{#if $apiConfigs[objectValues.name]}
															{#each $apiConfigs[objectValues.name] as e}
																<div class="inner-row1">
																	<pre>{JSON.stringify(e)}</pre>
																</div>
															{/each}
														{/if}
														{#each Object.entries(objectValues.repeated) as [innerRepeatedType, innerRepeatedValues]}
															<div class="inner-row2">
																{#if innerRepeatedType === 'object'}
																	{#each Object.entries(innerRepeatedValues.values) as [innerObjectType, innerObjectValues]}
																		{#if innerObjectValues.value && innerObjectValues.value === 'string'}
																			<input
																				type="text"
																				name={innerKey}
																				id={innerKey}
																				bind:value={$apiConfigs[innerObjectValues.name]}
																				placeholder="Enter {innerObjectValues.name}"
																			/>
																		{/if}
																		{#if innerObjectValues.selection}
																			<select
																				name={innerKey}
																				id="k_{innerKey}"
																				bind:value={$apiConfigs[innerObjectValues.name]}
																			>
																				{#each innerObjectValues.selection as select}
																					<option value={select}>{select}</option>
																				{/each}
																			</select>
																		{/if}
																	{/each}
																{/if}
																<input
																	type="submit"
																	value="Add {innerRepeatedValues.name}"
																	on:click={() =>
																		addApiOptionInnerRepeated(
																			objectValues.name,
																			innerRepeatedValues.values
																		)}
																/>
															</div>
														{/each}
													</div>
												{/if}
											</div>
										{/each}
									{/if}
									<div class="row2">
										<input
											class="new-submit"
											type="submit"
											value="Submit"
											on:click={() => addApiOptionRepeated(optionName, innerValue.values)}
										/>
									</div>
								{/each}
							{/if}
						{/each}
					{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div class="section-gap" />
	<div class="section database">
		<h2 class="section-header">Select Database</h2>
		<div class="selection-border">
			<div class="selection">
				{#if $currentGen}
					{#if $database}
						<h3 class="selected" on:click={() => ($chooseDatabase = !$chooseDatabase)}>
							{$database.database}
						</h3>
					{/if}
					{#if $chooseDatabase}
						<ul class="selection-list">
							{#each $currentGen.manifest.databases as db}
								<li class="selection-option db-option" on:click={() => selectDb(db)}>
									<h4 class="selection-title">{db.database}</h4>
									<h5 class="selection-description">{db.description}</h5>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</div>
		</div>
		<div class="config">
			<h3 class="config-title" on:click={() => ($configureDatabase = !$configureDatabase)}>
				Database Options
			</h3>
			{#if $configureDatabase}
				<div class="add">
					<input
						type="text"
						name="collectionName"
						id="collectionName"
						bind:value={$collectionName}
						placeholder="Collection name"
					/>
					<input type="submit" value="Add Collection" on:click={() => addCollection()} />
				</div>
				<ul class="collections">
					{#each $collections as col, i}
						<li>
							<h4 class="selection-title selection-option" on:click={() => selectCollection(col)}>
								{col.name}
							</h4>
							{#if col === $currentCollection}
								<div class="collection-controls">
									<div class="row1">
										<input
											type="text"
											name="fieldName"
											id="fieldName"
											bind:value={$fieldName}
											placeholder="Field name"
										/>
										<select name="fieldType" id="fieldType" bind:value={$fieldType}>
											<option value="Type" disabled>Type</option>
											{#each $database.supportedTypes as type}
												<option value={type}>{type}</option>
											{/each}
										</select>
										<select name="ref" id="ref" bind:value={$fieldRef}>
											<option disabled value="Reference">Reference</option>
											{#each $collections as c}
												{#if c !== col}
													{#each c.fields as f}
														<option value="{c.name}.{f.name}">{c.name}.{f.name}</option>
													{/each}
												{/if}
											{/each}
										</select>
										<!--	<input type='text' name='fieldType' id='fieldType' bind:value={$fieldType}>-->
									</div>
									<div class="row2">
										<input
											class="new-submit"
											type="submit"
											value="Add Field"
											on:click|preventDefault={() => addDataField(i)}
										/>
									</div>
								</div>
								{#each col.fields as field}
									<div>
										<span class="field-name">{field.name}</span>:
										<span class="field-type">{field.type}</span>
										<span class="field-ref">{field.ref ? ' references ' + field.ref : ''}</span>
									</div>
								{/each}
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</ColorBackground>

<div class="external">
	<h2 class="a-button" on:click={() => $configureExternal = !$configureExternal}>External</h2>
	{#if $configureExternal}
		{#each $microservices as micro}
			{#if micro.microserviceId !== $microservice.microserviceId}
				<h1>{micro.microserviceName}</h1>
			{/if}
		{/each}
	{/if}
</div>

<div class="controls">
	<button on:click={() => save()}>Save{$saveText}</button>

	<button on:click={() => sendGenFile()}>Generate</button>
	{#if $generating}
		Generating code...
	{/if}
	{#if $downloadLink}
		<a href={$downloadLink}>Download</a>
	{/if}
	<button on:click={() => ($viewJson = !$viewJson)}>Show JSON</button>

	{#if $viewJson}
		<h3>JSON</h3>
		<ColorBackground border_radius={"5px"}>
			<pre><code>{JSON.stringify($genJson, null, 4)}</code></pre>
		</ColorBackground>
	{/if}
</div>

<style>
		.option {
				border: solid rgb(75,75,75) 2px;
				margin: .5rem;
		}
	.section-header {
		background-color: hsl(200, 100%, 0%);
		margin: 0;
		padding: 1rem;
	}
	.section-gap {
		background: rgb(25, 25, 25);
		height: 1rem;
	}
	.selection {
		width: 100%;
		background-color: hsl(200, 100%, 1%);
	}
	.selection-border {
		background: rgba(0, 0, 0, 0);
		padding: 0.25rem;
	}
	.selection-list {
		z-index: 9;
		background: black;
	}
	.selection-option {
		z-index: 99;
	}
	ul {
		z-index: 9;
		list-style-type: none;
		list-style-position: outside;
		padding: 0;
		margin: 0;
		gap: 0;
		width: 100%;
	}
	.selection-title,
	.selection-description,
	.selected {
		padding: 1rem;
		margin: 0;
		user-select: none;
		cursor: pointer;
	}
	.selection-title {
		background-color: rgba(255, 255, 255, 0.1);
	}
	.selection-description {
		background-color: rgba(255, 255, 255, 0.2);
	}
	li:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.selected {
		background-color: rgba(255, 255, 255, 0.3);
		padding: 1rem;
	}
	.collections > li {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.collections > li:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	.collections > li:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.2);
	}
	.collections > li:nth-child(odd):hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.add {
		display: flex;
		width: 100%;
	}
	.collection-controls {
		display: flex;
		flex-direction: column;
	}
	.row1 {
		display: flex;
		flex-direction: row;
	}
	.inner-rows {
		display: flex;
		flex-direction: column;
	}
	.inner-row2 {
		display: flex;
		flex-direction: row;
	}
	::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}
	input[type='text'],
	input[type='number'] {
		border: none;
		background-color: rgb(75, 75, 75);
		font-size: 1rem;
		padding: 1rem 1rem;
		color: white;
		width: 100%;
	}
	input[type='submit'] {
		border: none;
		background-color: rgb(50, 50, 50);
		font-size: 1rem;
		padding: 1rem;
		color: white;
		cursor: pointer;
	}
	.config {
		background-color: rgb(25, 25, 25);
		padding: 1rem 0.5rem;
		margin: 0;
	}
	.config-title {
		background-color: rgb(75, 75, 75);
		cursor: pointer;
		padding: 1rem;
		margin: 0;
	}
	pre {
		border-radius: 5px;
		margin: 2px;
		padding: .25rem;
		background-color: rgb(10, 10, 10);
		width: calc(100% - 4px - .5rem);
		border-color: transparent;
		word-wrap: break-word;
	}
	select {
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		font-size: 1rem;
		padding: 1rem;
		color: white;
		border: none;
	}
	.option-name {
		padding: 1rem;
	}
	select {
		background-color: rgb(50, 50, 50);
	}
	.controls {
		position: absolute;
		right: 2rem;
		top: 4rem;
		width: 25%;
		display: flex;
		flex-direction: column;
		padding-bottom: 4rem;
	}
	.head {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	a,
	button {
		border: none;
		background-color: rgb(75, 75, 75);
		color: white;
		padding: 1rem;
		margin: 0.125rem;
		text-decoration: none;
		text-align: center;
		cursor: pointer;
	}
</style>
