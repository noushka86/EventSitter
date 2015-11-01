let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"


var MySitters=React.createClass({
	render:function(){
		// console.log(this)
		var userType="parent";
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}/>
				<SittersBox sitterModel={this.props.sitterModel} show={this.props.showConfirm}
    				sendInvitation={this.props.sendInvitation} />
			</div>
			)
	}
})


var SittersBox=React.createClass({
	
	render:function(){
		return(
			<div id="SittersBox">
				<ListOfSitters/>
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

		return(
			<div id="AddSitter">
				<label>Add New Sitter</label>
				<input onKeyPress={this._getSitterInfo} type="text" placeholder="add sitter by email"/>

			</div>
			)
	}
})

var ListOfSitters=React.createClass({
	render:function(){
		return(
			<div id="ListOfSitters">
				<label>My Sitters</label>
				<div id="ListBox">
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
		email="",
		errMessage="email not found",
		message="",
		buttonsStyleObj={
		fontFamily: 'helvetica',
		width:'60px',
        fontWeight:'200',
        backgroundColor: '#9b59b6',
        borderRadius: '20px',
        fontFamily: 'helvetica',
        color: '#ecf0f1',
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        margin:'10px',

		}


		if(this.props.show===true){
			popUpStyleObj={
				display:'inline',
				position: 'fixed',
				height:'150px',
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
			}

			if(typeof this.props.sitterModel.attributes.results[0] ==='undefined'){
			message=errMessage;
		}

			else{
				email=this.props.sitterModel.attributes.results[0].email
				message="are you sure you want to add "+email+" to your sitters?"
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
				

			</div>
			)
	}
})



export {MySitters}