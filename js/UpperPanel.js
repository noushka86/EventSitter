let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')


var UpperPanel=React.createClass({

	_handleButtonClick: function(e){
		var formType = e.target.value
		if (formType === "logIn") this.props.toggleForm(formType)
		else this.props.toggleForm(formType)
	},

	render:function(){
			console.log(this.props)

		var styleObj={}

		if(this.props.showButtons===false){
				styleObj={display:'none'}
			}

		else {
			styleObj={
				display:'inline',
				marginLeft:'20px',
				width:'140px',
			    fontWeight: '200',
			    color: '#ecf0f1',
			    borderRadius: '20px',
			    backgroundColor: '#9b59b6',
			    fontFamily: 'helvetica',
			    borderBottom: 'none',
		        borderLeft: 'none',
		        borderRight: 'none',
		        borderTop: 'none',
		        boxShadow:'2px 2px 2px 2px #999',
		        outline:'none'



			}
		}

		return(
			<div id="UpperPanel">
				<img src="./images/babysitter.jpg"/>
				<h4>EventSitter</h4>
				<button onClick={this._handleButtonClick} value="logIn" style={styleObj}>LOG IN</button>
				<button onClick={this._handleButtonClick} value="signUp" style={styleObj}>SIGN UP</button>			
			</div>
			)
	}
})

export {UpperPanel}