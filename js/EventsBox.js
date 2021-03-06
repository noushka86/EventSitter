let React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var EventsBox=React.createClass({

	changeState:function(state){
		this.setState({showEventForm:state})
	},

	getInitialState:function(){
		return{
			showEventForm:false
		}

	},

	_clickHandler:function(){
		// location.hash="parent/createNewEvent"
		// this.props.createEvent()
		this.setState({showEventForm:true})

	},

	_createEvent:function(eventObj){
		return(<Event data={eventObj.attributes}
						key={eventObj.attributes.objectId}
						userType={this.props.userType}
						approvedEvents={this.props.approvedEvents}
						/>)
	},

	render:function(){

		var events,title

		if(this.props.approvedEvents){
			events=this.props.events.models
			title="Claimed Events"
		}

		else{ 
			events=this.props.pendingEvents.models
			title="Unclaimed Events"
		}
		// 
		var styleObj={},
			userHeader="",
			eventNameStyleObj={}

		if(!this.props.showCreateEventButton && !this.props.approvedEvents) // (Pending Events - only in the parent)
		{
			styleObj={
				display:'none'
			}
			userHeader="Declined By"
		}

		else if(this.props.showCreateEventButton){ // (Approved Events and the current user logged is the parent)
			userHeader="Sitter"
		}
		
		else{  							// (Approved Events and the current user logged is the sitter)
			styleObj={
				display:'none'
			}
			userHeader="Parent"
			eventNameStyleObj={display:'none'}
		}

		


		return(
			<div id="EventsBox">
				<label>{title}</label>
				<button id="newEvent" onClick={this._clickHandler} 
				style={styleObj}>{"\u2795"}</button>

				<EventForm show={this.state.showEventForm}     
							changeState={this.changeState}
							sendEventDetails={this.props.sendEventDetails}
							/>

			<div id="EBox">
				<div id="Event">
					<p style={eventNameStyleObj} className="header">Event Name</p> 
					<p className="header">{userHeader}</p> 
					<p className="header">Date</p>
					<p className="header"> Start Time</p>
					<p className="header"> End Time</p>
				</div>
						{events.map(this._createEvent)}
				</div>
			</div>
			
			)
	}
})




var EventForm=React.createClass({

	componentDidMount:function(){
			this.eventDetails={
				title:null,
				date:null,
				startTime:null,
				endTime:null
			}
		},

	_cancel:function(){
		
		this.props.changeState(false)
		this._clearForm()
	},


	_validateInput: function(e){
    		// after the user clicks the button ' SUBMIT EVENT'
    		var name=e.target.name, 
    			value=e.target.value
    			if(name==='startTime'|| name==='endTime'){
    				var hours=e.target.value.slice(0,2),
    					suffix = (hours >= 12)? 'PM' : 'AM',
    				 	t=(parseInt(e.target.value.slice(0,2))+11)%12+1

    					value= t+':'+e.target.value.slice(3)+' '+suffix
    			} 
    			this.eventDetails[name]=value

    			
    	},

    _checkValidInput:function(e){
					for(var prop in this.eventDetails){
						if(this.eventDetails[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
					// 
					this.props.sendEventDetails(this.eventDetails)
					this._clearForm()
					this.props.changeState(false)			
					// this.props.sendUserInfo(this.userInput,e.target.value)
		},

	_clearForm:function(){
			for (var key in this.refs){
						this.refs[key].value = ''
					}	
				},



	render:function(){
		window.form = this
		var styleObj={}

		if(!this.props.show){
			styleObj={display:'none'}
		}
		else{
			styleObj={
				display:'inline'
			}
		}
		return(
			<div id="EventForm" style={styleObj}>
				<p id="CreateEvent">Create New Event</p>
				<div className="item">
					<label>Title </label>
					<input ref="titleInput" onBlur={this._validateInput} name="title" type="text" placeholder="Title"/>
				</div>
				<div className="item">
					<label>Date</label>
					<input ref="dateInput" onBlur={this._validateInput} name="date" type="date" placeholder="date"/>
				</div>
				<div className="item">
					<label>Start</label>
					<input ref="timeInputStart" onBlur={this._validateInput} name="startTime" type="time" placeholder="time"/>
				
					<label>End</label>
					<input ref="timeInputEnd" onBlur={this._validateInput} name="endTime" type="time" placeholder="time"/>
				</div>
				<button onClick={this._checkValidInput} >Submit Event</button>
				<button onClick={this._cancel}>Cancel</button>
			</div>
			)
	}

})


var Event=React.createClass({
	

	render:function(){
		;
		var user="",title="", styleObj={}, tmp="";
			
		
		if(this.props.userType==='parent' && this.props.approvedEvents) // Approved Events in the parent
		{

			user=this.props.data.sitterWhoClaimed.firstName+" "+this.props.data.sitterWhoClaimed.lastName
			// 
			// 
			title=this.props.data.title
			styleObj={
				display:'inline',
				fontWeight:'bold'
		}


		}

		else if(this.props.userType==='parent' && !this.props.approvedEvents){ // Pending Events in the parent
			for(var sitter in this.props.data.listOfDenials){
				tmp+= this.props.data.listOfDenials[sitter].firstName+","
			}
			user=tmp.slice(0,tmp.length-1)
			title=this.props.data.title
			styleObj={
				display:'inline',
				fontWeight:'bold'
			}
			

		}

		

		else{
			user=this.props.data.parent.firstName+" "+this.props.data.parent.lastName // approved Events in the sitter
			styleObj={display:'none'}
		}


		var date=new Date(this.props.data.date)

		return(
			<div id="Event">
			<p style={styleObj}>{title}</p>
			<p>{user}</p>
			<p>{date.getUTCMonth()}/{date.getUTCDay()}/{date.getUTCFullYear()}</p>
			<p>{this.props.data.startTime}</p>
			<p>{this.props.data.endTime}</p>
			</div>
			)
	}
})



export {EventsBox}