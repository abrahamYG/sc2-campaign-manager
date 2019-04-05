const {app, BrowserWindow} = require('electron');
const { ipcMain } = require('electron');
const { session } = require('electron');
const path = require('path');
//const download = require('./electron/Download');
//const {download} = require('electron-dl');

const fs = require('fs');
const download = require('download');

const msg = require('./src/constants/ipcmessages');

let mainWindow;

//DownloadManager.register();


require('electron-reload')(__dirname, {
	// Note that the path to electron may vary according to the main file
	electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 600,
		//frame: false,
		titleBarStyle:"hidden",
		webPreferences: {
			nodeIntegration: true
		}
	});
	
	mainWindow.loadFile('index.html');
	mainWindow.webContents.openDevTools({
		mode:"detach" 
	});
	mainWindow.setProgressBar(0.5);
	mainWindow.on('closed', function () {
		mainWindow = null;
	})
	
	
}

function initSessionData(){
	mainWindow.webContents.session.on('will-download', (e, item, webContents) => {
		filePath = "c:/temp/StarCraftPlus.SC2Mod";
		item.setSavePath(path.normalize(filePath));
		console.log(e);
		console.log(item.getSavePath());
		item.on('updated', (event, state) => {
			if (state === 'interrupted') {
				console.log('Download is interrupted but can be resumed')
				console.log(item.getSavePath());
			} else if (state === 'progressing') {
				if (item.isPaused()) {
					console.log('Download is paused')
				} else {
					console.log(`Received bytes: ${item.getReceivedBytes()}`)
				}
			}
		})
		item.on('done', (event, state) => {
			if (state === 'completed') {
				console.log('Download successfully')
			} else {
				console.log(`Download failed: ${state}`)
			}
		})
	}
	
	
	);
	
	//mainWindow.webContents.downloadURL("https://github.com/danielthepirate/StarCraftPlus/blob/master/Build/StarCraftPlus.SC2Mod?raw=true");
}

function onReady(){
	
	createWindow();
	initSessionData();
}

app.on('ready', onReady)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', function () {
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

ipcMain.on(msg.DOWNLOAD_CAMPAIGN, async (event, campaign) => {
	let test;
	//console.log(arg)
	const {maps, mods,installDir} = campaign;
	const downloadtracker = {downloads:[], totalProgress:0}
	maps.map((map) => {
		const {source, file} = map;
		console.log(map);
		const fileName = path.basename(file);
		const fullFilePath = path.join(installDir, file);
	
		downloadtracker.downloads.push({ file, progress:0})
		//const data = await 
		download(source).on('downloadProgress', progress => {
			console.log(`${file}: ${progress.percent}`);
			const dlitem = downloadtracker.downloads.find(e => file === e.file)
			dlitem.progress = progress.percent
			console.log("dlitem",dlitem);
			console.log("downloadtracker.downloads.length",downloadtracker.downloads.length)
			downloadtracker.totalProgress = downloadtracker.downloads.reduce((total, {progress}) => {console.log("reducer e: ", progress); console.log("reducer total: ", total); return total + progress},0.0) / downloadtracker.downloads.length;
			console.log("downloadtracker.totalProgress", downloadtracker.totalProgress);
			mainWindow.setProgressBar(downloadtracker.totalProgress);
			event.sender.send(msg.DOWNLOAD_CAMPAIGN_STATUS, {campaignId: campaign.id, progress: downloadtracker.totalProgress})
		}).then(data => {
			console.log("writing data");
			fs.writeFileSync(fullFilePath, data)
		})
		//
	});
	
})

