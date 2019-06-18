declare interface IPCMessages {
	DOWNLOAD_MAP:string;
	DOWNLOAD_MAP_STATUS:string;
	DOWNLOAD_CAMPAIGN:string;
	DOWNLOAD_CAMPAIGN_STATUS:string;
	DOWNLOAD_CAMPAIGN_FINISH:string;
	PLAY_CAMPAIGN:string;
	PLAY_MAP:string;

}

declare const ipcmessages:IPCMessages;

export = ipcmessages;