let React = require('react')

import {UpperPanel} from "./UpperPanel.js"
import {Menu} from "./Menu.js"

var MyParents=React.createClass({

	componentDidMount:function(){
		var self = this
		this.props.myParentsList.on('change update', ()=>this.forceUpdate())
		
	},

	componentWillUnmount: function(){
		this.props.myParentsList.off('change update')
	},

	render:function(){
		// console.log(this)
		var userType="sitter";
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
				<Menu userType={userType}
						logoutUser={this.props.logoutUser}
						/>
				<ParentsBox myParentsList={this.props.myParentsList}/>
			</div>
			)
	}
})


var ParentsBox=React.createClass({
	
	render:function(){
		return(
			<div id="SittersBox">
				<ListOfParents myParentsList={this.props.myParentsList}/>
			</div>
			)
	}
})


var ListOfParents=React.createClass({
	
	_createParent:function(parentObj){
		return (<Parent data={parentObj.attributes}
						key={parentObj.attributes.objectId}/>)
	},

	render:function(){
		var parentsList=this.props.myParentsList.models

		return(
			<div id="ListOfSitters">
				<label>My Parents</label>
				<div id="ListBox">
					<div id="Sitter">
						<p className="header">Name</p> 
						<p className="header">Email</p> 
						<p className="header">Phone</p>
						<p className="header address">Adress</p>
					</div>
						{parentsList.map(this._createParent)}
					</div>
			</div>
			)
	}
})

var Parent=React.createClass({
	render:function(){
		var address="https://www.google.com/maps/search/"+this.props.data.parent.address
		
		window.s=this.props.data
		return(
			<div id="Sitter">
				<p>{this.props.data.parent.firstName} {this.props.data.parent.lastName}</p>
				<p>{this.props.data.parent.email}</p>
				<p> {this.props.data.parent.phone}</p>
				<a target="_blank" href={address} className="address"> {this.props.data.parent.address}</a>
			</div>
			)
	}
})










export {MyParents}