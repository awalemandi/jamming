import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

export default class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.runLoader = this.runLoader.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	runLoader() {
		this.props.onLoad();
	}

	render() {
		return (
			<div className="Playlist">
				<input value={this.props.playlistName} onChange={this.handleNameChange}/>
					<TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
				<button className="Playlist-save" onClick={() => {
					this.runLoader();
					this.props.onSave();
				}
				}>SAVE TO SPOTIFY</button>
			</div>
		);
	}
}