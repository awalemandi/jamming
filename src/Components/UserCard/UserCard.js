import React from 'react';
import './UserCard.css';

export default class UserCard extends React.Component {
	render() {
		return (
			<div className="card">
				<img className="photo" src={this.props.photoUrl} alt={this.props.userName}/>
				<h3 className="name">{this.props.userName}</h3>
			</div>
		);
	}
}