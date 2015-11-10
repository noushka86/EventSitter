let React = require('react')

import {UpperPanel} from "./UpperPanel.js"

var FormPage=React.createClass({

	getInitialState: function(){
		return {
			formType: "logIn"
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

			this.userInputLogin={
				username:null,
				password:null,
				type:this.props.userType
			}

			this.userInputSignup={
				username:null,
				email:null,
				password:null,
				firstName:null,
				lastName:null,
				phone:null,
				address:null,
				type:this.props.userType
			}

		},

		_checkValidInput:function(e){
					console.log('check Valid Input')

			if(e.target.value==='logIn'){
					for(var prop in this.userInputLogin){
						if(this.userInputLogin[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
				this.props.sendUserInfo(this.userInputLogin,e.target.value)

			}

			else{
				for(var prop in this.userInputSignup){
						if(this.userInputSignup[prop]===null)
						{
							alert('missing fields')
							return
						}
					}

				this.props.sendUserInfo(this.userInputSignup,e.target.value)

			}
					

		},

		_validateInputLogin: function(e){
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInputLogin[name]=value
    			console.log(this.userInputLogin)
    	},

    	_validateInputSignup: function(e){
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInputSignup[name]=value
    			console.log(this.userInputSignup)
    	},


	render:function(){

		var title,
			sitterTitle="Manage your work schedule, easily.",
			parentTitle="Invite a babysitter, in one click."

		console.log('rendered')
		var styleObjButtonSignup={}, 
			styleObjButtonLogin={},
			styleObjFormLogin={},
			styleObjFormSignup={}

		if (this.props.formType==="logIn"){
			styleObjButtonSignup={display:'none'}
			styleObjButtonLogin={display:'inline'}

			styleObjFormSignup={display:'none'}
			styleObjFormLogin={display:'block'}
			


		}
		else {
			styleObjButtonLogin={display:'none'}
			styleObjButtonSignup={display:'inline'}

			styleObjFormSignup={display:'block'}
			styleObjFormLogin={display:'none'}
		}

		if(this.props.userType==="sitter") title=sitterTitle;
		else title=parentTitle;
		
			console.log(title,this.props)
		return(
			<div id="formBox">
				<div style={styleObjFormLogin} id="Login">
					<h3>{title}</h3>
					<div id="Form">
						<input onBlur={this._validateInputLogin} name="username" type="text" placeholder="User Name"/>
	    				<input onBlur={this._validateInputLogin} name="password" type="password" placeholder="Password"/>
						<button onClick={this._checkValidInput} value="logIn" style={styleObjButtonLogin}>SUBMIT</button> 	
					</div>
				</div>

				<div style={styleObjFormSignup} id="Signup">
					<h3>{title}</h3>
					<div id="Form">
						<input onBlur={this._validateInputSignup} name="username" type="text" placeholder="User Name"/>
	    				<input onBlur={this._validateInputSignup} name="email" type="text" placeholder="Email"/>
						
						<input onBlur={this._validateInputSignup} name="firstName" type="text" placeholder="First Name"/>
						<input onBlur={this._validateInputSignup} name="lastName" type="text" placeholder="Last Name"/>
						<input onBlur={this._validateInputSignup} name="phone" type="text" placeholder="Phone"/>
						<input onBlur={this._validateInputSignup} name="address" type="text" placeholder="Address"/>

	    				<input onBlur={this._validateInputSignup} name="password" type="password" placeholder="Password"/>
						<button onClick={this._checkValidInput} value="signUp" style={styleObjButtonSignup}>SUBMIT</button>
					</div>
				</div>
			</div>
			)
	}

})


// <input onBlur={this._validateInput} name="phone" type="text" placeholder="phone"/>


export {FormPage}