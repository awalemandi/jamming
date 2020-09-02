import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


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
        }
      ],
      playlistName: 'Chill Code Mix',
      playlistTracks: [{ name: 'Blue Jade', artist: 'Techno Goddess', album: 'Dark Mode Life', id: 27 }, {}, {}, {}]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}
