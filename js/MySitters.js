let React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"


var MySitters=React.createClass({

	componentDidMount:function(){
		var self = this
		this.props.mySittersList.on('change update', function(){
			self.forceUpdate()
		})
		console.log("My Sitters List",this.props.mySittersList)
	},

	render:function(){
		// console.log(this)
		var userType="parent";
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType} logoutUser={this.props.logoutUser}/>
				<SittersBox sitterModel={this.props.sitterModel} show={this.props.showConfirm}
    				sendInvitation={this.props.sendInvitation} mySittersList={this.props.mySittersList}/>
			</div>
			)
	}
})


var SittersBox=React.createClass({
	
	render:function(){
		return(
			<div id="SittersBox">
				<ListOfSitters mySittersList={this.props.mySittersList}/>
				<AddSitter/>
				<SitterConfirm sitterModel={this.props.sitterModel} show={this.props.show}
    				sendInvitation={this.props.sendInvitation}/>
			</div>
			)
	}
})


var AddSitter=React.createClass({
	
_getSitterInfo:function(event){
			if(event.which===13 && event.target.value!=""){
				// this.props.searchSitter(event.target.value)
				location.hash = 'parent/sitterSearch/' + event.target.value
				event.target.value=""

			}
		},


	render:function(){
		var placeholder="Invite New Sitter to My Group";
		
		return(
			<div id="AddSitter">
				<label>Add New Sitter</label>
				<input className="search rounded" onKeyPress={this._getSitterInfo}
				 type="text" placeholder={placeholder}></input>

			</div>
			)
	}
})

var ListOfSitters=React.createClass({
	
	_createSitter:function(sitterObj){
		return (<Sitter data={sitterObj.attributes}
						key={sitterObj.attributes.objectId}/>)
	},

	render:function(){
		console.log('my sitters')
		// console.log(this.props.mySittersList.models[0].attributes.results)
		var sittersList=this.props.mySittersList.models

		return(
			<div id="ListOfSitters">
				<label>My Sitters</label>
				<div id="ListBox">
					<div id="Sitter">
						<p className="header">Name</p> 
						<p className="header">Email</p> 
						<p className="header">Phone</p>
						<p className="header address">Adress</p>
					</div>
						{sittersList.map(this._createSitter)}
					</div>
			</div>
			)
	}
})

var SitterConfirm=React.createClass({
	_clickHandler:function(event){

		if(event.target.value==='No'){

			location.hash="MySitters"
		}
		
		else{
			

		var SitterId=this.props.sitterModel.attributes.results[0].objectId,
			SitterUsername=this.props.sitterModel.attributes.results[0].username,
			ParentId=Parse.User.current().id

		this.props.sendInvitation(SitterId,SitterUsername,ParentId)
		location.hash="MySitters"
	}

	},

	render:function(){
		// console.log(this.props.sitterModel.attributes)
		// console.log("xxx")
		var popUpStyleObj={},
		fName="",
		lName="",
		errMessage="email not found",
		message="",
		buttonsStyleObj = {
	        fontFamily: 'helvetica',
	        width: '60px',
	        fontWeight: '200',
	        backgroundColor: '#9b59b6',
	        borderRadius: '20px',
	        color: '#ecf0f1',
	        borderBottom: 'none',
	        borderLeft: 'none',
	        borderRight: 'none',
	        borderTop: 'none',
	        margin: '10px'
	    },
	    OKbuttonStyle = {
	        display: 'none'
	    }

		if(this.props.show===true){
			popUpStyleObj={
				display:'inline',
				position: 'fixed',
				width:'250px',
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
                color:'white',
                padding:'15px',
			}

			if(typeof this.props.sitterModel.attributes.results[0] ==='undefined'){
			message=errMessage;
			buttonsStyleObj={display:'none'}
			OKbuttonStyle={fontFamily: 'helvetica',
							width:'60px',
					        fontWeight:'200',
					        backgroundColor: '#9b59b6',
					        borderRadius: '20px',
					        color: '#ecf0f1',
					        borderBottom: 'none',
					        borderLeft: 'none',
					        borderRight: 'none',
					        borderTop: 'none',
					        margin:'10px'}
						}

			else{
				fName=this.props.sitterModel.attributes.results[0].firstName
				lName=this.props.sitterModel.attributes.results[0].lastName
				message="are you sure you want to add "+fName+" "+lName+" to your group of sitters?"
			}
		}

		else{
			popUpStyleObj={display:'none'}
		}
		return(
			<div style={popUpStyleObj}>
				<p>{message}</p>
				<button style={buttonsStyleObj} onClick={this._clickHandler} value="Yes">Yes</button>
				<button style={buttonsStyleObj} onClick={this._clickHandler} value="No">No</button>
				<button style={OKbuttonStyle} onClick={this._clickHandler} value="No">OK</button>

			</div>
			)
	}
})


var Sitter=React.createClass({
	render:function(){
		var address="https://www.google.com/maps/search/"+this.props.data.sitter.address
		
		window.s=this.props.data
		return(
			<div id="Sitter">
				<p>{this.props.data.sitter.firstName} {this.props.data.sitter.lastName}</p>
				<p>{this.props.data.sitter.email}</p>
				<p> {this.props.data.sitter.phone}</p>
				<a target="_blank" href={address} className="address"> {this.props.data.sitter.address}</a>
			</div>
			)
	}
})

			



export {MySitters}