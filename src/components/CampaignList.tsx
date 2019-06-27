
import React, { ChangeEvent } from 'react';
import { ICampaign } from '../classes/Campaign';
import CampaignListItem from './CampaignListItem'
import { IFilter } from '../store/campaign/selectors';



interface ICampaignListProps {
	campaigns?: Array<ICampaign>,
	selectedIndex?: number,
	selectedId?: string
	onItemClick?: (id: string) => void,
	onFilterSet: (filter: IFilter) => any
	filter:IFilter
}


const CampaignList = (props: ICampaignListProps) => {
	const { campaigns, selectedIndex, selectedId, onItemClick,filter,onFilterSet } = props;
	console.log("CampaignList", props)
	const onFilterChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.name)
		const { name, value } = e.target
		const newFilter: IFilter = { [name]: value }
		onFilterSet({...filter, ...newFilter})
	}
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			<form  >
				<div className="input-group">
					<div className="input-group-prepend">
						<select
							name="key"
							onChange={onFilterChange}
							className="form-control input-group-text"
							value={filter.key}
						>
							<option value="name">Name</option>
							<option value="author">Author</option>
						</select>
					</div>
					<input
						type="text"
						name="val"
						onChange={onFilterChange}
						className="form-control mb-2"
						placeholder="Filter"
						value={filter.val}
					/>
				</div>
			</form>
			{campaigns.map((campaign, index) =>
				<CampaignListItem
					key={campaign.id}
					index={index}
					campaign={campaign}
					selectedId={selectedId}
					onClick={onItemClick}
					onAuthorClick={(author)=>{onFilterSet({key:"author",val:author})}}
				/>
			)}
		</nav>

	);

}
export default CampaignList;