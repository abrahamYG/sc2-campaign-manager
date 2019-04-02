import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-lightbox-component';

import  ReactMarkdown from 'react-markdown'

import authorStore from '../api/authorStore'

const emptyCampaign = {
	name:"",
	"author":"",
	"description":"",
	"maps":[],
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
	return props.patchNotes.map((patchNote) =>
	<section>
		<h2>{patchNote.version} (<time>{(new Date(patchNote.date)).toDateString()}</time>)</h2>
		<ReactMarkdown source={patchNote.notes} />
	</section>
)
}

class CampaignDetails extends Component {
	constructor(props) {
		super(props);
		const selectedPane = (localStorage.getItem('selectedDetailsPane')!==null)?localStorage.getItem('selectedDetailsPane'):"description";
		this.state = {
			selectedPane: selectedPane
		};
	}

	handleSelectedPaneClick = (item) => {
		localStorage.setItem('selectedDetailsPane',item)
		this.setState({
			selectedPane:item
		});
	};

	render() {
		const {selectedCampaign, selectedCampaignAuthor, onPlayCampaignClick, onUpdateCampaignClick, onDownloadCampaignClick } = this.props
		const {name, description, maps, lastUpdated, patchNotes, screenshots, installed} = (selectedCampaign)?selectedCampaign:emptyCampaign;
		const author = (selectedCampaignAuthor)?selectedCampaignAuthor:emptyAuthor;
		const {selectedPane} = this.state;
		console.log("selectedCampaign",selectedCampaign)
		return (
        	<section className="campaign-content">
				<header className="campaign-content-header">
					<div className="campaign-content-controls btn-group float-right" role="group">
						{(!installed) &&
							<>
							<button onClick={onPlayCampaignClick} className="btn btn-primary">Play</button>
							<button onClick={onUpdateCampaignClick} className="btn btn-outline-primary">Update</button>
							</>
						}
						{(installed) &&
							<button onClick={onDownloadCampaignClick} className="btn btn-primary">Download</button>	
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
				
	
					
				</header>
	
				<div className="campaign-content-body">
					<div className="btn-group" role="group" aria-label="...">
						<button 
							onClick={()=>this.handleSelectedPaneClick("description")}
							className={"btn"+((selectedPane === "description")?" btn-primary active":" btn-outline-primary")}>
							Description
						</button>
						<button 
							onClick={()=>this.handleSelectedPaneClick("screenshots")}
							className={"btn"+((selectedPane === "screenshots")?" btn-primary active":" btn-outline-primary")}>
							Screenshots
						</button>
						<button 
							onClick={()=>this.handleSelectedPaneClick("patchNotes")}
							className={"btn"+((selectedPane === "patchNotes")?" btn-primary active":" btn-outline-primary")}>
							Patch Notes
						</button>
						<button 
							onClick={()=>this.handleSelectedPaneClick("maps")}
							className={"btn"+((selectedPane === "maps")?" btn-primary active":" btn-outline-primary")}>
							Maps
						</button>
					</div>
					<ul>
						<li>Maps: {maps.length}</li>
					</ul>
					
					<article>
					{(selectedPane === "description") &&
						<ReactMarkdown source={description} />
					}
					{(selectedPane === "screenshots") &&
						<Lightbox images={screenshots} />
					}
					{(selectedPane === "patchNotes") &&
						<PatchNotes patchNotes={patchNotes}/>
					}
					{(selectedPane === "maps") &&
						<dl>
						{maps.map((map) =>
							<React.Fragment key={map.file}>
								<dt>{map.name} <button className="btn">Launch</button></dt>
								<dd>{map.description}</dd>
							</React.Fragment>
						)}
						</dl>
					}
					</article>
				</div>
			</section>
			
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