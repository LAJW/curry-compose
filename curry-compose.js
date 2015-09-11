"use strict"

function compose() {
	let funcs = arguments;
	return function (value) {
		for (let i = funcs.length - 1; i >= 0; i--) {
			let func = funcs[i];
			if (func instanceof Promise || value instanceof Promise) {
				value = Promise.all([func, value]).then(function (args) {
					return args[0](args[1]);	
				});
			} else value = func(value);	
		}
		return value;
	}
}

function curry(fn) {
	return function () {
		let args = Array.prototype.slice.call(arguments);
		return function (value) {
			args.push(value);
			for (let arg of args) {
				if (arg instanceof Promise) {
					return Promise.all(args).then(function (args) {
						return fn.apply(null, args);			
					});
				}
			}
			return fn.apply(null, args);
		}
	}
}
