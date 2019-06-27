const {app, BrowserWindow} = require('electron');
const execFile = require('child_process').execFile;
const { ipcMain } = require('electron');
const { session } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const download = require('download');
//const os   = require('os');
const yauzl = require('yauzl');
//const download = require('./electron/Download');
//const {download} = require('electron-dl');


const msg = require('./src/constants/ipcmessages');

let mainWindow;



//DownloadManager.register();


/*require('electron-reload')(__dirname, {
	// Note that the path to electron may vary according to the main file
	electron: require(`${__dirname}/node_modules/electron`)
});
*/

const loadDevTools = () =>{
	console.log("NODE_ENV",process.env)
	if(process.env.NODE_ENV === 'dev'){
		const { default: installExtension, REACT_DEVELOPER_TOOLS,REDUX_DEVTOOLS } = require('electron-devtools-installer');
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
	}
}

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 720,
		//frame: false,
		titleBarStyle:"hidden",
		webPreferences: {
			nodeIntegration: true
		}
	});
	loadDevTools();
	
	mainWindow.loadFile('index.html');
	/*mainWindow.webContents.openDevTools({
		mode:"detach" 
	});*/
	mainWindow.on('closed', () => {
		mainWindow = null;
	})
	
	
}

function initSessionData(){
	
	//mainWindow.webContents.downloadURL("https://github.com/danielthepirate/StarCraftPlus/blob/master/Build/StarCraftPlus.SC2Mod?raw=true");
}

function onReady(){
	
	createWindow();
	initSessionData();
}

app.on('ready', onReady)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on(msg.DOWNLOAD_MAP, async (event, arg) => {
	let test;
	//console.log(arg)
	const {source, file,installDir} = arg;
	const fileName = file.replace(/^.*[\\\/]/, '')
	const filePath = installDir+file.replace(fileName,"")
	const fullFilePath = path.join(filePath, fileName);
	console.log({fileName, filePath});
	const win = BrowserWindow.getFocusedWindow();
	
	const data = await download(source).on('downloadProgress', progress => {
		// Report download progress
		console.log(`${fileName}: ${progress.percent}`);
		event.sender.send(msg.DOWNLOAD_MAP_STATUS, {fileName, progress: progress.percent})
	})
	fs.writeFileSync(fullFilePath, data);
	//.then(data => {
	//});
	
	
})

ipcMain.on(msg.UNZIP_CAMPAIGN,async (event, {source, zipPath, installPath}) =>{
	yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
		if (err) {
			throw err;
		}
		zipfile.readEntry();
		zipfile.on("entry", (entry) => {
			console.log(entry.fileName);
			if (/\/$/.test(entry.fileName)) {
				zipfile.readEntry();
			} else {
				const mod = source.files.find(
					mod => entry.fileName === mod.fileEntry
				);
				if (mod) {
					const entryBasePath = installPath;
					const entryBaseName = mod.destination;
					const entryFullPath = path.join(
						entryBasePath,
						entryBaseName
					);
					console.log("entryFullPath", entryFullPath);
					fs.ensureDirSync(path.dirname(entryFullPath));
					const ds = fs.createWriteStream(entryFullPath);
					zipfile.openReadStream(entry, function(
						err,
						readStream
					) {
						if (err) throw err;
						readStream.on("end", function() {
							zipfile.readEntry();
						});
						readStream.pipe(ds);
					});
				} else {
					zipfile.readEntry();
				}
			}
		});
		zipfile.once("end", function() {
			zipfile.close();
		});
	});
});

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
			if (!sources[mod.source]){
				sources[mod.source] = {
					format: sourceFormat,
					files:[]
				}
				downloadtracker.downloads.push({ source: mod.source, progress:0})
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
							const entryData = sources[source].files.find(e => entry.fileName === e.fileEntry)
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


ipcMain.on(msg.PLAY_MAP, async (event, map) => {
	const {command, params} = campaign;
	console.log(command, params)
	execFile(campaign.command,params,function(error, stdout, stderr) {
		console.log(error)
		console.log(stdout);
	});
});