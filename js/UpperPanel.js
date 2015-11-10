let React = require('react')

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
			}
		}

		return(
			<div id="UpperPanel">
				<img id="logo-image" src="./images/babysitter.jpg"/>
				<h4>SmartSit</h4>
				<button className="upper-buttons" onClick={this._handleButtonClick} value="logIn" style={styleObj}>LOG IN</button>
				<button className="upper-buttons" onClick={this._handleButtonClick} value="signUp" style={styleObj}>SIGN UP</button>			
			</div>
			)
	}
})

export {UpperPanel}