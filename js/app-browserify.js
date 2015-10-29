require("babel/polyfill")

let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

console.log("jS loaded")

import {LandingPage} from "./LandingPage.js"



var SitterRouter=Backbone.Router.extend({
	routes:{
		'welcome':'showLandingPage'
	},


	showLandingPage:function(){
		//(1) if a user is currently logged in I want to redirect him to 
		//MainViewParent/MainViewSitter
		React.render(<LandingPage/>, document.querySelector('#container'))
	},

initialize:function(){
		Backbone.history.start();
	}
})

var router=new SitterRouter();
