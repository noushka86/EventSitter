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
import {PrntNotificationBox} from "./PrntNotificationBox.js"

var ParentHomePage=React.createClass({

	componentDidMount:function(){
		var self = this
		this.props.events.on('change update', function(){
			self.forceUpdate()
		})

		this.props.approvedInvitationBySitter.on('change update', function(){
			self.forceUpdate()
		})
	},

	render:function(){
		var userType="parent"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}/>
				<InfoBox showCreateEventButton={this.props.showCreateEventButton}
							events={this.props.events}
							sendEventDetails={this.props.sendEventDetails}
							approvedInvitationBySitter={this.props.approvedInvitationBySitter}
							seenByParent={this.props.seenByParent}

					/>
			</div>
			)
	}
})

var InfoBox=React.createClass({
	render:function(){
		return(
			<div id="InfoBox">
				<EventsBox showCreateEventButton={this.props.showCreateEventButton}
							sendEventDetails={this.props.sendEventDetails}
							events={this.props.events}
							userType={'parent'}
							/>

				<PrntNotificationBox approvedInvitationBySitter={this.props.approvedInvitationBySitter}
										seenByParent={this.props.seenByParent}
				/>

			</div>
			)
	}
})


				// <NotificationBox/>

export {ParentHomePage}
