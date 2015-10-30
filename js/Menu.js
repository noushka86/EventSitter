let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var Menu=React.createClass({
	
	_logUserOut:function(){
		Parse.User.logOut().then(
			function(){
				location.hash = "welcome"
			})

	},

	render:function(){
		var group, hrefGroup;
		if(this.props.userType==='parent'){
		 	group="My Sitters"
		 	hrefGroup="#MySitters"
		}
		else{
			group="My Parents"
			hrefGroup="#MyParents"
		} 

		return(
			<div id="Menu">
				<a href="#parent/home" id="home">Home</a>
				<a href={hrefGroup} >{group}</a>
				<a href="#MyProfile">My Profile</a>
				<p onClick={this._logUserOut}>Log out</p>
			</div>
			)
	}
})

export {Menu}