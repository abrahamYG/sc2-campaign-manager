import React, { ChangeEvent } from 'react';
import Form from 'react-jsonschema-form';
import Campaign, { ICampaign, IMap } from '../classes/Campaign';

interface IMapItemProps{
	"index":string,
	"map": IMap,
	"setCampaignMap":(map:IMap)=>void
}

function MapItem(props:IMapItemProps){
	const {map, index, setCampaignMap} = props;
	const {name,destination,description, fileEntry, source, sourceFormat} = map;
	const onChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLSelectElement>)=>{
		console.log(e);
		const newMap = {
			...map,
			[e.currentTarget.name]:e.currentTarget.value
		}
		console.log(newMap)
		setCampaignMap(newMap);
	};

	return (
		<fieldset className="form-group campaign-form-map">
			<h3>Map {index}</h3>
			<div className="form-group row">
			<label htmlFor={`map-${index}-name`} className="col-sm-2 col-form-label">name</label>
			<input 
				id={`map-${index}-name`}
				value={name}
				onChange={onChange}
				type="text" 
				className="form-control col-sm-10"
				name="name" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter an name for the map" 
			/>
			</div>
			<div className="form-group row">
			<label htmlFor={`map-${index}-destination`} className="col-sm-2 col-form-label">destination</label>
			<input 
				id={`map-${index}-destination`}
				value={destination}
				onChange={onChange}
				type="text" 
				className="form-control col-sm-10"
				name="destination" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter a destination for the map" 
			/>
			</div>
			<div className="form-group row">
			<label htmlFor={`map-${index}-description`} className="col-sm-2 col-form-label">Description</label>
			<textarea 
				id={`map-${index}-description`}
				value={description}
				onChange={onChange}
				className="form-control col-sm-10"
				name="description" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter a description for the map" 
			/>
			</div>
			<div className="form-group row">
			
			<label htmlFor={`map-${index}-fileEntry`} className="col-sm-2 col-form-label">fileEntry</label>
			<input 
				id={`map-${index}-fileEntry`}
				value={fileEntry}
				onChange={onChange}
				type="text" 
				className="form-control col-sm-10"
				name="fileEntry" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter a fileEntry for the map" 
			/>
			</div>
			<div className="form-group row">
			<label htmlFor={`map-${index}-source`} className="col-sm-2 col-form-label">source</label>
			<input 
				id={`map-${index}-source`}
				value={source}
				onChange={onChange}
				type="text" 
				className="form-control col-sm-10"
				name="source" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter a source for the map" 
			/>
			</div>
			<div className="form-group row">
			<label htmlFor={`map-${index}-sourceFormat`} className="col-sm-2 col-form-label">sourceFormat</label>
			<select
				id={`map-${index}-sourceFormat`}
				value={sourceFormat}
				onChange={onChange}
				className="form-control col-sm-10"
				name="sourceFormat" 
				aria-describedby="runParamsHelp" 
				placeholder="Enter a sourceFormat for the map"
			>
				<option value="sc2map">SC2Map</option>
				<option value="zip">Zip</option>
			</select>
			</div>
	</fieldset>
	);
}

interface IManifestEditorProps{
	"campaign":ICampaign,
	"setCampaign":any
}

function ManifestEditor (props:IManifestEditorProps) {
	const {campaign,setCampaign} = props;
	const {maps} = campaign;
	const onChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLSelectElement>)=>{
		console.log(e);
		const newCampaign = {
			...campaign,
			[e.currentTarget.name]:e.currentTarget.value
		}
		//const property:string = e.currentTarget.name;
		//newCampaign[property] = e.currentTarget.value;
		console.log(newCampaign)
		setCampaign(newCampaign);
	};
	const addMap = ()=>{
		const newCampaign = {
			...campaign,
			maps:[...campaign.maps, Campaign.emptyMap()]
		}
		setCampaign(newCampaign);
	}
	const setCampaignMap = (map:IMap)=>{
		const maps = [...campaign.maps];
		const index = maps.findIndex(v => v.destination === map.destination);
		console.log("setCampaignMap", campaign);
		console.log("setCampaignMap", maps);
		maps[index] = map;
		const newCampaign = {
			...campaign,
			maps
		};
		setCampaign(newCampaign);
	}
	console.log("ManifestEditor props", props)
	return (
		<form>
			<h1>Manifest Editor</h1>
			<fieldset className="form-group">
				<div className="form-group row">
					<label htmlFor="campaign-id" className="col-sm-2 col-form-label">ID</label>
					<input 
						id="campaign-id"
						value={campaign.id}
						onChange={onChange}
						type="text" 
						className="form-control col-sm-10"
						name="id" 
						aria-describedby="runParamsHelp" 
						placeholder="Enter an ID for the campaign" 
						readOnly={true}
					/>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="campaign-name">Name</label>
					<input 
						id="campaign-name"
						value={campaign.name}
						onChange={onChange}
						type="text" 
						className="form-control col-sm-10"
						name="name" 
						aria-describedby="runParamsHelp" 
						placeholder="Enter a name for the campaign" 
					/>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="campaign-description">Description</label>
					<textarea 
						id="campaign-description"
						value={campaign.description}
						onChange={onChange}
						className="form-control col-sm-10"
						name="description" 
						aria-describedby="runParamsHelp" 
						placeholder="Enter a description for the campaign" 
						rows={10}
					/>
				</div>
				<div className="form-group row">
				<label className="col-sm-2 col-form-label" htmlFor="campaign-author">author</label>
				<input 
					id="campaign-author"
					value={campaign.author}
					onChange={onChange}
					type="text" 
					className="form-control col-sm-10"
					name="author" 
					aria-describedby="runParamsHelp" 
					placeholder="Enter a author for the campaign" 
				/>
				</div>
				<div className="form-group row">
				<label className="col-sm-2 col-form-label" htmlFor="campaign-lastUpdated">lastUpdated</label>
				<input 
					id="campaign-lastUpdated"
					value={new Date(campaign.lastUpdated).toISOString().slice(0,10)}
					onChange={onChange}
					type="date" 
					className="form-control col-sm-10"
					name="lastUpdated" 
					aria-describedby="runParamsHelp" 
					placeholder="Enter a author for the campaign" 
				/>
				</div>
				<h2>Maps</h2>
				{maps.map((map,index)=>{
					return (
						
						<MapItem 
							key={map.destination} 
							index={index.toString()} 
							map={map} 
							setCampaignMap={setCampaignMap}
						/>);
				})}
				<button 
					type="button"
					className="btn btn-primary"
					onClick={addMap}
				>
					Add Map
				</button>
			
			</fieldset>
		</form>
	);
}
	
	
export default ManifestEditor;