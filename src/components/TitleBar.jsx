import React from 'react';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'

function TitleBar(props) {
	return (
		<nav className="bg-dark navbar justify-content-between navbar-dark">
			<a href="#" className="navbar-brand">
			SC2 Campaign Browser
			</a>
			<ul className="nav navbar-nav navbar-right">
				<li className="nav-item">
				<button className="btn btn-dark"><i class="fas fa-window-maximize">Close</i></button>
				</li>
			</ul> 
		</nav>
		);
	}
	
	
	export default TitleBar;