 import logo from './logo.svg';
//import React from 'react';
import { createElement } from 'react';
import './App.css';

function getYear() {
  let date = new Date();
  let year = date.getFullYear()
  return createElement('p',null, {year})
}


export const App = () => {
		return createElement('div',createElement('header', {className: 'App-header'},
												createElement('img', {className : 'App-logo',src : {logo}}, null),
												createElement ('p',null,'Edit',
												createElement('code',null, 'src/App.js' ), 'and save to reload.'),
												createElement('a',{className: 'App-link',href:'https://reactjs.org', target:'_blank', rel: 'noopener noreferrer'  }, 'Learn React'),
												getYear,
												null)
												,{className : 'App'}, null)
}




