import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function NavBar(props) {
	const {selectedPane} = props;
	const filterActive = "installed"
	const campaignPaneActive = ((selectedPane === "campaigns")?" active":"");
	const settingsPaneActive = ((selectedPane === "settings")?" active":" ");
	const mapmakersPaneActive = ((selectedPane === "mapmakers")?" active":" ");
	const filterInstalledActive = ((filterActive === "installed")?" active":" ");
	const filterUpdatedActive = ((filterActive === "updated")?" active":" ");
	return (
		<nav className="top-bar navbar navbar-expand-sm navbar-dark">
			<NavLink to="/" className="navbar-brand">
				Campaign Browser
			</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="collapsibleNavbar">
				<ul className="navbar-nav">
				<li className="nav-item">
					<NavLink to="/campaigns" className="nav-link" activeClassName="active">
						Campaigns <span class="campaign-count badge badge-dark">2</span>
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
						<span class="badge badge-warning">&nbsp;&nbsp;</span> Installed
					</a>
				</li>
				<li className="nav-item">
					<a className={"nav-link"+filterUpdatedActive} href="#">
					<span class="badge badge-info">&nbsp;&nbsp;</span> Updated
					</a>
				</li>
				</ul>
			</div>  
		</nav>
	);
}

	
	export default NavBar;