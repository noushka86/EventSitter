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
				<Menu userType={this.props.userType}/>
			</div>
			)
	}
})

export {MyProfile}