import { ISC2Map, IScreenshot } from "../classes/Campaign";
import React, { ChangeEvent, FC } from "react";

interface IManifestEditorScreenshotProps{
	"index":number,
	"screenshot": IScreenshot,
	"setCampaignScreenshot":(screen:IScreenshot,index:number)=>void
}

const ManifestEditorScreenshot:FC<IManifestEditorScreenshotProps> = (props) => {
	const {screenshot, index, setCampaignScreenshot} = props;
	const {src,description} = screenshot;
	const onChange = (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLSelectElement>)=>{
		console.log(e);
		const newScreen = {
			...screenshot,
			[e.currentTarget.name]:e.currentTarget.value
		}
		console.log(newScreen)
		setCampaignScreenshot(newScreen,index);
	};

	return (
		<div className="card border-secondary mb-3 mr-0 ml-1">
  			<div className="card-header text-white bg-secondary">
			  <button className="btn btn-primary float-right" type="button" data-toggle="collapse" data-target={`map-${index}-body`} aria-expanded="false" aria-controls="collapseExample">
    				Collapse
  				</button>
			  <h5 className="card-title">Screenshot {index.toString()}</h5>
				
  			</div>
  			<div className="card-body mr-3" id={`map-${index}-body`}>
				{/*<h5 className="card-title">{type?type:"Map"} {index.toString()}</h5>*/}
                <div className="media">
                    <img style={{width:"64px",height:"64px"}}className="align-self-start mr-3" src={src} alt={description} />
                    <fieldset className="form-group campaign-form-map media-body">
                        <div className="form-group row">
                            <label htmlFor={`screenshot-${index}-src`} className="col-sm-2 col-form-label">Source</label>
                            <input 
                                id={`screenshot-${index}-src`}
                                value={src}
                                onChange={onChange}
                                type="text" 
                                className="form-control col-sm-10"
                                name="src" 
                                aria-describedby="runParamsHelp" 
                                placeholder="Enter an url for the screenshot" 
                                />
                        </div>
                        <div className="form-group row">
                            <label htmlFor={`screenshot-${index}-description`} className="col-sm-2 col-form-label">Description</label>
                            <textarea 
                                id={`screenshot-${index}-description`}
                                value={description}
                                onChange={onChange}
                                className="form-control col-sm-10"
                                name="description" 
                                aria-describedby="runParamsHelp" 
                                placeholder="Enter a description for the screenshot" 
                                />
                        </div>
				    </fieldset>
                </div>
			</div>
			<div className="card-footer">
				<div className="btn-group" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-primary">Up</button>
					<button type="button" className="btn btn-primary">Down</button>
					<button type="button" className="btn btn-danger">Delete</button>
				</div>
			</div>
		</div>
	);
}

export default ManifestEditorScreenshot;