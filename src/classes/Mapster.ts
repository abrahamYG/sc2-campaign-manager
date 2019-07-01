import {scrapper as mscrap} from  "sc2mapster-crawler";
import Campaign, { ICampaign, IScreenshot, ISC2Component, ISC2Map } from "./Campaign";
import path from 'path'
import h2m from 'h2m'
const conn = new mscrap.MapsterConnection();

export const getCampaignFromMapster = async (projectId:string):Promise<ICampaign> => {
    const project = await conn.getProjectOverview(projectId);
    const screenshots:IScreenshot[] = (await conn.getProjectImages(projectId)).images.map(img =>({
        src:img.imageUrl,
        description:h2m(img.caption)
    }));
    let maps:ISC2Component[] = []
    
    for await(const f of await conn.getProjectFilesList(projectId)){
        const fileData = await conn.getProjectFile(projectId,f.id);
        const map:ISC2Component = {
            name:fileData.title,
            description:h2m(fileData.description.html),
            destination:`maps/${fileData.filename}`,
            source:`https://www.sc2mapster.com/projects/${projectId}/files/${fileData.id}/download`,
            sourceFormat:path.extname(fileData.filename),
            fileEntry:""
        }
        maps.push(map);
    }
    return {
        ...Campaign.emptyCampaign(),
        id: projectId,
        name:project.base.name,
        description: h2m(project.description.html),
        author:project.owner.name,
        thumbnail:project.base.thumbnail,
        lastUpdated:project.updatedAt.toISOString(),
        patchNotes:[],
        videos:[],
        screenshots,
        maps,
        mods:[]
    }
} 