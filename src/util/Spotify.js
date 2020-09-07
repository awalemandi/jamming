require('dotenv').config();

let userAccessToken;
const clientId = process.env.REACT_APP_API_KEY;
const redirectUri = 'http://localhost:3000/';

const Spotify = {
	getAccessToken() {
		if (userAccessToken) { return userAccessToken; };
		
		//checking for access token match
		const AccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (AccessTokenMatch && expiresInMatch) {
			userAccessToken = AccessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);

			//Clearing the parameters so that we can grab new access token when it expires.
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return userAccessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},

	search(searchTerm) {
		const accessToken = Spotify.getAccessToken();
		const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
		return fetch(searchUrl, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then(response => {
			return response.json();
		})
		.then(jsonResponse => {
			if (!jsonResponse.tracks) {
				return [];
			}
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		})

	},

	savePlaylist(playlistName, trackUris) {
		const accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;
		if (!playlistName || !trackUris.length) {
			return;
		}

		return fetch('https://api.spotify.com/v1/me', { headers: headers })
		.then(response => response.json())
		.then(jsonResponse => {
			userId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({name: playlistName})
			})
		})
		.then(response => response.json())
		.then(jsonResponse => {
			const playlistId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({ uris: trackUris })
			});
		})
	},

	getUserDetails() {
		const accessToken = Spotify.getAccessToken();
		return fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then(response => {
				return response.json();
			})
			.then(jsonResponse => {return jsonResponse})
	}
};

export default Spotify;