import React, { Component } from 'react';

class Bead extends Component {

	basePosition = -1;
	baseMouse = -1;
	bottom_of_top = -1;
	top_of_bottom = -1;
	bottomTop = '';


	handleMouseMove = (e) => {
		if (this.baseMouse === -1) {
			this.baseMouse = e.clientY;
		}
		if (this.basePosition === -1) {
			this.basePosition = Number(this._input.style[this.bottomTop].replace('px', ''));;
		}
		let currPosition = null;
		if (this.props.bottom) {
			currPosition = this.basePosition - (e.clientY - this.baseMouse);
		} else {
			currPosition = this.basePosition + (e.clientY - this.baseMouse);
		}
		this._input.style[this.bottomTop] = currPosition + 'px';
		if (this.props.bottom && this._input.getBoundingClientRect().top < this.bottom_of_top) {
			this._input.style[this.bottomTop] = this.basePosition + 'px';
			this.handleMouseUp();
			this.props.addTop();
		}
		if (!this.props.bottom && this._input.getBoundingClientRect().bottom > this.top_of_bottom) {
			this._input.style[this.bottomTop] = this.basePosition + 'px';
			this.handleMouseUp();
			this.props.addBottom();
		}
	}

	handleMouseUp = () => {
		this.basePosition = -1;
		this.baseMouse = -1;
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
			this.top_of_bottom = document.getElementById('bottom_' + this.props.columnNum + '_' + this.props.maxBottom).getBoundingClientRect().top;
		} else if (this.props.maxBottom === -1) {
			this.top_of_bottom = document.getElementById('bottom-' + this.props.columnNum).getBoundingClientRect().top;
		}
		if (this.props.maxTop > -1) {
			this.bottom_of_top = document.getElementById('top_' + this.props.columnNum + '_' + this.props.maxTop).getBoundingClientRect().bottom;
		} else if (this.props.maxTop === -1) {
			this.bottom_of_top = document.getElementById('top-' + this.props.columnNum).getBoundingClientRect().bottom;
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
				<div id={this.bottomTop + '_' + this.props.columnNum + '_' + this.props.position} ref={(el) => self._input = el} onMouseDown={() => this.dragIt()} className="bead" style={style}><div className="beadIcon"></div></div>
			);

	}
}

export default Bead;
