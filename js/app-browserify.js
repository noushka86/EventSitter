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
import {SitterHomePage} from "./SitterHomePage.js"
import {MySitters} from "./MySitters.js"

var SitterModel=Backbone.Model.extend({
	url: function(){//params>>{email:email}
		return "https://api.parse.com/1/users/?where=" + JSON.stringify(this.attributes)
	},
	
	defaults: {
		email: ''
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	// parse:function(responseData){
	// 	return responseData.results[0]

	// }


})


var SitterRouter=Backbone.Router.extend({
	routes:{
		'welcome':'showLandingPage',
		'invite/:type':'showForm',
		'parent/home':'showParentHome',
		'sitter/home':'showSitterHome',
		'MySitters':'showMySitters',
		'parent/sitterSearch/:email':'findSitterByEmail'
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

	showSitterHome:function(){
		React.render(<SitterHomePage showButtons={false}/>, document.querySelector('#container'))
	},

	showMySitters:function(confirm){
		// console.log('running show my sitters')
		self=this
		React.render(<MySitters 
						showButtons={false}
						sitterModel={this.sm}
						showConfirm={confirm||false}
						sendInvitation={this.sendInvitation}
						/>,
						 document.querySelector('#container'))
	},

	processUserInfo:function(userInputObj, action){
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('email',userInputObj["email"])
		newUsr.set('password',userInputObj["password"])
		newUsr.set('type',userInputObj["type"])
		window.usr = newUsr
		// console.log(action)
		if(action==='signUp') {
		newUsr.signUp().then(
			function(){
				alert('nice');
				location.hash=userInputObj["type"]+"/home"
			}).fail(function(err){
				console.log(err)
				Parse.User.logOut()
			})
		}
		else {
			newUsr.logIn().then(
				function(){
					alert('nice');
					location.hash=userInputObj["type"]+"/home"
			}).fail(function(err){
				console.log(err)
			})
		}
	},

findSitterByEmail: function(email){
		
		window.s=this.sm
		var modelParams={email:email}
		this.sm.set(modelParams)
		var self=this
		this.sm.fetch({
			headers:self.sm.parseHeaders
		}).then(function(responseData){console.log(responseData)})
		this.sm.on("sync change",()=>this.showMySitters(true))

	},

sendInvitation:function(sitterId,parentId){
		// console.log(sitterId,parentId)
		// var p=window.Parse

		var invitation= new Parse.Object('Invitation')
		invitation.set("sitterId",sitterId)
		invitation.set("parentId",parentId)
		console.log(Parse.User.current().get('username'))
		invitation.set("from",Parse.User.current().get('username'))
		invitation.set("complete",false)
		invitation.save().then(function(){
			alert('nice')
		})
		self.showMySitters(false)
	},

initialize:function(){
		this.sm=new SitterModel();
		Backbone.history.start();
	}
})

var router=new SitterRouter();
