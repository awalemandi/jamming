import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import UserCard from '../UserCard/UserCard';
import Spotify from "../../util/Spotify";
import { BarLoader } from 'react-spinners';
import { css } from '@emotion/core';
import BackToTop from 'react-back-to-top-button';


const searchLoaderStyle = css`
  width: 50%;
  height: 950px;
  padding: 2.27rem 1.16rem;
  background-color: rgba(1, 12, 63, 0.7);
  box-shadow: 0 4px 2px 2px #000000;
  `;

const playlistLoaderStyle = css`
  width: 37%;
  max-height: 950px;
  padding: 2.27rem 1.16rem;
  background-color: rgba(1, 12, 63, 0.7);
  box-shadow: 0 4px 2px 2px #000000;
  `;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      displayPhotoUrl: '../../util/avatar.png',
      displayName: '',
      userId: '',
      searchLoading: false,
      playlistLoading: false
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.runSearchLoader = this.runSearchLoader.bind(this);
    this.runPlaylistLoader = this.runPlaylistLoader.bind(this);
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
          playlistTracks: [],
          playlistLoading: false
        });
        alert('Your playlist has been saved! 👍');
      })
      .catch(e => {
        console.log(e);
      });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({
        searchResults: results,
        searchLoading: false
      });
    });
  }

  updateUserDetails() {
    Spotify.getUserDetails().then(profile => {
      this.setState({
        displayPhotoUrl: profile.images[0].url,
        displayName: profile.display_name,
        userId: profile.user_id
      })
    })
  }

  runSearchLoader() {
    this.setState({ searchLoading: !this.state.searchLoading });
  }

  runPlaylistLoader() {
    this.setState({ playlistLoading: !this.state.playlistLoading });
  }

  componentDidMount() {
    this.updateUserDetails();
  }

  render() {
    return (
      <div>

        <div className="Nav">
          <h1>Ja<span className="highlight">mmm</span>ing<span className="highlight">+</span></h1>

          <a href={`https://open.spotify.com/?_ga=2.120630607.656650590.1599439241-1927015600.1597964844}`}
            target="_blank" rel="noopener noreferrer"
          >
            <UserCard photoUrl={this.state.displayPhotoUrl} userName={this.state.displayName} />
          </a>
        </div>

        <div className="App">

            <SearchBar onSearch={this.search} onLoad={this.runSearchLoader} />
          <div className="App-playlist">
            
            
            {
              (this.state.searchLoading) ?
                <BarLoader css={searchLoaderStyle} loading={this.state.searchLoading} size={70} color={"#fff"} />
                :
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            }

            {
              (this.state.playlistLoading) ?
              <BarLoader css={playlistLoaderStyle} loading={this.state.playlistLoading} size={70} color={"#fff"} />
              :
              <
                Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onLoad={this.runPlaylistLoader}
              />
            }

            <BackToTop
              showOnScrollUp
              showAt={300}
              speed={1500}
              easing="easeInOutQuint"
            >
            <button className="upButton">BACK TOP</button>
            </BackToTop>
          </div>
          
        </div>
        
      </div>
    );
  }
}

