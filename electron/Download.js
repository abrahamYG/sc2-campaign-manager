function getModSource(mod){
	const {source, sourceFormat} = mod;
	let sourceData = {
		"source":source,
		"format":sourceFormat,
		"files":[],
		"progress":0
	}
	return sourceData;
}


const  getSourceFromFilename = (sources, fileName) => {
	return sources[source].files.find(e => fileName === e.fileEntry);
}


function extractZipData(sourceData){
	const {installDir, sources, source, data} = sourceData;
	const zipBaseDir = installDir;
	const zipBaseName = path.basename(source)
	console.log("zipBaseDir:", zipBaseDir)
	console.log("zipBaseName:", zipBaseName)
	const zipPath = path.join(zipBaseDir, zipBaseName);
	console.log("zip:", zipPath);
	fs.writeFileSync(zipPath, data);
	yauzl.open(zipPath, {lazyEntries: true}, function(err, zipfile) {
		if (err){ throw err;}
		zipfile.readEntry();
		zipfile.on("entry", function(entry) {
			console.log(entry.fileName);
			if (/\/$/.test(entry.fileName)){
				zipfile.readEntry();
			}
			else {
				const entryData = getSourceFromFilename(sources, entry.fileName);
				if(entryData){
					const entryBasePath = installDir;	
					const entryBaseName = entryData.destination;
					const entryFullPath = path.join(entryBasePath,entryBaseName);
					console.log("entryFullPath",entryFullPath)
					fs.ensureDirSync(path.dirname(entryFullPath));
					const destStream = fs.createWriteStream(entryFullPath);
					zipfile.openReadStream(entry, function(err, readStream) {
						if (err) throw err;
						readStream.on("end", function() {
							zipfile.readEntry();
						});
						readStream.pipe(destStream);
					});
				}
				else{
					zipfile.readEntry();
				}
			}
			
		});
		zipfile.once("end", function() {
			zipfile.close();
		});
	});
}

ipcMain.on(msg.DOWNLOAD_CAMPAIGN, async (event, campaign) => {
	let timer = Date.now();
	const {maps, mods,installDir} = campaign;
	const downloadtracker = {downloads:[], totalProgress:0}
	const mapsmods = [...mods, ...maps];
	console.log("maps and mods:",mapsmods)
	const sources = {};
	try {
		mapsmods.map(mod => {
			const {sourceFormat} = mod;
			let sourceData;
			if (!sources[mod.source]){
				sources[mod.source] = getModSource(mod)
				downloadtracker.downloads.push(sources[mod.source])
			}
			if(sources[mod.source].format === "zip") {
				sources[mod.source].files.push(mod);
			}
			else{ 
				sources[mod.source].files = mod;
			}
		});
	} catch (error) {
		console.log("Error!:",error);
	}
	
	const myPromises = [];
	console.log("sources: ",sources)
	for(let source in sources){
		console.log("current source:", source);
		const promise = download(source).on('downloadProgress', progress => {
			const dlitem = downloadtracker.downloads.find(dl => source === dl.source)
			dlitem.progress = progress.percent;
			downloadtracker.totalProgress = downloadtracker.downloads.reduce((total, {progress}) => total + progress,0.0) / downloadtracker.downloads.length;
			if((Date.now() - timer) > 1000 || progress.percent >= 1){
				//console.log("DOWNLOADTRACKER",downloadtracker);
				mainWindow.setProgressBar(downloadtracker.totalProgress);
				event.sender.send(msg.DOWNLOAD_CAMPAIGN_STATUS, {campaignId: campaign.id, progress: downloadtracker.totalProgress})
				timer = Date.now();
			}
		}).then(data =>{
			console.log("finished:", source)
			if(sources[source].format==="zip"){
				extractZipData({installDir, sources, source, data})
				
			}
			else {
				const destBaseDir = installDir;
				const destBasename = sources[source].files.destination;
				console.log("destBaseDir:", destBaseDir)
				console.log("destBasename:", destBasename)
				const destPath = path.join(destBaseDir, destBasename);
				console.log("nozip: ", destPath);
				fs.ensureDirSync(path.dirname(destPath));
				fs.writeFileSync(destPath, data);
			}
		}).catch((reason) =>{
			console.log("Rejected promise:", reason)
		})
		console.log("promise: ", promise)
		myPromises.push(promise);
	}
	console.log("end loop!")
	Promise.all(myPromises).then(() => {
		console.log("All downloads finished?");
		event.sender.send(msg.DOWNLOAD_CAMPAIGN_FINISH, {campaignId: campaign.id, progress: downloadtracker.totalProgress})
	});
})

ipcMain.on(msg.PLAY_CAMPAIGN, async (event, campaign) => {
	const {command, params} = campaign;
	console.log(command, params)
	execFile(campaign.command,params,function(error, stdout, stderr) {
		console.log(error)
		console.log(stdout);
	});
});