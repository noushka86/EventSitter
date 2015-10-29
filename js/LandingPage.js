require("babel/polyfill")

let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"

var LandingPage=React.createClass({
	
	render:function(){
		return(
			<div>
				<UpperPanel/>
				<SelectionBox/>
			</div>
			)
	}
})


var SelectionBox=React.createClass({
	render:function(){
		return(
			<div id="SelectionBox">
				<h2>Manage your babysitting schedule, easily.</h2>
				<button>I am a Parent</button>
				<button>I am a Sitter</button>
			</div>
			)
	}
})

export {LandingPage}