require("babel/polyfill")

let React = require('react')

import {UpperPanel} from "./UpperPanel.js"

var LandingPage=React.createClass({
	
	render:function(){
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<SelectionBox/>
			</div>
			)
	}
})


var SelectionBox=React.createClass({
	_parentLogin:function(){
		location.hash="invite/parent"
	},

	_sitterLogin:function(){
		location.hash="invite/sitter"
	},


	render:function(){
		return(
			<div id="SelectionBox">
				<h2>Manage your babysitting schedule, easily.</h2>
				<button onClick={this._parentLogin}>I am a Parent</button>
				<button onClick={this._sitterLogin}>I am a Sitter</button>
			</div>
			)
	}
})

export {LandingPage}