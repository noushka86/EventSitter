let React = require('react')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"

var MyProfile=React.createClass({
	
	componentDidMount:function(){
		var self=this
		this.props.profile.on("sync update",() => this.forceUpdate())
	},

	componentWillUnmount: function(){
		this.props.profile.off("sync update")
	},

	render:function(){

		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={this.props.userType} 
						currentUser={this.props.currentUser}
						logoutUser={this.props.logoutUser}
						/>
				<ProfileForm profile={this.props.profile}
								updateProfile={this.props.updateProfile}
				/>
				
			</div>
			)
	}
})

var ProfileForm=React.createClass({

	componentDidMount:function(){
		this.profileObj={}
	},

	_update:function(){
		for(var key in this.refs){
			this.profileObj[key]=this.refs[key].getDOMNode().innerHTML
		}
		console.log(this.profileObj)

		this.props.updateProfile(this.profileObj)

	},

	render:function(){
		
		return(
			<div id="ProfileForm">
				<div>
					<label>First Name</label>
					<p ref="firstName" contentEditable="true">{this.props.profile.attributes.firstName}</p>
				</div>
				<div>
					<label>Last Name</label>
					<p ref="lastName" contentEditable="true">{this.props.profile.attributes.lastName}</p>			
				</div>
				<div>
					<label>Email</label>
					<p ref="email" contentEditable="true">{this.props.profile.attributes.email}</p>
				</div>
				<div>
					<label>Phone</label>
					<p ref="phone" contentEditable="true">{this.props.profile.attributes.phone}</p>
				</div>
				<div>
					<label>Address</label>
					<p ref="address" contentEditable="true">{this.props.profile.attributes.address}</p>
				</div>
				<button onClick={this._update}>update</button>
			</div>


			)
	}
})

export {MyProfile}