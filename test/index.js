var EventedArray = require('../index');
var assert = require('chai').assert;
var evt = require('emmy');

describe('EventedArray', function(){
	it('Keep prototype chain', function(){
		var a = new EventedArray(1, 2, 3);

		assert.instanceOf(a, EventedArray);
		assert.instanceOf(a, Array);
	});

	it('Fire changed on push', function(){
		var i = 0;
		var a = new EventedArray(1,2,3);

		assert.deepEqual(JSON.parse(JSON.stringify(a)), [1,2,3]);

		evt.on(a, 'changed', function(){
			i++;
			assert.equal(this, a);
		});

		a.push(1,2,3);

		assert.equal(i, 1);
		assert.deepEqual(a.valueOf(), [1,2,3,1,2,3]);
	});

	it('Wrap any array', function(){
		var i = 0;
		var a = [1,2,3];
		var b = new EventedArray(a);
		evt.on(b, 'changed', function(){
			i++;
			assert.equal(this, b);
		});

		b.push(1,2,3);

		assert.deepEqual(b.valueOf(), [1,2,3,1,2,3]);
	});

	it.only('Behave as a usual array', function(){
		var a = new EventedArray(1,2,3);

		// assert.deepEqual(a.valueOf(), [1,2,3]);

		// a.push(4,5);
		// assert.deepEqual(a.valueOf(), [1,2,3,4,5]);

		// a.unshift(1);
		// assert.deepEqual(a.valueOf(), [1,1,2,3,4,5]);
	});

	it('Length behaviour is as of the Array');
})