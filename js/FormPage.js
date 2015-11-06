let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"

var FormPage=React.createClass({

	getInitialState: function(){
		return {
			formType: "signUp"
		}
	},

	_toggleForm: function(newFormType){
		this.setState({formType: newFormType})
	},

	render:function(){
		console.log(this.state)
		return(
			<div id="FormPage">
				<UpperPanel 
					showButtons={this.props.showButtons} 
					toggleForm={this._toggleForm}
				/>
		
				<Form 
					sendUserInfo={this.props.sendUserInfo} 
					formType = {this.state.formType}
					userType={this.props.userType}
				/>
				
			</div>
			)
	}
})

var Form = React.createClass({

	componentDidMount:function(){

			this.userInput={
				username:null,
				email:null,
				password:null,
				type:this.props.userType
			}
		},

		_checkValidInput:function(e){
					for(var prop in this.userInput){
						if(this.userInput[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
					console.log(this.props)
					this.props.sendUserInfo(this.userInput,e.target.value)
		},

		_validateInput: function(e){
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInput[name]=value
    			console.log(this.userInput)
    	},


	render:function(){

		var title,
			sitterTitle="Manage your work schedule, easily.",
			parentTitle="Invite a babysitter, in one click."

		console.log('rendered')
		var styleObjSignup={}, 
			styleObjLogin={}

		if (this.props.formType==="logIn"){
			styleObjSignup={display:'none'}
			styleObjLogin={display:'inline'}
		}
		else {
			styleObjLogin={display:'none'}
			styleObjSignup={display:'inline'}
		}

		if(this.props.userType==="sitter") title=sitterTitle;
		else title=parentTitle;
		
			console.log(title,this.props)
		return(
			<div id="formBox">
				<h3>{title}</h3>
				<div id="Form">
					<input onBlur={this._validateInput} name="username" type="text" placeholder="User Name"/>
					<input onBlur={this._validateInput} name="email" type="text" placeholder="Email"/>
    				<input onBlur={this._validateInput} name="password" type="password" placeholder="Password"/>
					<button onClick={this._checkValidInput} value="signUp" style={styleObjSignup}>SIGN UP</button>
					<button onClick={this._checkValidInput} value="logIn" style={styleObjLogin}>LOG IN</button> 	

				</div>
			</div>
			)
	}

})


// <input onBlur={this._validateInput} name="phone" type="text" placeholder="phone"/>


export {FormPage}