import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Redirect, Switch} from "react-router-dom";
import  ReactMarkdown from 'react-markdown'

import Campaign, {ICampaign, IAuthor} from '../classes/Campaign'
//import Lightbox as Lightbox2 from 'react-lightbox-component';
import DownloadBar from './DownloadBar'
import Lightbox from 'react-images'



const emptyCampaign:ICampaign = {
	"id":"",
	"name":"",
	"progress":0,
	"author":"",
	"description":"",
	"maps":[],
	"mods":[],
	"lastUpdated":"",
	"patchNotes":[],
	"screenshots":[],
	"entryPoint":"",
	"installed":false
};

const emptyAuthor:IAuthor = {
	"id":"",
	"name":"",
	"email":"",
	"campaigns":[]
};

function PatchNotes(props:any){
	const patchNotes:Array<any> = props.patchNotes;
	console.log("PatchNotes",patchNotes)
	return (
	<React.Fragment>
	{patchNotes.map((patchNote,i:number) =>
		<section key={i}>
			<h3>{patchNote.version} (<time>{(new Date(patchNote.date)).toDateString()}</time>)</h3>
			<ReactMarkdown source={patchNote.notes} />
		</section>
	)}
	</React.Fragment>
	);
}

class CampaignDetails extends Component<any,any> {
	constructor(props:any) {
		super(props);
	}

	

	render() {
		const { 
			selectedCampaign, 
			selectedCampaignAuthor, 
			onPlayCampaignClick, 
			onUpdateCampaignClick, 
			onDownloadCampaignClick
		} = this.props
		const campaign = (selectedCampaign)?selectedCampaign:emptyCampaign
		const {
			id, 
			name, 
			author,
			description, 
			maps, 
			lastUpdated, 
			patchNotes, 
			screenshots, 
			installed, 
			progress
		} = campaign;

		//const author:IAuthor = (selectedCampaignAuthor)?selectedCampaignAuthor:emptyAuthor;
		const isCampaignInstalled:boolean = installed;//!Campaign.isCampaignInstalled(campaign);

		const onDownloadClick = onDownloadCampaignClick;
		const downloadProgress:number = (progress)?progress:0;
		

		console.log("campaign",campaign)
		return (
			<Router>
        	<section className="campaign-content">
				<header className="campaign-content-header mb-2">
					<div className="campaign-content-controls btn-group float-right" role="group">
						{(isCampaignInstalled) &&
							<React.Fragment>
								<button onClick={() => onPlayCampaignClick(campaign)} className="btn btn-primary">Play</button>
								{/* <button onClick={() => onUpdateCampaignClick(campaign)} className="btn btn-outline-primary">Update</button> */}
							</React.Fragment>
						}
						{(!isCampaignInstalled) &&
							<button onClick={(e) => onDownloadClick(campaign)} className="btn btn-primary">Download</button>	
						}
						
					</div>
					<h1 className="campaign-content-title">{name}</h1>
					<p className="campaign-content-subtitle">
						By <a href={"mailto:"+author}>{author}</a>. Last Updated: <time>{lastUpdated}</time>
					</p>
					{/*
						<p className="campaign-content-subtitle">
						Tagged under 
						{(installed) &&
							<span> <i className="campaign-filter-installed"></i>Installed</span>
						}
						{(!installed) &&
							<span> <i className="campaign-filter-updated"></i>Updated</span>
						}
					</p>
					*/}
					{(!isCampaignInstalled) &&
						<DownloadBar progress={downloadProgress} />
					}
	
					
				</header>
	
				<div className="campaign-content-body">
					<div className="btn-group" role="group" aria-label="...">
						<NavLink to="/campaign" exact className="btn btn-outline-primary" activeClassName="btn-primary active">
							Description
						</NavLink>
						<NavLink to="/campaign/screenshots" className="btn btn-outline-primary" activeClassName="btn-primary active">
							Screenshots
						</NavLink>
						<NavLink to="/campaign/patchNotes" className="btn btn-outline-primary" activeClassName="btn-primary active">
						Patch Notes
						</NavLink>
						<NavLink to="/campaign/maps" className="btn btn-outline-primary" activeClassName="btn-primary active">
						Maps
						</NavLink>
					</div>
					<ul>
						<li>Maps: {maps.length}</li>
					</ul>
					
					<article>
					<Switch>
					<Route path="/campaign" exact render={()=>
						<ReactMarkdown source={description} />
					} />
					<Route path="/campaign/screenshots" render={()=>
						<section>
						{
							screenshots.map((screenshot:any)=>{
								return (<figure key={screenshot.src}><img style={{"maxWidth": "100%"}} src={screenshot.src} /></figure>);
							})
						}
						</section>
					} />
					
					<Route path="/campaign/patchNotes" render={()=>
						<PatchNotes patchNotes={patchNotes}/>
					} />
					<Route path="/campaign/maps" render={()=>
						<dl>
						{maps.map((map:any) =>
							<React.Fragment key={map.destination}>
								<dt>{map.name} <button className="btn btn-secondary">Launch</button></dt>
								<dd>{map.description}</dd>
							</React.Fragment>
						)}
						</dl>
					} />
					</Switch>
					</article>
				</div>
			</section>
			</Router>
			
		);
	}
}
export default CampaignDetails;