import React from 'react';
import { connect, MapDispatchToProps } from "react-redux";
import DownloadBar from './DownloadBar'
import { ICampaign } from '../classes/Campaign';
import { selectCampaign } from '../store/campaign/actions';

interface ICampaignListItemProps {
	campaign: ICampaign,
	index: number,
	selectedIndex?: number,
	selectedId: string,
	onClick?: (id: string) => void
	onAuthorClick: (author: string) => void
}

const CampaignListItem = (props: ICampaignListItemProps) => {
	const { campaign, selectedId, onClick, onAuthorClick } = props;
	const { id, thumbnail, author, name, progress } = campaign;
	const downloadProgress = (progress) ? progress : 0;
	//const dispatch = () =>{; props.selectCampaign(campaign);}
	return (
		<button
			type="button"
			className={"campaign-item list-group-item list-group-item-action" + ((selectedId === id) ? " active" : "")}
			onClick={() => onClick(id)}
		>
			<figure className="campaign-thumbnail-container float-left mb-0">
				<img
					width="64"
					height="64"
					alt=""
					className="campaign-thumbnail border-0 rounded-circle"
					src={thumbnail}
				/>
			</figure>
			<div className="campaign-item-details">
				<h5 className="campaign-item-shortname mb-1">{name}</h5>
				<small>By
					<button
						onClick={() => onAuthorClick(author)}
						className="ml-1 btn btn-link badge badge-light"
					>
						{author}
					</button>
				</small>
				<DownloadBar progress={downloadProgress} />
				{/* <p className="campaign-item-summary mb-1">{summmary}</p> */}
			</div>

		</button>
	);
}

export default CampaignListItem;