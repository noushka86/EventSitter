let React = require('react')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"
import {EventsBox} from "./EventsBox.js"
import {NotificationBox} from "./NotificationBox.js"
import {PrntNotificationBox} from "./PrntNotificationBox.js"

var ParentHomePage=React.createClass({

	componentWillMount:function(){
		var self = this
		this.props.events.on('change update', function(){
			self.forceUpdate()
		})

		this.props.approvedInvitationBySitter.on('change update', function(){
			self.forceUpdate()
		})

		this.props.pendingEvents.on('change update', function(){
			self.forceUpdate()
		})
	},

	componentWillUnmount: function(){
		var self = this
		this.props.events.off('change update')

		this.props.approvedInvitationBySitter.off('change update')

		this.props.pendingEvents.off('change update')
	},


	render:function(){
		var userType="parent"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType} currentUser={this.props.currentUser}
											logoutUser={this.props.logoutUser}
/>
				<InfoBox showCreateEventButton={this.props.showCreateEventButton}
							events={this.props.events}
							sendEventDetails={this.props.sendEventDetails}
							approvedInvitationBySitter={this.props.approvedInvitationBySitter}
							seenByParent={this.props.seenByParent}
							pendingEvents={this.props.pendingEvents}


					/>
			</div>
			)
	}
})

var InfoBox=React.createClass({
	render:function(){
		// console.log('props 2 EventsBox daata -->')
		// console.log(this.props.events)
		return(
			<div id="InfoBox">
				<PrntNotificationBox approvedInvitationBySitter={this.props.approvedInvitationBySitter}
										seenByParent={this.props.seenByParent}
				/>	

				<EventsBox showCreateEventButton={this.props.showCreateEventButton}
							sendEventDetails={this.props.sendEventDetails}
							events={this.props.events}
							userType={'parent'}
							approvedEvents={true}
							
							/>

				<EventsBox  showCreateEventButton={false} //Pending Events
							pendingEvents={this.props.pendingEvents}
							userType={'parent'}
							approvedEvents={false}
				/>

				

			</div>
			)
	}
})


				// <NotificationBox/>

export {ParentHomePage}
