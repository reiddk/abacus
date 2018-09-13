import React, { Component } from 'react';
import './abacus-bead.css';

const BEAD_TILT_DIVIDER = 16;
const BEAD_TILT_ADDER = 100;
const BEAD_TILT_MAX = 400;
const BEAD_TILT_MIN = 300;
const BEAD_TILT_Y = 196;
const BEAD_SIZE = 15;

class Bead extends Component {

	basePosition = {};
	baseMouse = -1;
	bottom_of_top = -1;
	top_of_bottom = -1;
	bottomTop = '';
	numBeadsSelected = 0;
	baseDeg = 348;
	beadDeg = 348;
	column_top = 0;

	setBeadTilt(element) {
		let beadDeg = this.baseDeg;
		beadDeg += (this.column_top - element.getBoundingClientRect().bottom + BEAD_TILT_ADDER) / BEAD_TILT_DIVIDER;
		if (beadDeg > BEAD_TILT_MAX) {
			beadDeg = BEAD_TILT_MAX;
		} else if (beadDeg < BEAD_TILT_MIN) {
			beadDeg = BEAD_TILT_MIN;
		}
		element.children[0].children[0].children[0].style.transform = 'rotateX(-'+beadDeg+'deg) rotateY('+BEAD_TILT_Y+'deg)';
	}

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
		this.setBeadTilt(element);
		this.beadDeg += this.baseDeg + currPosition;
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
		this.column_top = document.getElementById('top-' + this.props.columnClass).getBoundingClientRect().bottom;
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
		this.setBeadTilt(this._input);
	}

	componentDidUpdate() {
		this.handleBoundaries();
	}


	render() {
		const style = {};

		if (this.props.bottom) {
			this.bottomTop = 'bottom';
		} else {
			this.bottomTop = 'top';
		}

		if (this.props.bottom) {
			style['bottom'] = BEAD_SIZE * this.props.position;
		} else {
			style['top'] = BEAD_SIZE * this.props.position;
		}
		const self = this;
		style.zIndex = this.props.position;
		if (this.props.bottom) {
			style.zIndex = 100 - this.props.position;
		}
			return (
				<div id={this.bottomTop + '_' + this.props.columnClass + '_' + this.props.position} ref={(el) => self._input = el} onMouseDown={() => this.dragIt()} className="bead" style={style}>
				<div className="beadIcon">

<div className="tridiv">
  <div className="scene" style={{ transform:'rotateY('+BEAD_TILT_Y+'deg)'}}>
    <div className="shape cylinder-1 cyl-1">
      <div className="face bm">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.153)'}}></div>
      </div>
      <div className="face tp">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.153)'}}></div>
      </div>
      <div className="face side s0">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.13)'}}></div>
      </div>
      <div className="face side s1">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.09)'}}></div>
      </div>
      <div className="face side s2">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.075)'}}></div>
      </div>
      <div className="face side s3">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.086)'}}></div>
      </div>
      <div className="face side s4">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.12)'}}></div>
      </div>
      <div className="face side s5">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.173)'}}></div>
      </div>
      <div className="face side s6">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.235)'}}></div>
      </div>
      <div className="face side s7">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.298)'}}></div>
      </div>
      <div className="face side s8">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.36)'}}></div>
      </div>
      <div className="face side s9">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.42)'}}></div>
      </div>
      <div className="face side s10">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.47)'}}></div>
      </div>
      <div className="face side s11">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.51)'}}></div>
      </div>
      <div className="face side s12">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.525)'}}></div>
      </div>
      <div className="face side s13">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.514)'}}></div>
      </div>
      <div className="face side s14">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.48)'}}></div>
      </div>
      <div className="face side s15">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.427)'}}></div>
      </div>
      <div className="face side s16">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.365)'}}></div>
      </div>
      <div className="face side s17">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></div>
      </div>
      <div className="face side s18">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.24)'}}></div>
      </div>
      <div className="face side s19">
        <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.18)'}}></div>
      </div>
    </div>
  </div>
</div>

				</div></div>
			);

	}
}

export default Bead;
