import { ISC2Map } from "../classes/Campaign";
import React, { ChangeEvent, FC } from "react";

interface IManifestEditorMapItemProps{
	"index":number,
	"map": ISC2Map,
	"type"?:string,
	"setCampaignMap":(map:ISC2Map,index:number)=>void
}

const ManifestEditorMapItem:FC<IManifestEditorMapItemProps> = (props) => {
	const {map, index, setCampaignMap,type} = props;
	const {name,destination,description, fileEntry, source, sourceFormat} = map;
	const onChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLSelectElement>)=>{
		console.log(e);
		const newMap = {
			...map,
			[e.currentTarget.name]:e.currentTarget.value
		}
		console.log(newMap)
		setCampaignMap(newMap,index);
	};

	return (
		<div className="card border-secondary mb-3 mr-0 ml-1">
  			<div className="card-header text-white bg-secondary">
			  <button className="btn btn-primary float-right" type="button" data-toggle="collapse" data-target={`map-${index}-body`} aria-expanded="false" aria-controls="collapseExample">
    				Collapse
  				</button>
			  <h5 className="card-title">{type?type:"Map"} {index.toString()}</h5>
				
  			</div>
  			<div className="card-body mr-3" id={`map-${index}-body`}>
				{/*<h5 className="card-title">{type?type:"Map"} {index.toString()}</h5>*/}
				
				<fieldset className="form-group campaign-form-map">
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
			</div>
			<div className="card-footer">
				<div className="btn-group" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-primary">Up</button>
					<button type="button" className="btn btn-primary">Down</button>
					<button type="button" className="btn btn-danger">Delete</button>
				</div>
			</div>
		</div>
	);
}

export default ManifestEditorMapItem;