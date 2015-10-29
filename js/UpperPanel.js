let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var UpperPanel=React.createClass({

	_showLogin:function(){
		console.log(this.props)
		this.props.showLogin()
	},

	_showSignup:function(){
		this.props.showSignup()
	},

	render:function(){
			console.log(this.props)

		var styleObj={}

		if(this.props.showButtons===false)
		{
			styleObj={display:'none'}
		}

		else {
			styleObj={
			display:'inline',
			marginLeft:'20px',
			width:'140px'

		}

		}

		return(
			<div id="UpperPanel">
				<img src="./images/babysitter.jpg"/>
				<h4>EventSitter</h4>
				
					<button onClick={this._showLogin} style={styleObj}>LOG IN</button>
					<button onClick={this._showSignup} style={styleObj}>SIGN UP</button>
			
			</div>
			)
	}
})




export {UpperPanel}