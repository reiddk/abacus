import React, { Component } from 'react';
import AbacusColumn from '../components/abacus-column/abacus-column';

class Abacus extends Component {
	render() {
		return (
			<div className="row">
				<AbacusColumn columnNum={1} numBeads={10}/>
				<AbacusColumn columnNum={2} numBeads={10}/>
				<AbacusColumn columnNum={3} numBeads={10}/>
				<AbacusColumn columnNum={4} numBeads={10}/>
				<AbacusColumn columnNum={5} numBeads={10}/>
			</div>
		);
	}
}

export default Abacus;