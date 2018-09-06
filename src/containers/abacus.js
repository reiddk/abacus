import React, { Component } from 'react';
import AbacusColumn from '../components/abacus-column/abacus-column';

class Abacus extends Component {
	state = {
		number: 0,
		columns: [
			{numBeads: 10, total: 0, multiplier: 1000},
			{numBeads: 10, total: 0, multiplier: 100},
			{numBeads: 10, total: 0, multiplier: 10},
			{numBeads: 10, total: 0, multiplier: 1}
		]
	}

	updateTotalHandler = (top, index) => {
		const getColumns = [...this.state.columns];
		const multiplier = getColumns[index].multiplier; 
		getColumns[index].total = top * multiplier;
		let grandTotal = 0; 
		for (let i = 0; i < getColumns.length; i++) {
			grandTotal += getColumns[i].total;
		}
		this.setState({number: grandTotal, columns: getColumns});
	}

	render() {

		const columns = [...this.state.columns];
		const columnsOut = columns.map((col, index) => {
			return <AbacusColumn updateTotal={this.updateTotalHandler.bind(this)} key={index} columnNum={index} numBeads={col.numBeads}/>
		});

		return (
			<div className="container">
			<h1>{this.state.number}</h1>
			<div className="row">
				{columnsOut}
			</div>
			</div>
		);
	}
}

export default Abacus;
