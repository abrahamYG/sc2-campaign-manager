import React from 'react';
import { ICampaign } from '../classes/Campaign';


function ManifestListItem(props:any) {
	console.log("ManifestListItem",props)
	const {campaign, selectedId} = props;
	const {id, thumbnail, author, shortName, summmary, progress} = campaign;
	const downloadProgress = (progress)?progress:0;
	return (
		<button type="button" className={"campaign-item list-group-item list-group-item-action"+((selectedId === id)?" active":"")} onClick={() => props.onClick(campaign)} >
			<h5 className="campaign-item-shortname mb-1">{shortName}</h5>
		</button>
	);
}


interface IManifestListProps{
	"campaigns":Array<ICampaign>, 
	"selectedCampaign":ICampaign, 
	"selectedId":string, 
	"onClick":(campaign:ICampaign)=>void,
	
}

export default function ManifestList (props:IManifestListProps) {
	const {campaigns, selectedId, onClick} = props;
	console.log("ManifestList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			{campaigns.map((campaign:ICampaign) =>
				<ManifestListItem 
					key={campaign.id} 
					campaign={campaign} 
					onClick={onClick} 
					selectedId={selectedId} 
				/>
			)}
		</nav>
		
	);
	
}