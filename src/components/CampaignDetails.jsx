import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
//import Lightbox from 'react-lightbox-component';

import  ReactMarkdown from 'react-markdown'
import Redirect from 'react-router-dom/Redirect';

import authorStore from '../api/authorStore'
import campaignStore from '../api/campaignStore'
import Campaign from '../classes/Campaign'


import DownloadBar from '../components/DownloadBar'




const emptyCampaign = {
	name:"",
	"author":"",
	"description":"",
	"maps":[],
	"mods":[],
	"lastUpdated":"",
	"patchNotes":"",
	"screenshots":[],
	"installed":false
};

const emptyAuthor = {
	"id":"",
	"name":"",
	"email":"",
	"campaigns":[]
};

function PatchNotes(props){
	return props.patchNotes.map((patchNote,i) =>
	<section key={i}>
		<h2>{patchNote.version} (<time>{(new Date(patchNote.date)).toDateString()}</time>)</h2>
		<ReactMarkdown source={patchNote.notes} />
	</section>
)
}

class CampaignDetails extends Component {
	constructor(props) {
		super(props);
	}

	handleDownloadClick = () => {
		const {selectedCampaign} = this.props;
		console.group("handleDownloadClick")
		console.log(selectedCampaign)
		const {id} = selectedCampaign;
		console.log(`isCampaignInstalled ${id}`,Campaign.isCampaignInstalled(selectedCampaign));
		Campaign.downloadCampaign(selectedCampaign);
		console.groupEnd();
	}

	render() {
		const {
			downloadProgress, 
			selectedCampaign, 
			selectedCampaignAuthor, 
			onPlayCampaignClick, 
			onUpdateCampaignClick, 
			onDownloadCampaignClick,
		} = this.props
		const campaign = (selectedCampaign)?selectedCampaign:emptyCampaign
		const {id, name, description, maps, lastUpdated, patchNotes, screenshots, installed} = campaign;
		const author = (selectedCampaignAuthor)?selectedCampaignAuthor:emptyAuthor;
		const isCampaignInstalled = !Campaign.isCampaignInstalled(campaign);

		const onDownloadClick = this.handleDownloadClick;

		

		console.log("campaign",campaign)
		return (
			<Router>
        	<section className="campaign-content">
				<header className="campaign-content-header mb-2">
					<div className="campaign-content-controls btn-group float-right" role="group">
						{(isCampaignInstalled) &&
							<React.Fragment>
								<button onClick={onPlayCampaignClick} className="btn btn-primary">Play</button>
								<button onClick={onUpdateCampaignClick} className="btn btn-outline-primary">Update</button>
							</React.Fragment>
						}
						{(!isCampaignInstalled) &&
							<button onClick={onDownloadClick} className="btn btn-primary">Download</button>	
						}
						
					</div>
					<h1 className="campaign-content-title">{name}</h1>
					<p className="campaign-content-subtitle">
						By <a href={"mailto:"+author.email}>{author.name}</a>. Last Updated: <time>{lastUpdated}</time>
					</p>
					<p className="campaign-content-subtitle">
						Tagged under 
						{(installed) &&
							<span> <i className="campaign-filter-installed"></i>Installed</span>
						}
						{(!installed) &&
							<span> <i className="campaign-filter-updated"></i>Updated</span>
						}
					</p>
					{(!isCampaignInstalled) &&
						<DownloadBar progress={downloadProgress} />
					}
	
					
				</header>
	
				<div className="campaign-content-body">
					<div className="btn-group" role="group" aria-label="...">
						<NavLink to="/campaign/description" className="btn btn-outline-primary" activeClassName="btn-primary active">
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
					<Route path="/campaign" exact render={()=>
						<Redirect to="/campaign/description" />
					} />
					<Route path="/campaign/description" render={()=>
						<ReactMarkdown source={description} />
					} />
					<Route path="/campaign/screenshots" render={()=>
						<ul>
						{screenshots.map((screenshot) =>
							<React.Fragment key={screenshot.src}>
							<li>{screenshot.src}</li>	
							</React.Fragment>
						)}
						</ul>
					} />
					
					<Route path="/campaign/patchNotes" render={()=>
						<PatchNotes patchNotes={patchNotes}/>
					} />
					<Route path="/campaign/maps" render={()=>
						<dl>
						{maps.map((map) =>
							<React.Fragment key={map.file}>
								<dt>{map.name} <button className="btn btn-secondary">Launch</button></dt>
								<dd>{map.description}</dd>
							</React.Fragment>
						)}
						</dl>
					} />
					</article>
				</div>
			</section>
			</Router>
			
		);
	}
}
	
CampaignDetails.propTypes = {
	selectedCampaign: PropTypes.object,
	onPlayCampaignClick: PropTypes.func,
	onUpdateCampaignClick: PropTypes.func,
	onDownloadCampaignClick: PropTypes.func
};

	export default CampaignDetails;