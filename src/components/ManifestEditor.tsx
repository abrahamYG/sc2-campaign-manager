import React, { ChangeEvent, FC } from 'react';
import Form from 'react-jsonschema-form';
import Campaign, { ICampaign, ISC2Map } from '../classes/Campaign';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { setCampaignLocal } from '../store/campaign/actions';
import ManifestEditorMapItem from './ManifestEditorMapItem';
import { AppState } from '../store';


interface IManifestEditorProps{
	"campaign"?:ICampaign,
	"index"?:number,
	"setCampaign"?:typeof setCampaignLocal
}

const ManifestEditor:FC<IManifestEditorProps> = (props) => {
	const {campaign,index, setCampaign} = props;
	const {maps} = campaign;
	const saveCampaign = () => Campaign.writeToDisk(campaign);
	const onChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLSelectElement>)=>{
		console.log(e);
		const newCampaign = {
			...campaign,
			[e.currentTarget.name]:e.currentTarget.value
		}
		//const property:string = e.currentTarget.name;
		//newCampaign[property] = e.currentTarget.value;
		console.log(newCampaign)
		setCampaign(newCampaign, index);
	};
	const addMap = ()=>{
		const newCampaign = {
			...campaign,
			maps:[...campaign.maps, Campaign.emptyMap()]
		}
		setCampaign(newCampaign,index);
	}
	const loadFromZip = () =>{

	}
	const setCampaignMap = (map:ISC2Map,index:number)=>{
		const maps = [...campaign.maps];
		//const index = maps.findIndex(v => v.destination === map.destination);
		console.log("setCampaignMap", campaign);
		console.log("setCampaignMap", maps);
		maps[index] = map;
		const newCampaign = {
			...campaign,
			maps
		};
		setCampaign(newCampaign,index);
	}
	console.log("ManifestEditor props", props)
	return (
		<form className="mr-3">
			<h1>Manifest Editor</h1>
				<div className="btn-group mb-2" role="group" aria-label="">
					<button 
						type="button"
						className="btn btn-primary"
						onClick={saveCampaign}
					>
						Save Campaign to Disk
					</button>
					
				</div>
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
				<button 
					type="button"
					className="btn btn-primary"
					onClick={loadFromZip}
				>
					Import Maps
				</button>
				{maps.map((map,index)=>{
					return (
						
						<ManifestEditorMapItem 
							key={map.destination} 
							index={index} 
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
	
	
const mapStateToProps:MapStateToProps<IManifestEditorProps,IManifestEditorProps,AppState> = (state,ownProps) => {
	const {campaignState} = state;
	const {selectedIndexLocal, campaignsLocal} = campaignState
	const props = {
		"campaign":campaignsLocal[selectedIndexLocal],
		"index": selectedIndexLocal
	}
	return {...ownProps, ...props};
};

const mapDispatchToProps:MapDispatchToProps<IManifestEditorProps,IManifestEditorProps> = (dispatch,ownProps) => {
	return {
		...ownProps,
		setCampaign: (campaign, index) => {
			return dispatch(setCampaignLocal(campaign,index));
		}
	};
};



export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps
  )(ManifestEditor);