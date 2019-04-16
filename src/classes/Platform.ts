const os = require('os');

export const platforms:{
	WINDOWS: string,
	MAC: string,
	LINUX: string,
	SUN: string,
	OPENBSD: string,
	ANDROID: string,
	AIX: string,
} = {
	WINDOWS: 'WINDOWS',
	MAC: 'MAC',
	LINUX: 'LINUX',
	SUN: 'SUN',
	OPENBSD: 'OPENBSD',
	ANDROID: 'ANDROID',
	AIX: 'AIX',
};

export const platformsNames:{
	"win32": string,
	"darwin": string,
	"linux": string,
	"sunos": string,
	"openbsd": string,
	"android": string,
	"aix": string
	[index: string]: string
} = {
	win32: platforms.WINDOWS,
	darwin: platforms.MAC,
	linux: platforms.LINUX,
	sunos: platforms.SUN,
	openbsd: platforms.OPENBSD,
	android: platforms.ANDROID,
	aix: platforms.AIX,
};

export const currentPlatform:string = platformsNames[os.platform()];