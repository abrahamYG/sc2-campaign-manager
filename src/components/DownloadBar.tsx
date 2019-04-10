import React from 'react';


export default function DownloadBar(props:any){
	const percent = props.progress*100;
	return(/*
		<div className="progress">
  			<div className="progress-bar" style={
					{
						width:`${percent}%`
					}
				}  
				aria-valuenow={percent} 
				aria-valuemin={0} 
				aria-valuemax={100}
			>{percent}% Downloading</div>
		</div>
		*/
		<progress max="100" value={percent}></progress>
	);
}