"use strict"

// Tests should run on Google Chrome 39+
// Firefox rejects lets and consts

QUnit.module("compose");
QUnit.test("compose-returns-function", function (assert) {
	assert.ok(compose() instanceof Function,
		"Compose should return a function");
});

QUnit.test("compose-default-function", function (assert) {
	let composeDefault = compose();
	let value = Math.random();
	assert.strictEqual(
		composeDefault(value),
		value,
		"Compose default function should pass value unchanged by default"
	);
});

QUnit.test("compose-passthrough", function (assert) {
	let sqrt = compose(Math.sqrt);
	let value = Math.random();
	assert.strictEqual(
		sqrt(value),
		Math.sqrt(value),
		"Compose should merge into the supplied unary function"
	);
});

QUnit.test("compose-chain", function (assert) {
	function square(value) {
		return Math.pow(value, 2);
	}
	function addOne(value) {
		return value + 1;
	}
	let addOneAndSquare = compose(square, addOne);
	let value = Math.random();
	assert.strictEqual(
		addOneAndSquare(value),
		Math.pow(value + 1, 2),
		"Compose should link together unary functions");
});

QUnit.test("compose-chain-promise", function (assert) {
	function square(value) {
		return Promise.resolve(Math.pow(value, 2));
	}
	function addOne(value) {
		return Promise.resolve(value + 1);
	}
	let addOneAndSquare = compose(square, addOne);
	let value = Math.random();
	let done = assert.async();
	
	addOneAndSquare(value)
		.then(function (result) {
			assert.strictEqual(
				result, 
				Math.pow(value + 1, 2),
				"compose should also link functions returning values via Promise");
			done();
		});
});

QUnit.module("curry");

QUnit.test("curry-binding-arguments", function (assert) {
	let pow = curry(function (exp, value) {
		return Math.pow(value, exp);
	});
	let value = Math.random();
	assert.strictEqual(
		pow(2)(value),
		Math.pow(value, 2)
	);
});

QUnit.test("curry-binding-promises", function (assert) {
	let pow = curry(function (exp, value) {
		return Math.pow(value, exp);
	});
	let done = assert.async();	
	let value = Math.random();
	pow(Promise.resolve(2))(Promise.resolve(value))
		.then(function (result) {
			assert.strictEqual(
				result,
				Math.pow(value, 2),
				"compose should also seamlessly bind promised values"
			);
			done();
		});
});
