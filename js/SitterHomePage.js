
let React = require('react')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"
import {EventsBox} from "./EventsBox.js"
import {NotificationBox} from "./NotificationBox.js"


var SitterHomePage=React.createClass({


	componentWillMount: function(){
		// var self = this
		// window.sitterHomePage = this
		this.props.inviteNotifications.on('change update', ()=>this.forceUpdate())
		this.props.newEventNotifications.on('change update', ()=>this.forceUpdate())

		this.props.events.on('change update', ()=>this.forceUpdate())
	},

	componentWillUnmount: function(){
		var self = this
		// clearInterval(this.refreshInterval)
		this.props.inviteNotifications.off('change update')
		this.props.newEventNotifications.off('change update')

		this.props.events.off('change update')
	},

	render:function(){
		var userType="sitter"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType} currentUser={this.props.currentUser}
											logoutUser={this.props.logoutUser}
/>
				<InfoBox inviteNotifications={this.props.inviteNotifications}
							newEventNotifications={this.props.newEventNotifications}
							InvitationHandler={this.props.InvitationHandler}
							newEventHandler={this.props.newEventHandler}
							events={this.props.events}
							userType={'sitter'}
						/>
			</div>
			)
	}
})


var InfoBox=React.createClass({
	render:function(){
		return(
			<div id="InfoBox">
				
				<NotificationBox inviteNotifications={this.props.inviteNotifications}
									newEventNotifications={this.props.newEventNotifications}
									InvitationHandler={this.props.InvitationHandler}
									newEventHandler={this.props.newEventHandler}

				/>

				<EventsBox
					events={this.props.events}
					approvedEvents={true}
				/>
			</div>
			)
	}
})
export {SitterHomePage}