import { ICampaign } from "../classes/Campaign";
import React, { FC, ChangeEvent } from "react";

interface IManifestEditorJsonProps{
    campaign:ICampaign
}

const ManifestEditorJson:FC<IManifestEditorJsonProps> = (props) => {
    const {campaign} = props;
    const {id} = campaign
    const json = JSON.stringify(campaign,null,4)
    const isCampaign = (campaign:ICampaign):campaign is ICampaign =>{
        if((campaign as ICampaign).id){
            return true;
        }
        return false;
    }
    const onChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const json = JSON.parse(e.target.value);
        console.log(json);
        console.log("isCampaign",isCampaign(json))
	};
    return (
        <div className="form-group row">
            <label htmlFor={`campaign-${id}-json`} className="col-sm-2 col-form-label">JSON</label>
            

            <textarea 
                id={`campaign-${id}-json`}
                 
                value={json} 
                className="form-control col-sm-10 h-100"
                name="json"
                rows={20}
                onChange={onChange}
            />
        </div>
    );
}

export default ManifestEditorJson;