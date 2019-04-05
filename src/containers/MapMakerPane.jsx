import React, {Component} from 'react';
import campaignStore from '../api/campaignStore'
import CampaignList from '../components/CampaignList';
import ManifestEditor from '../components/ManifestEditor';

class MapMakerPane extends Component {
	constructor(props){
		super(props);
		this.state = {
			"schema":{},
			"campaign":{}
		}
		campaignStore.getCampaignSchema((schema)=>{
			this.setState({
				"schema":schema
			})
		});
		campaignStore.getCampaigns((campaigns)=>{
			this.setState({
				"campaign":campaigns[0]
			})
		});
		
	}
	render(){
		const {schema, campaign} = this.state;
		const {campaigns, selectedCampaign, selectedCampaignAuthor, onCampaignItemClick} = this.props;
		const uiSchema = {};
		return (
			<div className="row">
				<section className="sidebar col-3 bg-secondary pr-0 pl-0">
					{(campaigns) &&
					<CampaignList 
						onClick={onCampaignItemClick} 
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