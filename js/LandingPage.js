// the codes
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

	_LoginView:function(event){
			location.hash="invite/"+event.target.name
	},

	render:function(){
		return(
			<div id="SelectionBox">
				<h2>Manage your babysitting schedule, easily.</h2>
				<button onClick={this._LoginView} name={'parent'}>I am a Parent</button>
				<button onClick={this._LoginView} name={'sitter'}>I am a Sitter</button>
			</div>
			)
	}
})

export {LandingPage}
