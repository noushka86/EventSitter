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
import {FormPage} from "./FormPage.js"
import {ParentHomePage} from "./ParentHomePage.js"


var SitterRouter=Backbone.Router.extend({
	routes:{
		'welcome':'showLandingPage',
		'invite/:type':'showForm',
		'parent/home':'showParentHome',
	},


	showLandingPage:function(){
		//add:(1) if a user is currently logged in I want to redirect him to 
		//MainViewParent/MainViewSitter
		React.render(<LandingPage showButtons={false}/>, document.querySelector('#container'))
	},

	

	showForm:function(type){
		console.log(type)
		React.render(<FormPage 
						showButtons={true} 
						sendUserInfo={this.processUserInfo}
						userType={type}
					/>,
						document.querySelector('#container'))
	},

	showParentHome:function(){
		React.render(<ParentHomePage showButtons={false}/>,document.querySelector('#container'))
	},


	processUserInfo:function(userInputObj, action){
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('email',userInputObj["email"])
		newUsr.set('password',userInputObj["password"])
		newUsr.set('type',userInputObj["type"])
		window.usr = newUsr
		console.log(action)
		if(action==='signUp') {
		newUsr.signUp().then(
			function(){
				alert('nice');
				location.hash=userInputObj["type"]+"/home"
			})
		}
		else {
			newUsr.logIn().then(
				function(){
					alert('nice');
					location.hash=userInputObj["type"]+"/home"
				})
			}
		},



initialize:function(){
		Backbone.history.start();
	}
})

var router=new SitterRouter();
