require("babel/polyfill")

require('isomorphic-fetch')

let React = require('react'),
	ReactDOM = require('react-dom'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

// HELPERS
console.log('is anybody there?')
window.jquery = $
window.Parse = Parse

// // GLOBAL VARIABLE
var MYSITTERS;

//GOOGLE GEOCODE
window.google = google
var GEO='AIzaSyD9cp_vbWmt7vYuFs4GQido4sB7xMNfzYc'

// PARSE API
var APP_ID = 'wXCq4PN1u7OGDCjyS4xkWMwTvIMlN8dfJKGkA4DE',
	JS_KEY = 'u3F2jXFkB1WZX44vRiGX7roenlOY8CadeGp4uzwi',
	REST_API_KEY = 'K4WIHPL5Q4eXxKnmyE1W2sqJUaU8E2Bcb8WLLaKI'
	
Parse.initialize(APP_ID,JS_KEY)



// REACT COMPONENTS IMPORTS
import {LandingPage} from "./LandingPage.js"
import {FormPage} from "./FormPage.js"
import {ParentHomePage} from "./ParentHomePage.js"
import {SitterHomePage} from "./SitterHomePage.js"
import {MySitters} from "./MySitters.js"
import {MyProfile} from "./MyProfile.js"
import {MyParents} from "./MyParents.js"

//********************************* MODELS/COLLECTIONS *********************************//


// SITTER
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

})



//INVITATIONS
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


//EVENTS
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

// PROFILE
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







//********************************* END OF MODELS/COLLECTIONS *********************************//


//********************************* ROUTER *********************************//


//Backbone's router constructor

