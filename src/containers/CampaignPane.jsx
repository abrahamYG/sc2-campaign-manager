import React from 'react';
import CampaignList from '../components/CampaignList';
import CampaignDetails from '../components/CampaignDetails';

function CampaignPane(props) {
	const {campaigns, selectedCampaign, selectedCampaignAuthor, onCampaignItemClick, onDownloadCampaignClick} = props;
	const downloadProgress = Math.random().toFixed(2);
	return (
		<div className="row">
			<section className="sidebar col-3 bg-secondary pr-0 pl-0">
				{(campaigns) &&
				<CampaignList 
					downloadProgress={downloadProgress}
					onClick={onCampaignItemClick} 
					campaigns={campaigns}
					selectedCampaign={selectedCampaign}
					selectedId={(selectedCampaign)?selectedCampaign.id:""}
					
				/>
				}
			</section>
			<section className="campaign-details-pane col bg-light">
				{(selectedCampaign) &&
				<CampaignDetails 
					downloadProgress={downloadProgress}
					selectedCampaign={selectedCampaign}
					selectedCampaignAuthor={selectedCampaignAuthor}
					onDownloadCampaignClick={onDownloadCampaignClick}
				/>
				}
				{(!selectedCampaign) &&
					<div className="card text-white bg-warning mb-3 w-50">
						<div className="card-header">Warning</div>
						<div className="card-body">
							<h5 className="card-title">Warning card title</h5>
							<p className="card-text">No selected item</p>
						</div>
					</div>
				}
			</section>
		</div>
	);
}

export default CampaignPane;