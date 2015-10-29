let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

import {UpperPanel} from "./UpperPanel.js"

var SitterFormPage = React.createClass({

render:function(){
		return(
			<div>
				<UpperPanel showButtons={this.props.showButtons}/>
			</div>
			)
	}

})

export {SitterFormPage}