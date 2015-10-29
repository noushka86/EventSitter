let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"

var SitterFormPage = React.createClass({

render:function(){
		return(
			<div id="FormPage">
				<UpperPanel showButtons={this.props.showButtons} showLogin={this.props.showLogin}
				showSignup={this.props.showSignup}/>
				<Form sendUserInfo={this.props.sendUserInfo} signup={this.props.signup}/>
			</div>
			)
	}
})

var Form = React.createClass({

	componentDidMount: function(){
			this.userInput = {
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
		console.log('rendered')
		console.log(this.props,'xxxx')
		var styleObjSignup={}, styleObjLogin={}

		if(this.props.signup===false){
			styleObjSignup={display:'none'}
			styleObjLogin={display:'inline'}
		}
		else{
			styleObjLogin={display:'none'}
			styleObjSignup={display:'inline'}
		}

		return(
			<div id="formBox">
				<h3>Manage your work schedule, easily.</h3>
				<div id="Form">
					<input onBlur={this._validateInput} name="username" type="text" placeholder="User Name"/>
					<input onBlur={this._validateInput} name="email" type="text" placeholder="Email"/>
    				<input onBlur={this._validateInput} name="password" type="text" placeholder="Password"/>
					<button onClick={this._checkValidInput} value="signUp" style={styleObjSignup}>SIGN UP</button>
					<button onClick={this._checkValidInput} value="logIn" style={styleObjLogin}>LOG IN</button> 	

				</div>
			</div>
			)
	}

})


export {SitterFormPage}