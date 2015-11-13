require("babel/polyfill")

require('isomorphic-fetch')

let React = require('react'),
	ReactDOM = require('react-dom'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

console.log('is anybody there?')
window.jquery = $

var self, selfSitter, selfParent;
var MYSITTERS, CURRENTUSER;

window.google = google

var APP_ID = 'wXCq4PN1u7OGDCjyS4xkWMwTvIMlN8dfJKGkA4DE',
	JS_KEY = 'u3F2jXFkB1WZX44vRiGX7roenlOY8CadeGp4uzwi',
	REST_API_KEY = 'K4WIHPL5Q4eXxKnmyE1W2sqJUaU8E2Bcb8WLLaKI',
	GEO='AIzaSyD9cp_vbWmt7vYuFs4GQido4sB7xMNfzYc'

Parse.initialize(APP_ID,JS_KEY)

window.Parse = Parse

import {LandingPage} from "./LandingPage.js"
import {FormPage} from "./FormPage.js"
import {ParentHomePage} from "./ParentHomePage.js"
import {SitterHomePage} from "./SitterHomePage.js"
import {MySitters} from "./MySitters.js"
import {MyProfile} from "./MyProfile.js"
import {MyParents} from "./MyParents.js"

var SitterModel=Backbone.Model.extend({
	url: function(){
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

	customFetch: function(data){
		if (data) {
			return this.fetch({
				headers: this.parseHeaders,
				data: data
			})
		}

		return this.fetch({
			headers: this.parseHeaders,
		})
	},

	parse: function(response){
		window.invitationResponse = response
		return response.results
	}

})


var EventsCollection=Backbone.Collection.extend({

	url:function(){
		return "https://api.parse.com/1/classes/Event/?where=" + JSON.stringify(this.searchParams)
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch: function(data){
		if (data) {
			return this.fetch({
				headers: this.parseHeaders,
				data: data
			})
		}

		return this.fetch({
			headers: this.parseHeaders,
		})
	},

	parse: function(response){
		return response.results
	}

})



var ProfileModel=Backbone.Model.extend({
	url: function(){
		return "https://api.parse.com/1/users/?where=" + JSON.stringify(this.searchParams)
	},
	

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	customFetch:function(){
	var self=this	
		return this.fetch({
			headers: self.parseHeaders,
		})
	},

	parse:function(responseData){
		return responseData.results[0]

	}


})



var SitterRouter=Backbone.Router.extend({
	routes:{
		'invite/:type':'showForm',
		'parent/home':'showParentHome',
		'sitter/home':'showSitterHome',
		'MySitters':'showMySitters',
		'MyParents':'showMyParents',
		'parent/sitterSearch/:email':'findSitterByEmail',
		':type/myProfile':'showMyProfile',
		'*default':'showLandingPage'
	},

	fetchParentCollections: function() {
		// set search parameters
		console.log('fetching parent collections')
		this.aec.searchParams = {claimed:true,parentUserName:Parse.User.current().get("username")}
		this.aic.searchParams={complete:true, seenByParent:false,
										from:Parse.User.current().get("username")}
		this.pec.searchParams={claimed:false,parentUserName:Parse.User.current().get("username")}

		// do fetches
		this.aec.customFetch({include:'sitterWhoClaimed'})
		this.aic.customFetch({include:'sitter'});
		this.pec.customFetch({include:'listOfDenials'})
	},

	fetchSitterCollections: function() {
		console.log('fetching sitter collections')
		this.aec.searchParams={claimed:true,sitterUserName:Parse.User.current().get("username")}
		this.ic.searchParams={sitterId:Parse.User.current().id, complete:false}
		this.nec.searchParams={listOfSitters:{$in:[Parse.User.current().get("username")]}, claimed:false}

		this.aec.customFetch({include:'parent'})
		this.ic.customFetch({include:'parent'})
		this.nec.customFetch({include:'parent'})
	},

	showLandingPage:function(){
		//add:(1) if a user is currently logged in I want to redirect him to 
		//MainViewParent/MainViewSitter
		ReactDOM.render(<LandingPage showButtons={false}/>, document.querySelector('#container'))
	},

	showForm:function(type){
		
		ReactDOM.render(<FormPage 
						showButtons={true} 
						sendUserInfo={this.processUserInfo}
						userType={type}
					/>,
					document.querySelector('#container'))
	},

	showParentHome:function(){
		

		selfParent=this
		selfParent.fetchMySitters();

		this.fetchParentCollections();

		ReactDOM.render(<ParentHomePage showButtons={false} 
									showCreateEventButton={true}
									sendEventDetails={selfParent.createEvent}
									events={selfParent.aec}
									approvedInvitationBySitter={this.aic}
									seenByParent={this.seenByParent}
									pendingEvents={selfParent.pec}
									logoutUser={this.logoutUser.bind(this)}
									/>,document.querySelector('#container'))
	},

	showSitterHome:function(){
	
		selfSitter=this
	
		this.fetchSitterCollections()
		
		ReactDOM.render(
			<SitterHomePage showButtons={false} 
					showCreateEventButton={false}
					inviteNotifications={selfSitter.ic}
					newEventNotifications={selfSitter.nec}
					InvitationHandler={selfSitter.InvitationHandler}
					newEventHandler={selfSitter.newEventHandler}
					events={selfSitter.aec}
					logoutUser={this.logoutUser.bind(this)}
					/>, document.querySelector('#container'))

	},

	showMySitters:function(confirm){
		self=this
		self.fetchMySitters()

		ReactDOM.render(<MySitters 
		showButtons={false}
		sitterModel={self.sm}
		showConfirm={confirm||false}
		sendInvitation={self.sendInvitation}
		mySittersList={self.msc}
		logoutUser={this.logoutUser.bind(this)}
							
		/>,document.querySelector('#container'))
	},

	showMyParents:function(){
		this.mpc.searchParams={complete:true,sitterId:Parse.User.current().id}
		this.mpc.customFetch({include:'parent'})
		ReactDOM.render(<MyParents showButtons={false}
								myParentsList={this.mpc}
								logoutUser={this.logoutUser.bind(this)}/>,
						document.querySelector('#container'))
	},

	showMyProfile:function(type){

		var self=this
		this.prfm.searchParams={objectId:Parse.User.current().id}
		this.prfm.customFetch()
		ReactDOM.render(<MyProfile showButtons={false}
								userType={type}
								profile={this.prfm}
								updateProfile={this.updateProfile}
								logoutUser={this.logoutUser.bind(this)}
								/> , document.querySelector('#container'))
	},

	processUserInfo:function(userInputObj, action){		
		
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('email',userInputObj["email"])
		newUsr.set('password',userInputObj["password"])
		newUsr.set('type',userInputObj["type"])
		newUsr.set('firstName',userInputObj["firstName"])
		newUsr.set('lastName',userInputObj["lastName"])
		newUsr.set('phone',userInputObj["phone"])
		newUsr.set('address',userInputObj["address"])

		var ajaxParams={
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userInputObj["address"]}`

		}

		if(action==='signUp') {

			$.ajax(ajaxParams).then(
				(responseData)=>{
					var loc = responseData.results[0].geometry.location;
		       		var lat = loc.lat,
		            	lng = loc.lng;

		            console.log(lat,lng)
					newUsr.set('latlon',{'lat':lat,'lng':lng})
					return newUsr.signUp()
				}
			).then(()=>{
				alert('You are signed up');
				location.hash=userInputObj["type"]+"/home"
				})
			}	
		
		else {
			newUsr.logIn().then(
				function(){
					alert('You are logged in');
					location.hash=userInputObj["type"]+"/home"
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
		})
		this.sm.on("sync update",()=>this.showMySitters(true))
	},

	createEvent:function(eventObj){
		var event=new Parse.Object('Event')
		event.set("parentUserName",Parse.User.current().get("username"))
		event.set("title",eventObj["title"])
		event.set('date',eventObj["date"])
		event.set('startTime',eventObj["startTime"])
		event.set('endTime',eventObj["endTime"])
		event.set('listOfSitters',MYSITTERS)
		event.set('claimed',false)
		event.set('sitterWhoClaimed',null)
		event.set('parent',Parse.User.current())
		event.set('listOfDenials',[])

		event.save().then(function(){
			selfParent.showParentHome()	
		})


	},

	sendInvitation:function(sitterId,sitterUsername,parentId){
		var invitation= new Parse.Object('Invitation')
		invitation.set("sitterId",sitterId)//check if I can delete it
		invitation.set("parentId",parentId)//check if I can delete it
		invitation.set("from",Parse.User.current().get('username'))
		invitation.set("to",sitterUsername)
		invitation.set("complete",false)
		invitation.set("seenByParent",false)
		invitation.set("parent",Parse.User.current())
		invitation.save().then(function(){
			alert('Invitation Sent')
		})
		self.showMySitters(false)
	},


	InvitationHandler:function(ObjectId,action){
		if(action==='confirm'){
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId) // where targetId is the one you want 
			q.find().then(function(results){
				var invite = results[0]
				invite.set('complete',true)
				invite.set('sitter', Parse.User.current())
				invite.save()
			}).done(function(){
				selfSitter.showSitterHome()
			})

		} else {
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId)
			q.find().then(function(results){
				var invite = results[0]
				invite.destroy()
			}).done(function(){
				selfSitter.showSitterHome()
			})
		}
	},
	newEventHandler:function(ObjectId,action){
		if(action==='confirm'){
			var q=new Parse.Query("Event")
			q.equalTo('objectId',ObjectId) // where targetId is the one you want 
			q.find().then(function(results){
				var event = results[0]
				window.e=event
				event.set('claimed',true)
				event.set('sitterWhoClaimed',Parse.User.current())
				event.set('sitterUserName',Parse.User.current().get("username"))
				event.save()
			}).done(function(){
				alert("You have claimed this event")
			}).done(selfSitter.showSitterHome.bind(selfSitter))
		} else {
			var q = new Parse.Query("Event")
			q.equalTo('objectId', ObjectId)
			q.find().then(function(results) {
            var event = results[0]
            event.remove('listOfSitters', Parse.User.current().get("username"))
            event.add('listOfDenials', Parse.User.current())
            event.save()
			}).done(function(){
				alert("The request has been denied")
			}).done(
				selfSitter.showSitterHome.bind(selfSitter))
		}
	},

	seenByParent: function(objectId) {
        var q = new Parse.Query('Invitation')
        q.equalTo('objectId', objectId)
        q.find().then(function(results) {
            var invitation = results[0]
            invitation.set('seenByParent', true)
            invitation.save()
        }).done(selfParent.showParentHome.bind(selfParent))
    },

    updateProfile: function(profileObj) {
        var self = this
        

        var q = new Parse.Query('User')
        q.equalTo('objectId', Parse.User.current().id)
        q.find().then(function(results) {
            var usr = results[0]
            usr.set('firstName', profileObj['firstName'])
            usr.set('lastName', profileObj['lastName'])
            usr.set('email', profileObj['email'])
            usr.set('phone', profileObj['phone'])
            usr.set('address', profileObj['address'])
            usr.save()
        }).done(() => alert('you have updated your profile successfully'))
    },

	fetchMySitters:function() {
	    var self = this;
	    this.msc.searchParams = {
	        complete: true,
	        parentId: Parse.User.current().id
	    }
	    this.msc.customFetch({
	        include: 'sitter'
	    }).done(function() {
	        var sitters = self.msc.models
	        MYSITTERS = sitters.map(function(sitter) {
	            return sitter.attributes["to"]

	        })
	    })

	},


	logoutUser:function(){
		

		Parse.User.logOut().then(
			function(){
				location.hash = "welcome"
			})
		
	},

	initialize:function(){
		this.sm=new SitterModel();
		this.ic=new InvitationCollection();
		this.msc=new InvitationCollection();
		this.nec=new EventsCollection();
		this.aec=new EventsCollection();
		this.aic=new InvitationCollection();
		this.pec=new EventsCollection();
		this.mpc=new InvitationCollection();
		this.prfm=new ProfileModel();
		Backbone.history.start();
	}
})


var router=new SitterRouter();
router.fetchIntervalId = null


// setting up fixed-interval polling of server data

router.on('route',function(functionName){
	console.log('hash changed with resulting function ' + functionName)
	console.log('clearing interval ' + router.fetchIntervalId)
	clearInterval(router.fetchIntervalId)
	if (functionName =='showParentHome') {
		router.fetchIntervalId = setInterval(router.fetchParentCollections.bind(router),5000)
	}
	if (functionName =='showSitterHome') {
		router.fetchIntervalId = setInterval(router.fetchSitterCollections.bind(router),5000)
	}
})
