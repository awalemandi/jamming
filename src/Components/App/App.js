import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import UserCard from '../UserCard/UserCard';
import Spotify from "../../util/Spotify";



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      displayPhotoUrl: '',
      displayName: 'user',
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris)
    .then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({ searchResults: results });
    });
  }

  updateUserDetails() {
    Spotify.getUserDetails().then(profile => {
      this.setState({
        displayPhotoUrl: profile.images[0].url,
        displayName: profile.display_name,
      })
    })
  }

  componentDidMount() {
    this.updateUserDetails();
  }

  render() {
    return (
      <div>
        <div className="Nav">
          <h1>Ja<span className="highlight">mmm</span>ing<span className="highlight">+</span></h1>
          <UserCard photoUrl={this.state.displayPhotoUrl} userName={this.state.displayName} />
        </div>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

