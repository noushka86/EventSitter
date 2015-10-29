let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var UpperPanel=React.createClass({
	render:function(){
		return(
			<div id="UpperPanel">
				<img src="./images/babysitter.jpg"/>
				<h4>EventSitter</h4>
			</div>
			)
	}
})




export {UpperPanel}