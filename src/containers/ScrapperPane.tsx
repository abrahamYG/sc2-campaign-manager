import { getCampaignFromMapster } from "../classes/Mapster";
import React, { FC, ChangeEvent, useState } from "react";
import Campaign, { ICampaign } from "../classes/Campaign";

const ScrapperPane: FC<any> = props => {
	const [id, setId] = useState("")
	const [output, setOutput] = useState("")
	const [campaign, setCampaign] = useState<ICampaign>(Campaign.emptyCampaign())
	const generateCampaign = async () => {
		const campaign = await getCampaignFromMapster(id);
		setCampaign(campaign)
		const json = JSON.stringify(campaign, null, 4);
		console.log()
		setOutput(json);
	}
	const saveToDisk = () => {
		Campaign.writeToDisk(campaign)
	}
	return (
		<form>
			<fieldset className="form-group">
				<label htmlFor="scrapper-id">Id:</label>
				<div className="input-group">
					<input
						id="scrapper-id"
						className="form-control"
						type="text"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-info"
							type="button"
							onClick={(s) => generateCampaign()}
						>
							Scrape
						</button>
					</div>

				</div>
				<label htmlFor="scrapper-output">Output:</label>
				<textarea
					id="scrapper-output"
					className="form-control disabled"
					readOnly
					rows={15}
					value={output}
				/>
			</fieldset>
			<button
				className="btn btn-info"
				type="button"
				onClick={(s) => saveToDisk()}
			>
				Save to Disk
			</button>
		</form>
	)
}

export default ScrapperPane;