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


var SitterHomePage=React.createClass({


	componentDidMount: function(){
		var self = this
		this.props.inviteNotifications.on('change update', function(){
			self.forceUpdate()
		})
		this.props.newEventNotifications.on('change update', function(){
			self.forceUpdate()
		})

	},

	render:function(){
		var userType="sitter"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}/>
				<InfoBox inviteNotifications={this.props.inviteNotifications}
							newEventNotifications={this.props.newEventNotifications}
							InvitationHandler={this.props.InvitationHandler}
							newEventHandler={this.props.newEventHandler}
						/>
			</div>
			)
	}
})


var InfoBox=React.createClass({
	render:function(){
		return(
			<div id="InfoBox">
				<EventsBox/>
				<NotificationBox inviteNotifications={this.props.inviteNotifications}
									newEventNotifications={this.props.newEventNotifications}
									InvitationHandler={this.props.InvitationHandler}
									newEventHandler={this.props.newEventHandler}
				/>
			</div>
			)
	}
})
export {SitterHomePage}