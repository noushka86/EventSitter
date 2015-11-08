let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var NotificationBox=React.createClass({
	

	_createInviteNotification:function(notificationObj){
		
		return (<InviteNotification data={notificationObj.attributes} 
								key={notificationObj.parentId}
								InvitationHandler={this.props.InvitationHandler}
								/>)
	},

	_createNewEventNotification:function(notificationObj){
		return (<NewEventNotification data={notificationObj.attributes} 
								key={notificationObj.objectId}
								newEventHandler={this.props.newEventHandler}
								/>)
	},

	render:function(){
		// console.log('notifications');
		// console.log(this.props.notifications)

		var inviteNotifications=this.props.inviteNotifications.models,
			newEventNotifications=this.props.newEventNotifications.models

			// console.log(this.props.newEventNotifications)


		return(
			<div id="NotificationBox">
				<label>Notifications</label>
				<div id="NBox">
					{inviteNotifications.map(this._createInviteNotification)}
					{newEventNotifications.map(this._createNewEventNotification)}
				</div>
			</div>
			)
	}
})



var InviteNotification=React.createClass({

	_confirm:function(){
		this.props.InvitationHandler(this.props.data.objectId,"confirm")
		
		
	},

	_deny:function(){
		this.props.InvitationHandler(this.props.data.objectId,"deny")
	},

	render:function(){

		return(
			<div>
				<p>{this.props.data.parent.firstName} {this.props.data.parent.lastName} added you as a sitter</p>
				<button onClick={this._deny}>{"\u2715"}</button>
				<button onClick={this._confirm}>{"\u2713"}</button>
				
			</div>
			)
	}
})

var NewEventNotification=React.createClass({

	_confirm:function(){
		this.props.newEventHandler(this.props.data.objectId,"confirm")
		
		
	},

	_deny:function(){
		this.props.newEventHandler(this.props.data.objectId,"deny")
	},

	render:function(){
		return(
			<div>
				<p>{this.props.data.parent.firstName} {this.props.data.parent.lastName}
				requested a sitter on {this.props.data.date} at {this.props.data.time}</p>
				<button onClick={this._deny}>{"\u2715"}</button>
				<button onClick={this._confirm}>{"\u2713"}</button>
				
			</div>
			)
	}
})


export {NotificationBox}