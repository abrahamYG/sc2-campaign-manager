import React from 'react';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { useGlobal } from 'reactn';
import { use } from 'builder-util';

function NavBar(props) {
	const {selectedPane} = props;
	const [campaignCount,setCampaignCount] = useGlobal("campaignCount");
	const filterActive = "installed"
	const filterInstalledActive = ((filterActive === "installed")?" active":" ");
	const filterUpdatedActive = ((filterActive === "updated")?" active":" ");
	return (
		<nav className="top-bar navbar navbar-expand-sm navbar-dark">
			<div className="collapse navbar-collapse">
				<ul className="nav nav-pills">
				<li className="nav-item">
					<NavLink to="/campaign" className="nav-link" activeClassName="active">
						Campaigns <span className="campaign-count badge badge-dark">{campaignCount}</span>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/settings" className="nav-link" activeClassName="active">
						Settings
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/mapmakers" className="nav-link" activeClassName="active">
						Mapmaker Tools
					</NavLink>
				</li>    
				</ul>
				<ul className="navbar-nav">
				<li className="nav-item">
					<a className={"nav-link"+filterInstalledActive} href="#">
						<span className="badge badge-warning">&nbsp;&nbsp;</span> Installed
					</a>
				</li>
				<li className="nav-item">
					<a className={"nav-link"+filterUpdatedActive} href="#">
					<span className="badge badge-info">&nbsp;&nbsp;</span> Updated
					</a>
				</li>
				</ul>
			</div>  
		</nav>
	);
}

export default NavBar;