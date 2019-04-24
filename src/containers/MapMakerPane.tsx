import React, {Component} from 'react';
import campaignStore from '../api/campaignStore'
import ManifestList from '../components/ManifestList';
import ManifestEditor from '../components/ManifestEditor';

import Campaign, {ICampaign} from '../classes/Campaign'

class MapMakerPane extends Component<any, any> {
	constructor(props:any){
		super(props);
		this.state = {
			"campaigns": [], 
			"authors": null,
			"selectedCampaign": null, 
			"selectedCampaignAuthor": null
		};
		Campaign.getCampaignsRemote().then((campaigns:Array<ICampaign>) =>{
			this.setState({campaigns})
			
		})
	}
	handleCampaignItemClick = (campaign:ICampaign) => {
		console.group("handleCampaignItemClick")
		this.setState({selectedCampaign: campaign});

		console.groupEnd();
	};

	render(){
		const {selectedCampaign, campaigns} = this.state;
		const {schema, campaign} = this.state;
		const {selectedCampaignAuthor, onCampaignItemClick} = this.props;
		const uiSchema = {};
		return (
			<div className="row">
				<section className="sidebar col-3 bg-secondary pr-0 pl-0">
					{(campaigns) &&
					<ManifestList 
						onClick={this.handleCampaignItemClick} 
						campaigns={campaigns}
						selectedCampaign={selectedCampaign}
						selectedId={(selectedCampaign)?selectedCampaign.id:""}
						
					/>
					}
				</section>
				<section className="manifest-editor-pane col bg-light">
					{(selectedCampaign) &&
						<ManifestEditor
							schema={schema}
							uiSchema={uiSchema}
							itemData={selectedCampaign}
							selectedCampaign={selectedCampaign}
							selectedCampaignAuthor={selectedCampaignAuthor}
						/>
					}
					{(!selectedCampaign) &&
						<div className="pure-u">
							<p>No data Loaded</p>
						</div>
					}
				</section>
			</div>
		);
	}

}

export default MapMakerPane;