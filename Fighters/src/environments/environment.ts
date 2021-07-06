export enum Collections {
	message = 'message',
	games = 'games',
}

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyDlM1QWr54XrPH9N-29E_xKJnYJbpK2-fw',
		authDomain: 'fighters-994df.firebaseapp.com',
		databaseURL: 'https://fighters-994df.firebaseio.com',
		projectId: 'fighters-994df',
		storageBucket: 'fighters-994df.appspot.com',
		messagingSenderId: '206595130648',
		appId: '1:206595130648:web:87d23f9780a4146de10a6d',
	},
};

export function getCurrentEnvironment(collection: Collections): string {
	// Flip this to switch to prod
	const test = true;
	return test ? `${collection}Test` : collection;
}
