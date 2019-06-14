import React, {Component} from 'react';
import ManifestList from '../components/ManifestList';
import ManifestEditor from '../components/ManifestEditor';

import Campaign, {ICampaign} from '../classes/Campaign'
import { setCampaignsLocal, selectCampaignLocal } from '../store/campaign/actions';
import { MapDispatchToProps, connect, MapStateToProps } from 'react-redux';
import { AppState } from '../store';


interface IMapMakerPaneProps{
	"campaigns": Array<ICampaign>, 
	"authors": any,
	"selectedIndex"?: number, 
	"selectedCampaignAuthor": any
	selectCampaignLocal:typeof selectCampaignLocal
	setCampaignsLocal:typeof setCampaignsLocal
}

interface IMapMakerPaneState{
	"campaigns": Array<ICampaign>, 
	"authors": any,
	"selectedCampaign": ICampaign, 
	"selectedCampaignAuthor": any
}

class MapMakerPane extends Component<IMapMakerPaneProps, IMapMakerPaneState> {
	constructor(props:IMapMakerPaneProps){
		super(props);
		
	}
	render(){
		const {selectedIndex, campaigns} = this.props;
		return (
			<div className="row">
				<section className="sidebar col-3 bg-secondary pr-0 pl-0">
					{(campaigns) &&
					<ManifestList />
					}
				</section>
				<section className="manifest-editor-pane col bg-light">
					{(selectedIndex>=0) &&
						<ManifestEditor />
					}
					{(selectedIndex<0) &&
						<div className="pure-u">
							<p>No data Loaded</p>
						</div>
					}
				</section>
			</div>
		);
	}

}



const mapStateToProps:MapStateToProps<IMapMakerPaneProps,IMapMakerPaneProps,AppState> = (state,ownProps) => {
	const {campaignState} = state;
	const {campaignsLocal,selectedIndexLocal,selectedIdLocal} = campaignState
	const props = {
		"campaigns":campaignsLocal, 
		"selectedIndex":selectedIndexLocal, 
		"selectedId":selectedIdLocal
	}
	
	return {...ownProps, ...props};
};

const mapDispatchToProps:MapDispatchToProps<IMapMakerPaneProps,IMapMakerPaneProps> = (dispatch,ownProps) => {
	return {
		...ownProps,
		setCampaignsLocal: (campaigns) => {
			return dispatch(setCampaignsLocal(campaigns));
		},
		selectCampaignLocal: (campaign,index) => {
			return dispatch(selectCampaignLocal(campaign,index));
		}
	};
};



export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps
  )(MapMakerPane);