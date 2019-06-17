import React, { FC } from 'react';
import { ICampaign } from '../classes/Campaign';
import { connect, MapDispatchToProps } from 'react-redux';
import { selectCampaignLocal } from '../store/campaign/actions'

interface IManifestListItemProps {
	campaign: ICampaign,
	index: number,
	selectedIndex: number,
	onClick?: typeof selectCampaignLocal
}
const ManifestListItem: FC<IManifestListItemProps> = (props) => {
	const { campaign, index, selectedIndex, onClick } = props;
	const { id, thumbnail, author, name, summmary, progress } = campaign;
	const downloadProgress = (progress) ? progress : 0;
	return (
		<button type="button" className={"campaign-item list-group-item list-group-item-action" + ((selectedIndex === index) ? " active" : "")} onClick={() => onClick(campaign,index)} >
			<h5 className="campaign-item-shortname mb-1">{name}</h5>
		</button>
	);
}


const mapDispatchToProps: MapDispatchToProps<IManifestListItemProps, IManifestListItemProps> = (dispatch, ownProps) => {
	return {
		...ownProps,
		onClick: (campaign,index) => {
			return dispatch(selectCampaignLocal(campaign,index));
		}
	};
};


export default connect(
	null,//mapStateToProps,
	mapDispatchToProps
)(ManifestListItem);