let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var EventsBox=React.createClass({
	render:function(){
		return(
			<div id="EventsBox">
				<label for="EBox">Upcoming Events</label>
				<div id="EBox">

				</div>
			</div>
			)
	}
})



export {EventsBox}