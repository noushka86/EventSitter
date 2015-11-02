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
		var group, hrefGroup, hrefHome, hrefProfile;
		if(this.props.userType==='parent'){
		 	group="My Sitters"
		 	hrefGroup="#MySitters"
		 	hrefHome="#parent/home"
		 	hrefProfile="#parent/myProfile"
		}
		else{
			group="My Parents"
			hrefGroup="#MyParents"
			hrefHome="#sitter/home"
			hrefProfile="#sitter/myProfile"

		} 

		return(
			<div id="Menu">
				<a href={hrefHome} id="home">Home</a>
				<a href={hrefGroup} >{group}</a>
				<a href={hrefProfile}>My Profile</a>
				<p onClick={this._logUserOut}>Log out</p>
			</div>
			)
	}
})

export {Menu}