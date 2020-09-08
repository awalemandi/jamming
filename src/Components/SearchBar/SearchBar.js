import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		}
		
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.runLoader = this.runLoader.bind(this);
	}

	search() {
		this.props.onSearch(this.state.searchTerm);
	}

	handleTermChange(event) {
		this.setState({ searchTerm: event.target.value });
	}
	 
	runLoader() {
		this.props.onLoad();
	}

	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
				<button className="SearchButton" onClick={() => {
					this.runLoader();
					this.search();
				}}>SEARCH</button>
			</div>
		)
	}
}