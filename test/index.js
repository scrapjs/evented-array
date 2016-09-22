var EventedArray = require('../index');
var assert = require('chai').assert;
var now = require('performance-now');

describe('EventedArray', function(){
	it('Keep prototype chain', function(){
		var a = new EventedArray([1, 2, 3]);

		assert.instanceOf(a, EventedArray);
		assert.instanceOf(a, Array);
	});

	it('Fire changed on push', function(){
		var i = 0;
		var a = new EventedArray([1,2,3]);

		assert.deepEqual(JSON.parse(JSON.stringify(a)), [1,2,3]);

		a.on('changed', function(){
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
		b.on('changed', function(){
			i++;
			assert.equal(this, b);
		});

		b.push(1,2,3);

		assert.deepEqual(b.valueOf(), [1,2,3,1,2,3]);
	});

	it('Behave as a usual array', function(){
		var a = new EventedArray([1,2,3]);

		assert.deepEqual(a.valueOf(), [1,2,3]);

		a.push(4,5);
		assert.deepEqual(a.valueOf(), [1,2,3,4,5]);

		a.unshift(1);
		assert.deepEqual(a.valueOf(), [1,1,2,3,4,5]);
	});

	it('Length behaviour is as of the Array', function () {
		var a = EventedArray(10);

		assert.equal(a.length, 10);
	});

	describe('Performance', function () {
		var a = [], b = EventedArray();
		it('Array', function () {
			var start = now();
			for (var i = 0; i < 1000; i++) {
				a.push(i);
			}
			console.log(now() - start)
		});
		it('EventedArray', function () {
			var start = now();
			for (var i = 0; i < 1000; i++) {
				b.push(i);
			}
			console.log(now() - start)
		});
	});
})
