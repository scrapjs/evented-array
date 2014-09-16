# Evented array

Just tiny wrapper to make any array emit mutation events.

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


_EventedArray_ is used by [mod](https://github.com/dfcreative/mod) to make properties raise change events.

For subclassing an Array used the [Irakli Gozalishvili’s method](https://gist.github.com/Gozala/666251).


## TODO

* testling table


## License

MIT
