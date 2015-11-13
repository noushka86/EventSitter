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
				<ParentsBox myParentsList={this.props.myParentsList}

							/>
				<MapBox  myParentsList={this.props.myParentsList}/>

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
						<p className="header email">Email</p> 
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


var MapBox=React.createClass({

	// componentDidMount:function(){
	// 	this._initMap();
	// },

	componentWillUpdate:function(){
		this._initMap();
	},


	_initMap:function(){
		console.log(this.props)
		window.props = this.props

var map = new google.maps.Map(document.getElementById("MapBox"),{
			center: new google.maps.LatLng(29.7630556, -95.3630556),
			scrollwheel:false,
			zoom:12
		})


		this.props.myParentsList.forEach(function(element){
				 var newMarker = new google.maps.Marker({
                    map: map,
                    position: element.attributes.parent.latlon,
                    title: element.attributes.parent.username
                })

				 var infoWindow = new google.maps.InfoWindow({
                    content: '<p id="marker">' + element.attributes.parent.username + '</p>'
                })


				 newMarker.addListener("click", function(){
                    infoWindow.open(map, newMarker)
                })


				 console.log(element.attributes.parent.username)

	})
		console.log('creating map')
		// console.log(markers)
		
	},

	render:function(){

		return(

			<div id="MapBox">

			</div>

			)
	}
})







export {MyParents}