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
		return(
			<div id="FormPage">
				<UpperPanel 
					showButtons={this.props.showButtons} 
					toggleForm={this._toggleForm} //passing down a function on the FormPage that toggles between the LOGIN and the SIGNUP forms, because the buttons are on the upper panel and they control the toggling between the 2 types of the form.
				/>

				<Form 
					sendUserInfo={this.props.sendUserInfo} // passing a reference to a function on the props that processes the user's login information 
					formType = {this.state.formType}
					userType={this.props.userType}
				/>
			</div>
			)
	}
})

var Form = React.createClass({

	componentDidMount:function(){
		//only after the component mounted, the objects will be ready: 

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

		_checkValidInput:function(e){ //checks all the fields

			if(e.target.value==='logIn'){
					for(var prop in this.userInputLogin){
						if(this.userInputLogin[prop]===null)
						{
							alert('missing fields')
							return
						}
					}
				this.props.sendUserInfo(this.userInputLogin,'logIn') //send the information to the router which then makes the login or the signup

			}

			else{
				for(var prop in this.userInputSignup){
						if(this.userInputSignup[prop]===null)
						{
							alert('missing fields')
							return
						}
					}

				this.props.sendUserInfo(this.userInputSignup,'signUp')

			}
					

		},

		_validateInputLogin: function(e){//happens on blur
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInputLogin[name]=value
    	},

    	_validateInputSignup: function(e){//happens on blur
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInputSignup[name]=value
    	},


	render:function(){
		// Different titles for different user
		var title,
			sitterTitle="Manage your work schedule, easily.",
			parentTitle="Invite a babysitter, in one click."

		if(this.props.userType==="sitter") title=sitterTitle;
		else title=parentTitle;


		//toggles between 2 types of styles.

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


		


		//formBox consists out of 2 types of forms: Login and Signup. When you click on the login button on the upper panel, the toggleForm function changes the State of 'formType' which triggers a UI update/ rendering.
		
		return(
			<div id="formBox"> 
				
				{/* (1) */}
				<div style={styleObjFormLogin} id="Login"> 
					<h3>{title}</h3>
					<div id="Form">
						<input onBlur={this._validateInputLogin} name="username" type="text" placeholder="User Name"/>
	    				<input onBlur={this._validateInputLogin} name="password" type="password" placeholder="Password"/>
						<button onClick={this._checkValidInput} value="logIn" style={styleObjButtonLogin}>SUBMIT</button> 	
					</div>
				</div>
				
				{/* (2) */}
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




export {FormPage}