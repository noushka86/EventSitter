let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"
import {EventsBox} from "./EventsBox.js"
import {NotificationBox} from "./NotificationBox.js"

var ParentHomePage=React.createClass({
	render:function(){
		var userType="parent"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}/>
				<InfoBox showCreateEventButton={this.props.showCreateEventButton}/>
			</div>
			)
	}
})

var InfoBox=React.createClass({
	render:function(){
		return(
			<div id="InfoBox">
				<EventsBox showCreateEventButton={this.props.showCreateEventButton}/>
				<NotificationBox/>
			</div>
			)
	}
})
export {ParentHomePage}
