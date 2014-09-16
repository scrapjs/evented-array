# Eventful-array

Just tiny wrapper to make any array eventful.

Default events are:
* push
* pop
* shift
* unshift
* changed


## Use

`$ npm install eventful-array`


```js
var eArray = require('eventful-array');
var emitter = require('emitter'); //any event emitter handler, like [muevents]() etc
```

Wrap existing array:

```js
var a = [];
var b = eArray(a);

//listen to events
emitter.on(a, 'changed');

```

Create new array:

```js
var a = new EventfulArray([1,2,3]);
```



EventedArray is used by [mod]() to wrap any array property and raise change events.


## License

MIT
