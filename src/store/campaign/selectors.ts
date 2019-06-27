import { ICampaign } from "../../classes/Campaign";

export interface IFilter {
	key?:string,
	val?:string,
	[x: string]: string
}
export const filterCampaigns = (
	campaigns: ICampaign[],
	filter: IFilter
): ICampaign[] => {
	const {key,val} = filter
	console.log("filterCampaigns",filter)
	return val !== ""
		? campaigns.filter(c => {
			const type = typeof c[key];
			switch (type) {
                case "string":
					return (c[key] as string).toUpperCase().includes(val.toUpperCase())
				case "number":
					return c[key] === (parseInt(val,10))
			}

		})
		: campaigns;
};

export const sortCampaigns = (
	campaigns: ICampaign[],
	key: string
): ICampaign[] => {
	if (key !== "") {
		return campaigns.sort((c1, c2) => {
			const type = typeof c1[key];
			switch (type) {
                case "string":
                    console.log("string")
					const [val1, val2] = [
						(c1[key] as string).toUpperCase(),
						(c2[key] as string).toUpperCase()
					];
					return val1.localeCompare(val2, 'en', {sensitivity: 'base'});
				case "number":
					return (c1[key] as number) - (c2[key] as number);
			}
		});
	}
	else return campaigns;
};
