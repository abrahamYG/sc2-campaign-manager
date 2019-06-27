import React, { FC } from 'react';
import { HashRouter as Router, Route, NavLink, Redirect, Switch } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

import Campaign, { ICampaign, IAuthor, IPatchNote } from '../classes/Campaign'
//import Lightbox as Lightbox2 from 'react-lightbox-component';
import DownloadBar from './DownloadBar'
import Lightbox from 'react-images'
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { AppState } from '../store';


const emptyAuthor: IAuthor = {
	"id": "",
	"name": "",
	"email": "",
	"campaigns": []
};

function PatchNotes(props: any) {
	const patchNotes: Array<IPatchNote> = props.patchNotes;
	console.log("PatchNotes", patchNotes)
	return (
		<React.Fragment>
			{patchNotes.map((patchNote, i: number) =>
				<section key={i}>
					<h3>{patchNote.version} (<time>{(new Date(patchNote.date)).toDateString()}</time>)</h3>
					<ReactMarkdown source={patchNote.notes} />
				</section>
			)}
		</React.Fragment>
	);
}

interface ICampaignDetailsProps {
	selectedId:string,
	campaign?: ICampaign,
	path?: string,
	selectedCampaignAuthor?: IAuthor,
	onPlayCampaignClick: (campaign: ICampaign, mapIndex?: number) => void,
	onUpdateCampaignClick?: (campaign: ICampaign) => void,
	onDownloadCampaignClick: (campaign: ICampaign) => void
}

