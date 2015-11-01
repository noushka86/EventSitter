let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var EventsBox=React.createClass({
	render:function(){
		var styleObj={}
		if(!this.props.showCreateEventButton){
			styleObj={
				display:'none'
			}
		}
		return(
			<div id="EventsBox">
				<label>Upcoming Events</label>
				<button style={styleObj}>{"\u2795"}</button>
				<div id="EBox">

				</div>
			</div>
			)
	}
})



export {EventsBox}