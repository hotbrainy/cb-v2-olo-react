const isLocalDevEnvironment = (typeof (window) !== 'undefined') && /^https?:\/\/localhost/i.test(window.location.href);

export const settings = {
	DEFAULT_NUMBER_OF_STORES: 5,
	debugCategory           : "burgers",
	makeItAMealText         : "Make it a Meal",
	// TODO: manage this via .env/api/aws-paramstore
	googleApiKey            : "AIzaSyDBQzZoXsfXtfv7Lja4QIP0Ij-4Y1yDCew",
	borderRadius            : "12px",
	caloriesPerKj           : 4.184,
	isLocalDevEnvironment   : isLocalDevEnvironment,
	uiDebug                 : isLocalDevEnvironment,
	labelsToShowAtCheckout  : ['customise your burger','select your double bondi / rappa #2'],
  }