import React, { ChangeEvent, FC } from 'react';
import Form from 'react-jsonschema-form';
import Campaign, { ICampaign, ISC2Map, ISC2Mod, IScreenshot } from '../classes/Campaign';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { setCampaignLocal } from '../store/campaign/actions';
import ManifestEditorMapItem from './ManifestEditorMapItem';
import { AppState } from '../store';
import { HashRouter as Router, Route , NavLink, Redirect } from 'react-router-dom';
import CampaignDetails from './CampaignDetails';
import ManifestEditorScreenshot from './ManifestEditorScreenshotItem';
import ManifestEditorJson from './ManifestEditorJson';


interface IManifestEditorProps{
	"campaign"?:ICampaign,
	"index"?:number,
	"setCampaign"?:typeof setCampaignLocal
}

const ManifestEditor:FC<IManifestEditorProps> = (props) => {
	const {campaign,index, setCampaign} = props;
	const {maps,mods,screenshots} = campaign;
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
		const newCampaign:ICampaign = {
			...campaign,
			maps:[...campaign.maps, Campaign.emptyMap()]
		}
		setCampaign(newCampaign,index);
	}
	
	const addMod = ()=>{
		const newCampaign:ICampaign = {
			...campaign,
			mods:[...campaign.mods, Campaign.emptyMap()]
		}
		setCampaign(newCampaign,index);
	}
	const addScreenshot = ()=>{
		const newCampaign:ICampaign = {
			...campaign,
			screenshots:[...campaign.screenshots, {src:"",description:""}]
		}
		setCampaign(newCampaign,index);
	}
	const loadFromZip = () =>{

	}
	const setCampaignMap = (map:ISC2Map,mapIndex:number)=>{
		const maps = [...campaign.maps];
		//const index = maps.findIndex(v => v.destination === map.destination);
		console.log("setCampaignMap", campaign);
		console.log("setCampaignMap", maps);
		maps[mapIndex] = map;
		const newCampaign:ICampaign = {
			...campaign,
			maps
		};
		setCampaign(newCampaign,index);
	}
	
	const setCampaignMod = (mod:ISC2Mod,modIndex:number)=>{
		const mods = [...campaign.mods];
		//const index = maps.findIndex(v => v.destination === map.destination);
		console.log("setCampaignMap", campaign);
		console.log("setCampaignMap", mods);
		mods[modIndex] = mod;
		const newCampaign:ICampaign = {
			...campaign,
			mods
		};
		setCampaign(newCampaign,index);
	}
	const setCampaignScreenshot = (screenshot:IScreenshot,screenindex:number)=>{
		const screenshots = [...campaign.screenshots];
		screenshots[screenindex] = screenshot;
		const newCampaign:ICampaign = {
			...campaign,
			screenshots
		};
		setCampaign(newCampaign,index);
	}
	console.log("ManifestEditor props", props)
	return (
		<Router basename="/mapmakers">
		<form className="mr-3">
			<Route exact path="/" render={() => (
					<Redirect to="/editor"/>
			)}/>
			<div className="btn-group mt-2 float-right" role="group" aria-label="">
				<NavLink to="/editor" className="btn btn-outline-primary" activeClassName="btn-primary active">
					Editor
				</NavLink>
				<NavLink to="/json" className="btn btn-outline-primary" activeClassName="btn-primary active">
					JSON
				</NavLink>
				<NavLink to="/preview" className="btn btn-outline-primary" activeClassName="btn-primary active">
					Preview
				</NavLink>
			</div>
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
			<Route exact path="/editor" render={() => (
				<Redirect to="/editor/description"/>
			)}/>
			<Route path={"/editor"} render={()=>
				<fieldset className="form-group">
					<ul className="nav nav-tabs mb-2">
						<li className="nav-item">
							<NavLink to="/editor/description" className="nav-link" activeClassName="active">
								Description
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/editor/screenshots" className="nav-link" activeClassName="active">
								Screenshots
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/editor/patchnotes" className="nav-link" activeClassName="active">
								PatchNotes
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/editor/maps" className="nav-link" activeClassName="active">
								Maps and Mods
							</NavLink>
						</li>
					</ul>
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
					<Route path="/editor/description" render={()=>
					<>
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
					</>
					}/>
					<Route path="/editor/screenshots" render={()=>
					<>
						<h2>Screenshots</h2>
						{screenshots.map((screenshot,index)=>{
							return (
								
								<ManifestEditorScreenshot
								key={index} 
								index={index} 
								screenshot={screenshot} 
								setCampaignScreenshot={setCampaignScreenshot}
								/>);
							})}
						<button 
							type="button"
							className="btn btn-primary"
							onClick={addScreenshot}
						>
							Add Screenshot
						</button>
					</>
					} />
					<Route path="/editor/patchnotes" render={()=>
					<>
						<h2>Patch Notes</h2>
					</>
					} />
					<Route path="/editor/maps" render={()=>
					<>
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
								key={index} 
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
						<h2>Mods</h2>
						<button 
							type="button"
							className="btn btn-primary"
							onClick={loadFromZip}
							>
							Import Maps
						</button>
						{mods.map((mod,index)=>{
							return (
								
								<ManifestEditorMapItem 
								key={index} 
								index={index} 
								map={mod}
								type="Mod"
								setCampaignMap={setCampaignMod}
								/>);
							})}
						<button 
							type="button"
							className="btn btn-primary"
							onClick={addMod}
							>
							Add Mod
						</button>
					</>
				}/>
				</fieldset>
			} />
			<Route path="/json" render={()=>
				<ManifestEditorJson campaign={campaign} />
			}/>
			<Route path="/preview" render={(path)=>{
				console.log(path);
				return (
				<CampaignDetails 
				campaign={campaign}
				path={"mapmakers/preview/"}
				onDownloadCampaignClick={()=>{}}
					onPlayCampaignClick={()=>{}}
				/>
				)
			}}/>
		</form>
		</Router>
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