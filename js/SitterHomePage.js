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
	render:function(){
		var userType="sitter"
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}/>
				<InfoBox notifications={this.props.notifications}
							InvitationHandler={this.props.InvitationHandler}
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
				<NotificationBox notifications={this.props.notifications}
									InvitationHandler={this.props.InvitationHandler}
				/>
			</div>
			)
	}
})
export {SitterHomePage}