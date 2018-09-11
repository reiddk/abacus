import React, { Component } from 'react';
import AbacusColumn from '../components/abacus-column/abacus-column';

class Abacus extends Component {
	state = {
		number: 0,
		columns: [
			[{numBeads: 2, total: 0, multiplier: 5000, top: true}, {numBeads: 5, total: 0, multiplier: 1000, top: false}],
			[{numBeads: 2, total: 0, multiplier: 500, top: true}, {numBeads: 5, total: 0, multiplier: 100, top: false}],
			[{numBeads: 2, total: 0, multiplier: 50, top: true}, {numBeads: 5, total: 0, multiplier: 10, top: false}],
			[{numBeads: 2, total: 0, multiplier: 5, top: true}, {numBeads: 5, total: 0, multiplier: 1, top: false}]
		]
	}

	getTotals(columns) {
		let totals = 0; 
		for (let i = 0; i < columns.length; i++) {
			if (columns[i].constructor === Array) {
				totals += this.getTotals(columns[i]);
			} else if (columns[i].total){
				totals += columns[i].total;
			}
		}
		return totals;
	}

	updateTotalHandler = (top, index, which = null) => {
		const getColumns = [...this.state.columns];
		let multiplier = null;
		if (typeof which === 'number') {
			multiplier = getColumns[index][which].multiplier; 
			getColumns[index][which].total = top * multiplier;
		} else {
			multiplier = getColumns[index].multiplier; 
			getColumns[index].total = top * multiplier;
		}
		const grandTotal = this.getTotals(getColumns);
		this.setState({number: grandTotal, columns: getColumns});
	}

	render() {
		const columns = [...this.state.columns];
		const columnsOut = columns.map((col, index) => {
			if (col.constructor === Array) {
				return col.map((col2, index2) => {
					return <AbacusColumn updateTotal={this.updateTotalHandler.bind(this)} key={index + '-' +index2} columnNum={index} which={index2} numBeads={col2.numBeads} defaultTop={col2.top} />;
				});
			} else {
				return <AbacusColumn updateTotal={this.updateTotalHandler.bind(this)} key={index} columnNum={index} numBeads={col.numBeads} which={null} defaultTop={col.top} />;
			}
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
