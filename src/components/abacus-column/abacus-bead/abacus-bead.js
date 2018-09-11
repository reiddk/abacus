import React, { Component } from 'react';

class Bead extends Component {

	basePosition = {};
	baseMouse = -1;
	bottom_of_top = -1;
	top_of_bottom = -1;
	bottomTop = '';
	beadSize = 20;
	numBeadsSelected = 0;

	moveBead(element, e, num) {
		if (this.baseMouse === -1) {
			this.baseMouse = e.clientY;
		}
		if (!this.basePosition[num]) {
			this.basePosition[num] = Number(element.style[this.bottomTop].replace('px', ''));
		}
		let currPosition = null;
		if (this.props.bottom) {
			currPosition = this.basePosition[num] - (e.clientY - this.baseMouse);
		} else {
			currPosition = this.basePosition[num] + (e.clientY - this.baseMouse);
		}
		element.style[this.bottomTop] = currPosition + 'px';
		if (this.props.bottom && element.getBoundingClientRect().top < this.bottom_of_top) {
			element.style[this.bottomTop] = this.basePosition[num] + 'px';
			this.props.addTop(this.numBeadsSelected);
			this.handleMouseUp();
		}
		if (!this.props.bottom && element.getBoundingClientRect().bottom > this.top_of_bottom) {
			element.style[this.bottomTop] = this.basePosition[num] + 'px';
			this.props.addBottom(this.numBeadsSelected);
			this.handleMouseUp();
		}
	}

	handleMouseMove = (e) => {
		let inputIdArr = this._input.id.split('_');
		let appendingNumber = Number(inputIdArr[inputIdArr.length-1]);
		const firstNum = appendingNumber;
		inputIdArr.splice(-1, 1);
		const inputIdBase = inputIdArr.join('_');
		while (document.getElementById(inputIdBase + '_' + appendingNumber)) {
			this.moveBead(document.getElementById(inputIdBase + '_' + appendingNumber), e, appendingNumber);
			appendingNumber++;
		}
		this.numBeadsSelected = appendingNumber - firstNum;
	}

	handleMouseUp = () => {
		this.basePosition = {};
		this.baseMouse = -1;
		this.numBeadsSelected = 0;
		window.removeEventListener('mouseup', this.handleMouseUp);
		window.removeEventListener('mousemove', this.handleMouseMove);
	}

	dragIt() {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	handleBoundaries() {
		this.handleMouseUp();
		if (this.props.maxBottom > -1) {
			this.top_of_bottom = document.getElementById('bottom_' + this.props.columnClass + '_' + this.props.maxBottom).getBoundingClientRect().top;
		} else if (this.props.maxBottom === -1) {
			this.top_of_bottom = document.getElementById('bottom-' + this.props.columnClass).getBoundingClientRect().top;
		}
		if (this.props.maxTop > -1) {
			this.bottom_of_top = document.getElementById('top_' + this.props.columnClass + '_' + this.props.maxTop).getBoundingClientRect().bottom;
		} else if (this.props.maxTop === -1) {
			this.bottom_of_top = document.getElementById('top-' + this.props.columnClass).getBoundingClientRect().bottom;
		}
	}

	componentDidMount() {
		this.handleBoundaries();
	}

	componentDidUpdate() {
		this.handleBoundaries();
	}


	render() {
		const multiplier = 20;
		const style = {};

		if (this.props.bottom) {
			this.bottomTop = 'bottom';
		} else {
			this.bottomTop = 'top';
		}

		if (this.props.bottom) {
			style['bottom'] = multiplier * this.props.position;
		} else {
			style['top'] = multiplier * this.props.position;
		}
		const self = this;
			
			return (
				<div id={this.bottomTop + '_' + this.props.columnClass + '_' + this.props.position} ref={(el) => self._input = el} onMouseDown={() => this.dragIt()} className="bead" style={style}><div className="beadIcon" style={{height: this.beadSize+'px', width: this.beadSize+'px'}}></div></div>
			);

	}
}

export default Bead;
