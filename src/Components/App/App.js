import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import TrackList from "../TrackList/TrackList";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: `Don't Stop Believin'`,
          artist: 'Journey',
          album: 'Escape',
          id: '234'
        },
        {
          name: `Don't Stop Believin'`,
          artist: 'Journey',
          album: 'Escape',
          id: '234'
        },
        {
          name: `Don't Stop Believin'`,
          artist: 'Journey',
          album: 'Escape',
          id: '234'
        },
        {
          name: `Don't Stop Believin'`,
          artist: 'Journey',
          album: 'Escape',
          id: '234'
        },
        {
          name: `Don't Stop Believin'`,
          artist: 'Journey',
          album: 'Escape',
          id: '234'
        }
      ],
      playlistName: 'Chill Code Mix',
      playlistTracks: [
        { name: 'Blue Jade', artist: 'Techno Goddess', album: 'Dark Mode Life', id: 27 },
        { name: 'Blue Jade', artist: 'Techno Goddess', album: 'Dark Mode Life', id: 28 },
        { name: 'Blue Jade', artist: 'Techno Goddess', album: 'Dark Mode Life', id: 29 },
        { name: 'Blue Jade', artist: 'Techno Goddess', album: 'Dark Mode Life', id: 30 }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchResults = this.search.bind(this);
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
    // let trackUris = this.state.playlistTracks.map(track => { track.uri });
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onSearch={this.search} />
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

