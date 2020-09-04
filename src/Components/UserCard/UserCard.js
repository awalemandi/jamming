import React from 'react';
import './UserCard.css';
import DummyPhoto from "../display.jpg";

export default class UserCard extends React.Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div className="card">
				<img className="photo" src={DummyPhoto} />
				<h3 className="name">{this.props.userName}</h3>
			</div>
		);
	}
}