const CampaignDetails: FC<ICampaignDetailsProps> = (props) => {
	const {
		selectedCampaignAuthor,
		onPlayCampaignClick,
		onUpdateCampaignClick,
		onDownloadCampaignClick,
		path
	} = props
	const campaign = (props.campaign) ? props.campaign : Campaign.emptyCampaign();
	const {
		id,
		name,
		author,
		description,
		maps,
		lastUpdated,
		patchNotes,
		screenshots,
		videos,
		installed,
		progress,
		state
	} = campaign;
	const basePath = path ? path : "/campaign"

	//const author:IAuthor = (selectedCampaignAuthor)?selectedCampaignAuthor:emptyAuthor;
	const isCampaignInstalled: boolean = installed;//!Campaign.isCampaignInstalled(campaign);

	const onDownloadClick = onDownloadCampaignClick;
	const downloadProgress: number = (progress) ? progress : 0;
	return (
		<Router basename={basePath}>

			<section className="campaign-content">
				<Route exact path="/" render={() => (
					<Redirect to="/description" />
				)} />
				<header className="campaign-content-header mb-2">
					<div className="campaign-content-controls float-right" role="group">
						{(isCampaignInstalled) && (maps.length > 0) &&
							<React.Fragment>
								<button
									onClick={() => onPlayCampaignClick(campaign)}
									className="btn btn-primary"
								>
									Play
								</button>
								{/* <button onClick={() => onUpdateCampaignClick(campaign)} className="btn btn-outline-primary">Update</button> */}
							</React.Fragment>
						}
						{(!isCampaignInstalled) && (maps.length > 0) && (state!=="downloading") &&
							<button
								onClick={(e) => onDownloadClick(campaign)}
								className="btn btn-primary"
							>
								Download
							</button>
						}
						{(!isCampaignInstalled) && (maps.length > 0) && (state==="downloading") &&
							<button
								onClick={() => {}}
								className="btn btn-primary disabled"
								disabled
							>
								Downloading
							</button>
						}
						{(maps.length === 0) &&
							<>
								<button
									disabled
									className="btn btn-primary disabled float-right"
								>
									Download
						</button>
								<p><small className="text-warning">This campaign has no maps listed.</small></p>
							</>
						}

					</div>
					<h1 className="campaign-content-title">{name}</h1>
					<p className="campaign-content-subtitle">
						By <a href={"mailto:" + author}>{author}</a>. Last Updated: <time>{lastUpdated}</time>
					</p>
					<p className="campaign-content-subtitle">
						Project URL:&nbsp;
					<a target="_blank" href={`https://www.sc2mapster.com/projects/${id}`}>
							https://www.sc2mapster.com/projects/{id}
						</a>
					</p>
					{/*
					<p className="campaign-content-subtitle">
					Tagged under 
					{(isCampaignInstalled) &&
						<span> <i className="campaign-filter-installed"></i>Installed</span>
					}
					{(!isCampaignInstalled) &&
						<span> <i className="campaign-filter-updated"></i>Updated</span>
					}
				</p>
				*/}
					{(!isCampaignInstalled) &&
						<DownloadBar progress={downloadProgress} />
					}


				</header>

				<div className="campaign-content-body">
					<div className="btn-group" role="group" aria-label="...">
						<NavLink to="/description" className="btn btn-outline-primary" activeClassName="btn-primary active">
							Description
					</NavLink>
						<NavLink to={`/screenshots`} className="btn btn-outline-primary" activeClassName="btn-primary active">
							Screenshots
					</NavLink>
						<NavLink to={`/patchNotes`} className="btn btn-outline-primary" activeClassName="btn-primary active">
							Patch Notes
					</NavLink>
						<NavLink to={`/maps`} className="btn btn-outline-primary" activeClassName="btn-primary active">
							Maps
					</NavLink>
					</div>
					<ul>
						<li>Maps: {maps.length}</li>
					</ul>

					<article>
						<Switch>
							<Route path="/description" render={() =>
								<section>
									{(videos) &&
										<iframe
											width="638"
											height="358"
											src={`https://www.youtube.com/embed/${videos[0]}`}
											frameBorder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>

									}
									<ReactMarkdown

										source={description}
										className={"campaign-description"}
										skipHtml={true}
										linkTarget={() => "_blank"}
									/>
								</section>
							} />
							<Route path={`/screenshots`} render={() =>
								<section>
									{
										screenshots.map(({ src, description }) => {
											return (
												<figure className="figure" key={src}>
													<img className="figure-img img-fluid rounded mw-100" src={src} />
													<figcaption className="figure-caption">{description ? description : "Caption"}</figcaption>
												</figure>
											);
										})
									}
								</section>
							} />

							<Route path={`/patchNotes`} render={() =>
								<PatchNotes patchNotes={patchNotes} />
							} />
							<Route path={`/maps`} render={() =>
								<dl>
									{maps.map(({ name, description, destination }, index) =>
										<React.Fragment key={destination}>
											<div className="media border rounded border-light p-1 mb-2">
												<div className="media-body">
													<h4>{name}</h4>
													{description &&
														<>
															<p><strong>Description:</strong></p>
															<ReactMarkdown
																source={description}
																className={"campaign-description"}
																skipHtml={true}
																linkTarget={() => "_blank"}
															/>
														</>
													}
												</div>
												<div className="media-right align-self-center">
													<button
														onClick={() => onPlayCampaignClick(campaign, index)}
														className={"btn btn-info " + (isCampaignInstalled ? "" : "disabled")}
														disabled={!isCampaignInstalled}
													>
														Launch
									</button>
												</div>
											</div>
										</React.Fragment>
									)}
								</dl>
							} />
						</Switch>
					</article>
				</div>
			</section>
		</Router>

	);
}




const mapStateToProps: MapStateToProps<ICampaignDetailsProps, ICampaignDetailsProps, AppState> = (state, ownProps) => {
	const { campaignState } = state;
	const { selectedIndex, campaigns, campaignsById } = campaignState;
	const {selectedId} = ownProps;
	const props = {
		"campaign": campaignsById[selectedId],
		"index": selectedIndex
	}
	return { ...ownProps, ...props };
};

const mapDispatchToProps: MapDispatchToProps<ICampaignDetailsProps, ICampaignDetailsProps> = (dispatch, ownProps) => {
	return {
		...ownProps,
		/*setCampaign: (campaign, index) => {
			return dispatch(setCampaignLocal(campaign,index));
		}*/
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CampaignDetails);