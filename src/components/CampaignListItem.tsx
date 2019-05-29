import React from 'react';
import { connect } from "react-redux";
import DownloadBar from './DownloadBar'
import {selectCampaign} from '../redux/actions'
import { ICampaign } from '../classes/Campaign';

const CampaignListItem = (props:any) => {
	console.log("CampaignListItem",props)
	const {campaign, selectedId, onClick} = props;
	const {id, thumbnail, author, shortName, summmary, progress} = campaign;
	const downloadProgress = (progress)?progress:0;
	//const dispatch = () =>{; props.selectCampaign(campaign);}
	return (
		<button type="button" className={"campaign-item list-group-item list-group-item-action"+((selectedId === id)?" active":"")} onClick={()=>onClick(campaign)} >
			<figure className="campaign-thumbnail-container float-left mb-0">
				<img width="64" height="64" alt="" className="campaign-thumbnail border-0 rounded-circle" src={thumbnail} />
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


const mapDispatchToProps = (dispatch:any) => {
	return {
		onClick: (campaign:ICampaign) => {
			dispatch(selectCampaign(campaign));
		}
	};
};


export default connect(
	null,//mapStateToProps,
	mapDispatchToProps
  )(CampaignListItem);
  