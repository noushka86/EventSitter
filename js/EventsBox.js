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

	render:function(){
		var styleObj={}
		if(!this.props.showCreateEventButton){
			styleObj={
				display:'none'
			}
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
				time:null
			}
		},

	_cancel:function(){
		
		this.props.changeState(false)

	},


	_validateInput: function(e){
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.eventDetails[name]=value
    			console.log(this.eventDetails)
    	},

    _checkValidInput:function(e){
					for(var prop in this.eventDetails){
						if(this.eventDetails[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
					console.log(this.eventDetails)
					this.props.sendEventDetails(this.eventDetails)					
					// this.props.sendUserInfo(this.userInput,e.target.value)
		},

	render:function(){
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
                top: '30%',
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
				<p>Create New Event</p>
				<input onBlur={this._validateInput} name="title" type="text" placeholder="Title"/>
				<input  onBlur={this._validateInput} name="date" type="date" placeholder="date"/>
				<input  onBlur={this._validateInput} name="time" type="time" placeholder="time"/>
				<button onClick={this._checkValidInput} >Submit Event</button>
				<button onClick={this._cancel}>Cancel</button>
			</div>
			)
	}

})




export {EventsBox}