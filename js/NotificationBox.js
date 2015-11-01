let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var NotificationBox=React.createClass({
	
	_createNotification:function(notificationObj){
		return (<Notification data={notificationObj} 
								key={notificationObj.parentId}
								InvitationHandler={this.props.InvitationHandler}
								/>)
	},

	render:function(){
		console.log('notifications');
		console.log(this.props.notifications)

		var notifications=this.props.notifications.models[0].attributes.results

		return(
			<div id="NotificationBox">
				<label>Notifications</label>
				<div id="NBox">
					{notifications.map(this._createNotification)}
				</div>
			</div>
			)
	}
})



var Notification=React.createClass({

	_confirm:function(){
		this.props.InvitationHandler(this.props.data.objectId,"confirm")
		
		
	},

	_deny:function(){
		this.props.InvitationHandler(this.props.data.objectId,"deny")
	},

	render:function(){
	
		return(
			<div>
				<p>{this.props.data.from} added you as a sitter</p>
				<button onClick={this._deny}>{"\u2715"}</button>
				<button onClick={this._confirm}>{"\u2713"}</button>
				
			</div>
			)
	}
})


export {NotificationBox}