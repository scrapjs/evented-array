# Evented array [![Build Status](https://travis-ci.org/dfcreative/evented-array.svg?branch=master)](https://travis-ci.org/dfcreative/evented-array) [![Code Climate](https://codeclimate.com/github/dfcreative/evented-array/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/evented-array) <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>


Just tiny wrapper to make any array emit mutator events.

Full list of mutator methods can be found on the MDN: [mutator methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Mutator_methods).


## Use

Install:

`$ npm install evented-array`

```js
var EventedArray = require('evented-array');
```


Wrap existing array:

```js
var a = [];
var b = EventedArray(a);

//listen to events
emitter.on(a, 'changed');
```

Create new array (the way Array is created):

```js
var a = new EventedArray(1,2,3);
```

To subclass the Array used the [Irakli Gozalishvili’s method](https://gist.github.com/Gozala/666251).



[![NPM](https://nodei.co/npm/evented-array.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/evented-array/)