var SmartSitRouter=Backbone.Router.extend({

	routes:{
		'welcome':'showLandingPage',
		'invite/:type':'showForm',
		'parent/home':'showParentHome',
		'sitter/home':'showSitterHome',
		'MySitters':'showMySitters',
		'MyParents':'showMyParents',
		'parent/sitterSearch/:email':'findSitterByEmail',
		':type/myProfile':'showMyProfile',
		'*default':'changeHash'
	},

	showLandingPage:function(){
		//add in the future:(1) if a user is currently logged in I want to redirect him to 
		//MainViewParent/MainViewSitter without showing the landing page

		ReactDOM.render(<LandingPage showButtons={false} //showButtons for the upper panel
			/>, document.querySelector('#container'))
	},

	showForm:function(type){
		ReactDOM.render(<FormPage
						showButtons={true} // showButtons for the upper panel
						sendUserInfo={this.processUserInfo} // passing a reference to a function on the router that processes the user's login information with the info that comes from the React component
															
						userType={type}
					/>,
					document.querySelector('#container'))
	},


	fetchParentCollections: function() {
		// set search parameters
		// console.log('fetching parent collections')
		
		// Approved Events Collection
		this.aec.searchParams = {claimed:true,parentUserName:Parse.User.current().get("username")}
		//Approved Invitations Collection
		this.aic.searchParams={complete:true, seenByParent:false,
										from:Parse.User.current().get("username")}
		//Pending Events
		this.pec.searchParams={claimed:false,parentUserName:Parse.User.current().get("username")}

		// do fetches
		this.aec.customFetch({include:'sitterWhoClaimed'})
		this.aic.customFetch({include:'sitter'});
		this.pec.customFetch({include:'listOfDenials'})
	},

	showParentHome:function(){
		// selfParent=this
		this.fetchMySitters();
		this.fetchParentCollections();

		ReactDOM.render(<ParentHomePage showButtons={false} 
									showCreateEventButton={true} 
									sendEventDetails={this.createEvent.bind(this)} //passing a function that lives on the router and it's job is to create an event on Parse with the info from the React component
									events={this.aec}// shows a list of the approved and claimed events
									approvedInvitationBySitter={this.aic} // shows a list of the approved invitations of sitters.
									seenByParent={this.seenByParent.bind(this)} //passing a function that lives on the router and checks the 'seenByParent' column from true to false. so ater the parent clicks on the 'X', he wont see the notification again.

									pendingEvents={this.pec}
									logoutUser={this.logoutUser.bind(this)}
									/>,document.querySelector('#container'))
	},

	showSitterHome:function(){
		// selfSitter=this
		this.fetchSitterCollections()
		ReactDOM.render(
			<SitterHomePage showButtons={false} 
					showCreateEventButton={false}
					inviteNotifications={this.ic}
					newEventNotifications={this.nec}
					InvitationHandler={this.InvitationHandler.bind(this)}
					newEventHandler={this.newEventHandler.bind(this)}
					events={this.aec}
					logoutUser={this.logoutUser.bind(this)}
					/>, document.querySelector('#container'))

	},

	showMySitters:function(confirm){
		// self=this
		this.fetchMySitters()
		ReactDOM.render(<MySitters 
		showButtons={false}
		sitterModel={this.sm}
		showConfirm={confirm||false}
		sendInvitation={this.sendInvitation.bind(this)}
		mySittersList={this.msc}
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


	changeHash:function(){
		location.hash="welcome";
	},


	//////////////END OF ROUTES/////////////////



	//////////////FUNCTIONS/////////////////


	processUserInfo:function(userInputObj, action){	 //processes the user info and makes the LOGIN or the SIGNUP	
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('password',userInputObj["password"])


		var ajaxParams={
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userInputObj["address"]}`

		}

		if(action==='signUp') {
			newUsr.set('email',userInputObj["email"])
			newUsr.set('type',userInputObj["type"])
			newUsr.set('firstName',userInputObj["firstName"])
			newUsr.set('lastName',userInputObj["lastName"])
			newUsr.set('phone',userInputObj["phone"])
			newUsr.set('address',userInputObj["address"])

			$.ajax(ajaxParams).then(
				(responseData)=>{
					var loc = responseData.results[0].geometry.location;
		       		var lat = loc.lat,
		            	lng = loc.lng;

		            // console.log(lat,lng)
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


	

	fetchSitterCollections: function() { //fetches all the sitters a parent have
		// set search parameters
		// console.log('fetching sitter collections')
		this.aec.searchParams={claimed:true,sitterUserName:Parse.User.current().get("username")}
		this.ic.searchParams={sitterId:Parse.User.current().id, complete:false}
		this.nec.searchParams={listOfSitters:{$in:[Parse.User.current().get("username")]}, claimed:false}
		
		// do fetches
		this.aec.customFetch({include:'parent'})
		this.ic.customFetch({include:'parent'})
		this.nec.customFetch({include:'parent'})
	},



	

	createEvent:function(eventObj){ // creates a baby-sitting event with the details from the user and saves it 									to Parse
		var self=this;
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
			self.showParentHome()	
		})


	},

	sendInvitation:function(sitterId,sitterUsername,parentId){ // the parent creates a row in the invitations table with the column complete=false.																	
		var self=this
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


	InvitationHandler:function(ObjectId,action){ // the sitter approves or declines the connection request from the parent
		var self=this
		if(action==='confirm'){
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId) // where targetId is the one you want 
			q.find().then(function(results){
				var invite = results[0]
				invite.set('complete',true)
				invite.set('sitter', Parse.User.current())
				invite.save()
			}).done(function(){
				self.showSitterHome()
			})

		} else {
			var q=new Parse.Query("Invitation")
			q.equalTo('objectId',ObjectId)
			q.find().then(function(results){
				var invite = results[0]
				invite.destroy()
			}).done(function(){
				self.showSitterHome()
			})
		}
	},


	newEventHandler:function(ObjectId,action){ //the sitter claims or declines the babysitiing event
		var self=this
		console.log(this,'XXXXXXXXXXXXX');

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
			}).done(function(){self.showSitterHome()})
		} 

		else {
			var q = new Parse.Query("Event")
			q.equalTo('objectId', ObjectId)
			q.find().then(function(results) {
            var event = results[0]
            event.remove('listOfSitters', Parse.User.current().get("username"))
            event.add('listOfDenials', Parse.User.current())
            event.save()
			}).done(function(){
				alert("The request has been denied")
			}).done(function(){
				self.showSitterHome()
			})
		}
	},

	seenByParent: function(objectId) { //a function that checks true in the 'seenByParent' column and the parent wont see the aproval notification.
		var self=this;
        var q = new Parse.Query('Invitation')
        q.equalTo('objectId', objectId)
        q.find().then(function(results) {
            var invitation = results[0]
            invitation.set('seenByParent', true)
            invitation.save()
        }).done(function(){self.showParentHome()})
    },


    updateProfile: function(profileObj) { //updates the profile of both parent and sitter
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


	fetchMySitters:function() {  // fetches the list of sitters the parent has from the Invitation table.
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
		this.sm=new SitterModel();// sm=sitter model => fetches the sitter's info
 
		this.ic=new InvitationCollection();//ic=invitation collection=> fetches the invitation collection
		
		this.msc=new InvitationCollection();// msc=my sitters collection=> fetches the sitters for the current parent

		this.nec=new EventsCollection();//nec=new events collection=> fetches the new events that havent been claimed

		this.aec=new EventsCollection();//aec=approved events collection=> fetches the events that have been claimed and approved by a sitter

		this.aic=new InvitationCollection();//aic=approved invitations collection=> fetches the parent's invitation of a sitter that has been approved by the sitter.

		this.pec=new EventsCollection();//pec=pending events collection=> fetches the pending events
		 
		this.mpc=new InvitationCollection();//mpc=my parents collection=> fetches the parents list for every sitter
		 
		this.prfm=new ProfileModel();//prfm=profile model=> fetches the personal info for parent and sitter
		
		Backbone.history.start();//starts the Backbone's work

	}
})

//new router object
var router=new SmartSitRouter();
router.fetchIntervalId = null


// setting up fixed-interval polling of server data
//Backbone's event on route change:
router.on('route',function(functionName){
	// console.log('hash changed with resulting function ' + functionName)
	// console.log('clearing interval ' + router.fetchIntervalId)
	clearInterval(router.fetchIntervalId)
	if (functionName =='showParentHome') {
		router.fetchIntervalId = setInterval(router.fetchParentCollections.bind(router),5000)
	}
	if (functionName =='showSitterHome') {
		router.fetchIntervalId = setInterval(router.fetchSitterCollections.bind(router),5000)
	}
})
