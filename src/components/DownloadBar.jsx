import React from 'react';


export default function DownloadBar({progress}){

	return(
		<div className="progress">
  			<div className="progress-bar" style={
				  {
					  width:`${progress*100}%`
					}
			}>{progress*100}% Downloading</div>
		</div>
	);
}