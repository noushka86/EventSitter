require("babel/polyfill")

let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

console.log("jS loaded")
var self

var APP_ID = 'wXCq4PN1u7OGDCjyS4xkWMwTvIMlN8dfJKGkA4DE',
	JS_KEY = 'u3F2jXFkB1WZX44vRiGX7roenlOY8CadeGp4uzwi',
	REST_API_KEY = 'K4WIHPL5Q4eXxKnmyE1W2sqJUaU8E2Bcb8WLLaKI'


Parse.initialize(APP_ID,JS_KEY)

import {LandingPage} from "./LandingPage.js"
import {ParentFormPage} from "./ParentFormPage.js"
import {SitterFormPage} from "./SitterFormPage.js"


var SitterRouter=Backbone.Router.extend({
	routes:{
		'welcome':'showLandingPage',
		'parent':'showParentForm',
		'sitter':'showSitterForm'
	},



	showParentForm:function(){
		this.renderParentForm();
		self=this;
	},

	showSitterForm:function(){
		React.render(<SitterFormPage showButtons={true}/>,document.querySelector('#container'))
	},

	showLandingPage:function(){
		//(1) if a user is currently logged in I want to redirect him to 
		//MainViewParent/MainViewSitter
		React.render(<LandingPage showButtons={false}/>, document.querySelector('#container'))
	},


	showSignup:function(){
		React.render(<ParentFormPage showButtons={true} showLogin={this.showLogin} 
			showSignup={this.showSignup} signup={true} sendUserInfo={self.processUserInfo} />,document.querySelector('#container'))

	},

	showLogin:function(){
		React.render(<ParentFormPage showButtons={true} showLogin={this.showLogin} 
			showSignup={this.showSignup} signup={false} sendUserInfo={self.processUserInfo}/>,document.querySelector('#container'))

	},

	renderParentForm:function(){
		React.render(<ParentFormPage showButtons={true} showLogin={this.showLogin} 
			showSignup={this.showSignup} signup={true} sendUserInfo={this.processUserInfo}/>,document.querySelector('#container'))
	},

	processUserInfo:function(userInputObj, action){
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('email',userInputObj["email"])
		newUsr.set('password',userInputObj["password"])
		newUsr.set('type',userInputObj["type"])
		window.usr = newUsr
		console.log(action)
		if(action==='signUp'){
		newUsr.signUp().then(
			function(){
				alert('nice');
				location.hash=userInputObj["type"]+"/upcomingEvents"
		}
		)
	}
	else{
		newUsr.logIn().then(
			function(){
				alert('nice');
				location.hash=userInputObj["type"]+"/upcomingEvents"
		}
		)
	}

	},



initialize:function(){
		Backbone.history.start();
	}
})

var router=new SitterRouter();
