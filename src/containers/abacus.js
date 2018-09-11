import React, { Component } from 'react';
import AbacusColumn from '../components/abacus-column/abacus-column';

class Abacus extends Component {
	state = {
		number: 0,
		columns: [
			[{key: 0, numBeads: 2, total: 0, multiplier: 5000, top: true}, {key: 1, numBeads: 5, total: 0, multiplier: 1000, top: false}],
			[{key: 2, numBeads: 2, total: 0, multiplier: 500, top: true}, {key: 3, numBeads: 5, total: 0, multiplier: 100, top: false}],
			[{key: 4, numBeads: 2, total: 0, multiplier: 50, top: true}, {key: 5, numBeads: 5, total: 0, multiplier: 10, top: false}],
			[{key: 6, numBeads: 2, total: 0, multiplier: 5, top: true}, {key: 7, numBeads: 5, total: 0, multiplier: 1, top: false}]
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
				return <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 abacus-column">{col.map((col2, index2) => {
					return <AbacusColumn updateTotal={this.updateTotalHandler.bind(this)} key={col2.key} columnNum={index} which={index2} numBeads={col2.numBeads} defaultTop={col2.top} />;
				})}</div>;
			} else {
				return <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 abacus-column"><AbacusColumn updateTotal={this.updateTotalHandler.bind(this)} key={col.key} columnNum={index} numBeads={col.numBeads} which={null} defaultTop={col.top} /></div>;
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
