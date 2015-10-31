let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var NotificationBox=React.createClass({
	render:function(){
		return(
			<div id="NotificationBox">
				<label>Notifications</label>
				<div id="NBox">

				</div>
			</div>
			)
	}
})


export {NotificationBox}