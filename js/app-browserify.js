require("babel/polyfill")

let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

console.log("jS loaded")
var self, selfSitter, selfParent;
var MYSITTERS;

var APP_ID = 'wXCq4PN1u7OGDCjyS4xkWMwTvIMlN8dfJKGkA4DE',
	JS_KEY = 'u3F2jXFkB1WZX44vRiGX7roenlOY8CadeGp4uzwi',
	REST_API_KEY = 'K4WIHPL5Q4eXxKnmyE1W2sqJUaU8E2Bcb8WLLaKI'


Parse.initialize(APP_ID,JS_KEY)

import {LandingPage} from "./LandingPage.js"
import {FormPage} from "./FormPage.js"
import {ParentHomePage} from "./ParentHomePage.js"
import {SitterHomePage} from "./SitterHomePage.js"
import {MySitters} from "./MySitters.js"
import {MyProfile} from "./MyProfile.js"

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



var InvitationCollection=Backbone.Collection.extend({

	url:function(){
		return "https://api.parse.com/1/classes/Invitation/?where=" + JSON.stringify(this.searchParams)
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch: function(){
		return this.fetch({
			headers: this.parseHeaders
		})
	},

	parse: function(response){
		console.log(response)
		return response.results
	}

})

var MySittersCollection=Backbone.Collection.extend({

	url:function(){
		return "https://api.parse.com/1/classes/Invitation/?where=" + JSON.stringify(this.searchParams)
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch: function(){
		return this.fetch({
			headers: this.parseHeaders
		})
	},

	// parse: function(response){
	// 	console.log(response)
	// 	return response.results
	// }

})

var NewEventsCollection=Backbone.Collection.extend({

	url:function(){
		return "https://api.parse.com/1/classes/Event/?where=" + JSON.stringify(this.searchParams)
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch: function(){
		return this.fetch({
			headers: this.parseHeaders
		})
	},

	parse: function(response){
		console.log(response)
		return response.results
	}

})

var ApprovedEventsCollection=Backbone.Collection.extend({
	url:function(){
		return "https://api.parse.com/1/classes/Event/?where=" + JSON.stringify(this.searchParams)
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch: function(){
		return this.fetch({
			headers: this.parseHeaders
		})
	},

	parse: function(response){
		console.log(response)
		return response.results
	}
})


var ProfileModel=Backbone.Model.extend({
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
		'parent/sitterSearch/:email':'findSitterByEmail',
		':type/myProfile':'showMyProfile'
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


		selfParent=this

		selfParent.aec.searchParams={claimed:true,parentUserName:Parse.User.current().get("username")}

		selfParent.aec.customFetch()

		
		selfParent.fetchMySitters();

		React.render(<ParentHomePage showButtons={false} 
									showCreateEventButton={true}
									sendEventDetails={selfParent.createEvent}
									events={selfParent.aec}
									/>,document.querySelector('#container'))
	},

	showSitterHome:function(){

		console.log('running show sitter home');
		selfSitter=this

		selfSitter.aec.searchParams={claimed:true,sitterUserName:Parse.User.current().get("username")}

		selfSitter.aec.customFetch()
		

		this.ic.searchParams={sitterId:Parse.User.current().id,
							  complete:false
							  }

		this.ic.customFetch()
		window.p=Parse
		window.n=this.nec

		this.nec.searchParams={listOfSitters:{$in:[Parse.User.current().get("username")]}, claimed:false}
		this.nec.customFetch()

		console.log(selfSitter.ic);

		React.render(<SitterHomePage showButtons={false} 
			showCreateEventButton={false}
			inviteNotifications={selfSitter.ic}
			newEventNotifications={this.nec}
			InvitationHandler={selfSitter.InvitationHandler}
			newEventHandler={selfSitter.newEventHandler}
			events={selfSitter.aec}
			/>, document.querySelector('#container'))

	},

	showMySitters:function(confirm){
		self=this
		React.render(<MySitters 
		showButtons={false}
		sitterModel={self.sm}
		showConfirm={confirm||false}
		sendInvitation={self.sendInvitation}
		mySittersList={self.msc}
							
		/>,document.querySelector('#container'))



	},


	

	showMyProfile:function(type){
		console.log("profile")
		console.log(type)
		React.render(<MyProfile showButtons={false}
								userType={type}
								/> , document.querySelector('#container'))

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
		this.sm.clear()
		var modelParams={email:email}
		this.sm.set(modelParams)
		var self=this
		this.sm.fetch({
			headers:self.sm.parseHeaders
		}).then(function(responseData){console.log(responseData)})
		this.sm.on("sync change",()=>this.showMySitters(true))

	},

	createEvent:function(eventObj){

		var event=new Parse.Object('Event')
			event.set("parentUserName",Parse.User.current().get("username"))
			event.set("title",eventObj["title"])
			event.set('date',eventObj["date"])
			event.set('time',eventObj["time"])
			event.set('listOfSitters',MYSITTERS)
			event.set('claimed',false)

			event.save().then(function(){
			alert('nice')
		})


	},	

sendInvitation:function(sitterId,sitterUsername,parentId){
		var invitation= new Parse.Object('Invitation')
		invitation.set("sitterId",sitterId)
		invitation.set("parentId",parentId)
		console.log(Parse.User.current().get('username'))
		invitation.set("from",Parse.User.current().get('username'))
		invitation.set("to",sitterUsername)
		invitation.set("complete",false)
		invitation.save().then(function(){
			alert('nice')
		})
		self.showMySitters(false)
	},


	InvitationHandler:function(ObjectId,action){
		console.log(this)
		if(action==='confirm'){
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId) // where targetId is the one you want 
			q.find().then(function(results){
				console.log(results[0])
				var invite = results[0]
				invite.set('complete',true)
				invite.save()
	}).done(function(){alert("The request has been confirmed")}).done(selfSitter.showSitterHome.bind(selfSitter))

		}

		else{
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId)
			q.find().then(function(results){
				var invite = results[0]
				invite.destroy()
				
	}).done(function(){alert("The request has been denied")}).done(selfSitter.showSitterHome.bind(selfSitter))
		}


	// selfSitter.ic.on("sync change",()=>this.showSitterHome())

	},


	newEventHandler:function(ObjectId,action){
		console.log(ObjectId)
		if(action==='confirm'){
			var q=new Parse.Query("Event")
			q.equalTo('objectId',ObjectId) // where targetId is the one you want 
			q.find().then(function(results){
				var event = results[0]
				window.e=event
				event.set('claimed',true)
				event.set('sitterUserName',Parse.User.current().get("username"))
				event.save()
	}).done(function(){alert("You have claimed this event")}).done(selfSitter.showSitterHome.bind(selfSitter))

		}

		else{
			var q=new Parse.Query("Event")
			q.equalTo('objectId',ObjectId)
			q.find().then(function(results){
				var event = results[0]
				event.remove('listOfSitters',Parse.User.current().get("username"))
				event.save()
				
	}).done(function(){alert("The request has been denied")}).done(selfSitter.showSitterHome.bind(selfSitter))
		}

	},

fetchMySitters:function(){
	var self=this;
	this.msc.searchParams={complete:true,
							parentId:Parse.User.current().id
							}


		this.msc.customFetch().done(function(){
		var sitters=self.msc.models[0].attributes.results
			MYSITTERS=sitters.map(function(sitter){
				return sitter["to"]
						
					})
		})

	},



initialize:function(){
		this.sm=new SitterModel();
		this.ic=new InvitationCollection();
		this.msc=new MySittersCollection();
		this.nec=new NewEventsCollection();
		this.aec=new ApprovedEventsCollection();
		Backbone.history.start();
	}
})

var router=new SitterRouter();
