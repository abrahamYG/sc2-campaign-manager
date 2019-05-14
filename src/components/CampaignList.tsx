import React, { Component } from 'react';

import DownloadBar from './DownloadBar'
import { ICampaign } from '../classes/Campaign';

function CampaignListItem(props:any) {
	console.log("CampaignListItem",props)
	const {campaign, selectedId} = props;
	const {id, thumbnail, author, shortName, summmary, progress} = campaign;
	const downloadProgress = (progress)?progress:0;
	return (
		<button type="button" className={"campaign-item list-group-item list-group-item-action"+((selectedId === id)?" active":"")} onClick={() => props.onClick(campaign)} >
			<figure className="campaign-thumbnail-container float-left mb-0">
				<img width="64" height="64" alt="" className="campaign-thumbnail" src={thumbnail} />
			</figure>
			<div className="campaign-item-details">
				<h5 className="campaign-item-shortname mb-1">{shortName}</h5>
				<small>By {author}</small>
				<DownloadBar progress={downloadProgress} />
				{/* <p className="campaign-item-summary mb-1">{summmary}</p> */}
			</div>
			
		</button>
	);
}

interface ICampaignListProps{
	"campaigns":Array<ICampaign>, 
	"selectedCampaign":ICampaign, 
	"selectedId":string, 
	"onClick":(campaign:ICampaign)=>void,
	
}


export default function CampaignList (props:ICampaignListProps) {
	const {campaigns, selectedId, onClick} = props;
	console.log("CampaignList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			{campaigns.map((campaign:ICampaign) =>
				<CampaignListItem 
					key={campaign.id} 
					campaign={campaign} 
					onClick={onClick} 
					selectedId={selectedId} 
				/>
			)}
		</nav>
		
	);
	
}