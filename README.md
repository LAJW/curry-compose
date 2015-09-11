#ES6 Promise-aware curry() and compose()

[Article explaining these functions](http://layv.net/curry-compose/)

Quick examples:

##curry()

```js
let elementsFromFile = compose(map(toElement),
	param("data"), JSON.parse, asyncLoadFile);

// imperative data extraction 
elementsFromFile("elements.json")
	.then(function (elements) {
		// update the view
	}).catch(function () {
		// Display friendly message, retry
});
```

##compose()

```js
let appendInto = curry(function (parent, element) {
	return parent.appendChild(element);
});

let showElements = compose(
	each(compose(
		appendInto(promiseBody()), 
		toElement
	)),
	param("data"),
	JSON.parse,
	ajax);

showElements("elements.json")
	.catch(alert("server error"));
```

##License
LGPL v3
