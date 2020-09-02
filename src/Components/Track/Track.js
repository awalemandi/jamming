import React from 'react';
import './Track.css';

export default class Track extends React.Component {
	// renderAction() {
	// 	return (isRemoval) ? <button>-</button> : <button>+</button>;
	// }
	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				{/* <button class="Track-action"><!-- + or - will go here --></button> */}
			</div>
		);
	}
}