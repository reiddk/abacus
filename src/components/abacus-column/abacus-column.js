import React, { Component } from 'react';
import Bead from './abacus-bead/abacus-bead';

class AbacusColumn extends Component {
	state = {
		top: 3,
		bottom: 0
	}

	componentDidMount() {
		if (this.props.numBeads) {
			this.setState({bottom: this.props.numBeads});
		}
	}

	addTopHandler(howMany = 1) {
		let currTop = this.state.top;
		currTop += howMany;
		if (currTop < 0) {
			currTop = 0;
		}
		this.setState({top: currTop});
	}

	addBottomHandler(howMany = 1) {
		let currBottom = this.state.bottom;
		currBottom += howMany;
		if (currBottom < 0) {
			currBottom = 0;
		}
		this.setState({bottom: currBottom});
	}

	render() {
		const bottom = this.state.bottom;
		const top = this.state.top;
		const bottomArr = [];
		const topArr = [];

		for (let i = 0; i < bottom; i++) {
			bottomArr.push(<Bead maxBottom={bottom-1} maxTop={top-1} key={i} columnNum={this.props.columnNum} position={i} bottom={true} addTop={this.addTopHandler} addBottom={this.addBottomHandler}/>);
		}

		for (let i = 0; i < top; i++) {
			topArr.push(<Bead maxBottom={bottom-1} maxTop={top-1} key={i} columnNum={this.props.columnNum} position={i} bottom={false} addTop={this.addTopHandler} addBottom={this.addBottomHandler}/>);
		}

		return (
			<div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 abacus-column">
				<div id={'top-' + this.props.columnNum} className="top-beads">
					{topArr}
				</div>
				<div id={'bottom-' + this.props.columnNum} className="bottom-beads">
					{bottomArr}
				</div>
			</div>
		);
	}

}

export default AbacusColumn;