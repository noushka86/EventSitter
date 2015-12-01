let React = require('react')

var PrntNotificationBox=React.createClass({

	_createApprovedInvitation:function(notificationObj){
		return (<ApprovedInvitation data={notificationObj.attributes} 
								key={notificationObj.attributes.objectId}
								seenByParent={this.props.seenByParent}

								/>
								)
	},

	render:function(){
	
		var appInv=this.props.approvedInvitationBySitter.models
		return(
			<div id="NotificationBox">
				<label>Notifications</label>
				<div id="NBox">
					{appInv.map(this._createApprovedInvitation)}
				</div>
			</div>
			)
	}
})



var ApprovedInvitation=React.createClass({
	_seen:function(){
		this.props.seenByParent(this.props.data.objectId)
	},

	render:function(){
		
		return(
			<div>
				<p>{this.props.data.sitter.firstName} {this.props.data.sitter.lastName} approved your request to connect</p>
				<button onClick={this._seen}>{"\u2715"}</button>
			</div>
			)
	}
})











export {PrntNotificationBox}