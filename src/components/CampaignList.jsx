import React, { Component } from 'react';

import DownloadBar from '../components/DownloadBar'

function CampaignListItem(props) {
	const {campaign, selectedId, downloadProgress} = props;
	//const selectedId = (selectedCampaign)?selectedCampaign.id:""
	const {id, thumbnail, author, shortName, summmary} = campaign;
	return (
		// eslint-disable-next-line
		/*
		<a key={id} href="#" onClick={() => props.onClick(campaign)} className={ "list-group-item campaign-item pure-g"+((selectedId === id)?" active":"")} >
			<div className="campaign-thumbnail-container pure-u">
				<img width="64" height="64" alt="" className="campaign-thumbnail" src={thumbnail} />
			</div>
			
			<div className="campaign-item-content pure-u-3-4">
				<h5 className="campaign-author">{author}</h5>
				<h4 className="campaign-shortName">{shortName}</h4>
				<p className="campaign-summmary">{summmary}</p>
			</div>
		</a>
		*/
		<button type="button" className={"list-group-item list-group-item-action"+((selectedId === id)?" list-group-item-dark":"")} onClick={() => props.onClick(campaign)} >
			<figure className="campaign-thumbnail-container float-left">
				<img width="64" height="64" alt="" className="campaign-thumbnail" src={thumbnail} />
			</figure>
			<div>
				<h5 className="campaign-item-shortname mb-1">{shortName}</h5>
				<small>By {author}</small>
				<p className="campaign-item-summary mb-1 ml-5">{summmary}</p>
			</div>
			<DownloadBar progress={downloadProgress} />
		</button>
	);
}


class CampaignList extends Component {
	render() {
		const {campaigns, selectedId, onClick,downloadProgress} = this.props;
		const listItems = campaigns.map((campaign) =>
			<CampaignListItem 
				key={campaign.id} 
				campaign={campaign} 
				onClick={onClick} 
				selectedId={selectedId} 
				downloadProgress={downloadProgress}
			/>
		);
		return (
			<nav className="campaign-list-pane list-group list-group-flush">
				{listItems}
			</nav>
			
		);
	}
}
	
export default CampaignList;