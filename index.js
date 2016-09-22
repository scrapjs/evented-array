/**
 * @module evented-array
 */
module.exports = EventedArray;



/** Event emitter, can be replaced with more suitable one */
var Emitter = require('events').EventEmitter;
var extend = require('xtend/mutable');


/** Callback name to use as a changed notifier */
var changeCallbackName = 'changed';


/**
 * Mutator methods
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Mutator_methods}
 */
var mutatorMethods = 'copyWithin fill pop push reverse shift sort splice unshift'.split(' ');



/**
 * @constructor
 *
 * Subclassing is taken from [here]{@link https://gist.github.com/Gozala/666251}
 */
function EventedArray(src){
	if (!(this instanceof EventedArray)) return new EventedArray(src);

	Emitter.call(this);

	//upgrade passed Array to EventedArray
	if (src instanceof Array) {
		this.push.apply(this, src);
	}
	else if (typeof src === 'number') {
		this.length = src;
	}
}


/**
 * Inherit from Array
 */
EventedArray.prototype = Object.create(Array.prototype, {
	constructor: {
		value: EventedArray
	}
});
extend(EventedArray.prototype, Emitter.prototype);


/**
 * Fix JSON representation
 */
EventedArray.prototype.toJSON = function(){
	return this.slice.call(this);
};


/**
 * Return array instance instead of evented array
 */
EventedArray.prototype.valueOf = function(){
	return this.slice.call(this);
};


//For every mutator method - create event wrapper on the EventedArray prototype
for (var i = mutatorMethods.length, meth; i--;){
	meth = mutatorMethods[i];
	if (Array.prototype[meth])	{
		EventedArray.prototype[meth] = getWrapper(meth);
	}
}


/**
 * Get Array eventable method wrapper
 *
 * @param {string} methName Array method name
 *
 * @return {Function} Method wrapper
 */
function getWrapper (methName) {
	return function () {
		this.emit(methName);
		var res = Array.prototype[methName].apply(this, arguments);
		this.emit(changeCallbackName);
		return res;
	};
}
