/**
 * @module evented-array
 */
module.exports = EventedArray;


/** event emitter, can be replaced with more concise one */
var evt = require('muevents');


/** Callback name to use as a changed notifier */
var changeCallbackName = 'changed';


/**
 * Mutator methods
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Mutator_methods}
 */
var mutatorMethods = 'copyWithin fill pop push reverse shift sort splice unshift'.split(' ');


var arrProto = Array.prototype;


/**
 * @constructor
 *
 * Subclassing is taken from [here]{@link https://gist.github.com/Gozala/666251}
 */
function EventedArray(src){
	//upgrade array passed up to EventedArray
	if (src instanceof Array) {
		return EventedArray.apply(this, src);
	}

	this.push.apply(this, arguments);
}

//extend proto from the Array
var proto = EventedArray.prototype = Object.create(arrProto, {
	constructor: {
		value: EventedArray
	}
});

//fix JSON representation
proto.toJSON = function(){
	return this.slice.call(this);
};

//return array instance instead of evented array
proto.valueOf = function(){
	return this.slice.call(this);
};


//For every mutator method - create event wrapper on the EventedArray prototype
for (var i = mutatorMethods.length, meth; i--;){
	meth = mutatorMethods[i];
	if (arrProto[meth])	proto[meth] = getWrapper(meth);
}


/**
 * Get Array eventable method wrapper
 *
 * @param {string} methName Array method name
 *
 * @return {Function} Method wrapper
 */
function getWrapper (methName) {
	return function(){
		evt.emit(this, methName);
		var res = arrProto[methName].apply(this, arguments);
		evt.emit(this, changeCallbackName);
		return res;
	};
}