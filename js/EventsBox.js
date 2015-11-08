let fetch = require('./fetcher'),
	React = require('react'),
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
						key={eventObj.objectId}
						userType={this.props.userType}
						/>)
	},

	render:function(){

		var events=this.props.events.models
		// console.log(events,"EVENTS")
		var styleObj={},
			userHeader="",
			eventNameStyleObj={}

		if(!this.props.showCreateEventButton){
			styleObj={
				display:'none'
			}
			userHeader="Parent"
			eventNameStyleObj={display:'none'}
		}

		else{
			userHeader="Sitter"

		}


		return(
			<div id="EventsBox">
				<label>Upcoming Events</label>
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
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.eventDetails[name]=value
    			// console.log(this.eventDetails)
    	},

    _checkValidInput:function(e){
					for(var prop in this.eventDetails){
						if(this.eventDetails[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
					// console.log(this.eventDetails)
					this.props.sendEventDetails(this.eventDetails)
					this._clearForm()
					this.props.changeState(false)			
					// this.props.sendUserInfo(this.userInput,e.target.value)
		},

		_clearForm:function(){
			for (var key in this.refs){
						this.refs[key].getDOMNode().value = ''
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
				display:'inline',
				position: 'fixed',
				border:'2px solid #9b59b6',
				borderRadius:'20px',
				left: '50%',
                top: '50%',
                transform: "translate(-50%,-50%)",
                'backgroundColor':'#AEA8D3',
                textAlign:'center',
                fontFamily:'helvetica',
                fontWeight:'200',
                boxShadow:'4px 4px 4px 4px #999',
                padding:'20px',


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

		var user,title="", styleObj={}
		if(this.props.userType==='parent')
		{
			user=this.props.data.sitterWhoClaimed.firstName+" "+this.props.data.sitterWhoClaimed.lastName
			title=this.props.data.title

		}

		else{
			user=this.props.data.parent.firstName+" "+this.props.data.parent.lastName
			styleObj={display:'none'}
		}

		return(
			<div id="Event">
			<p style={styleObj}>{title}</p>
			<p>{user}</p>
			<p>{this.props.data.date}</p>
			<p>{this.props.data.startTime}</p>
			<p>{this.props.data.endTime}</p>
			</div>
			)
	}
})



export {EventsBox}