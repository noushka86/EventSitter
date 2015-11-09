let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"

var MyProfile=React.createClass({
	render:function(){

		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={this.props.userType} currentUser={this.props.currentUser}/>
				<ProfileForm />
				
			</div>
			)
	}
})

var ProfileForm=React.createClass({
	render:function(){
		return(
			<div id="ProfileForm">
				<input type="text" placeholder="first name"/>
				<input type="text" placeholder="last name"/>
				<input type="text" placeholder="address"/>
				<input type="text" placeholder="phone"/>

				<button>update</button>
			</div>


			)
	}
})

export {MyProfile}