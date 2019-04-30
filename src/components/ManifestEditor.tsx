import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { ICampaign } from '../classes/Campaign';

function MapItem(props:any){
	return(<fieldset className="form-group">
	<label htmlFor="name">name</label>
	<input 
	value=""
	onChange={e => {}}
	type="text" 
	className="form-control" 
	name="name" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter an name for the map" 
	/>
	<label htmlFor="destination">destination</label>
	<input 
	value=""
	onChange={e => {}}
	type="text" 
	className="form-control" 
	name="destination" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter a destination for the map" 
	/>
	<label htmlFor="description">Description</label>
	<textarea 
	value=""
	onChange={e => {}}
	className="form-control" 
	name="description" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter a description for the map" 
	/>
	<label htmlFor="author">fileEntry</label>
	<input 
	value=""
	onChange={e => {}}
	type="text" 
	className="form-control" 
	name="fileEntry" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter a fileEntry for the map" 
	/>
	<label htmlFor="source">source</label>
	<input 
	value=""
	onChange={e => {}}
	type="date" 
	className="form-control" 
	name="source" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter a source for the map" 
	/>
	<label htmlFor="sourceFormat">sourceFormat</label>
	<input 
	value=""
	onChange={e => {}}
	type="date" 
	className="form-control" 
	name="sourceFormat" 
	aria-describedby="runParamsHelp" 
	placeholder="Enter a sourceFormat for the map" 
	/>
	</fieldset>);
}
function ManifestEditor (props:any) {
	const {schema, uiSchema, itemData} = this.props;
	return (
		<form>
		<h1>Manifest Editor</h1>
		<fieldset className="form-group">
		<label htmlFor="id">ID</label>
		<input 
		value=""
		onChange={e => {}}
		type="text" 
		className="form-control" 
		name="id" 
		aria-describedby="runParamsHelp" 
		placeholder="Enter an ID for the campaign" 
		/>
		<label htmlFor="name">Name</label>
		<input 
		value=""
		onChange={e => {}}
		type="text" 
		className="form-control" 
		name="name" 
		aria-describedby="runParamsHelp" 
		placeholder="Enter a name for the campaign" 
		/>
		<label htmlFor="description">Description</label>
		<textarea 
			value=""
			onChange={e => {}}
			className="form-control" 
			name="description" 
			aria-describedby="runParamsHelp" 
			placeholder="Enter a description for the campaign" 
			/>
		<label htmlFor="author">author</label>
		<input 
		value=""
		onChange={e => {}}
		type="text" 
		className="form-control" 
		name="author" 
		aria-describedby="runParamsHelp" 
		placeholder="Enter a author for the campaign" 
		/>
		<label htmlFor="lastUpdated">lastUpdated</label>
		<input 
		value=""
		onChange={e => {}}
		type="date" 
		className="form-control" 
		name="lastUpdated" 
		aria-describedby="runParamsHelp" 
		placeholder="Enter a author for the campaign" 
		/>
		<MapItem />
		</fieldset>
		</form>
		);
		/*"id":string,
		"name":string,
		"author":string,
		"description":string,
		"progress":number,
		"installed":boolean,
		"entryPoint":string,
		"maps":Array<IMap>,
		"mods":Array<IMod>,
		"lastUpdated":string,
		"patchNotes":Array<object>,
		"screenshots":Array<string>, */
	}
	
	
	export default ManifestEditor;