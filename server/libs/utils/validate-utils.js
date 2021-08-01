/**
 * @module validate
 * Contain utils for JOI validation.
 * Depending on Joi npm package
 */

/**
 * @description Validate Joi schema and parse it to required format.
 * @param data {object} - data to validate
 * @param schema {object} - Joi object with schema
 * @return {{value: *, errors: *[]}}
 */
function validateOne(data, schema) {
	const { value, error } = schema.validate(data, {
		abortEarly: false,
	});
	const result = {
		// input data
		value,
		// list of string descriptions of validate errors - empty if no errors
		errors: [],
	};

	if (error) {
		error.details.forEach((eachObject) => result.errors.push(eachObject.message));
	}

	return result;
}

/**
 * @description Validate Joi schema and parse it to requred format.
 * @param items {array} - list of data to validate
 * @param schema {object} - Joi object schema to validate all items
 * @return {{nok: number, ok: number, results: {valid: *[], invalid: *[]}}}
 */
function validateMany(items, schema) {
	const result = {
		// length of valid items
		ok: 0,
		// length of invalid items
		nok: 0,
		// results of "validateOne" function - see "validateOne" return format
		results: {
			valid: [],
			invalid: [],
		},
	};

	items.forEach((item) => {
		const validation = validateOne(item, schema);

		if (validation.errors.length) {
			result.nok += 1;
			result.results.invalid.push(validation);
		} else {
			result.ok += 1;
			result.results.valid.push(validation);
		}
	});

	return result;
}

module.exports = {
	validateOne,
	validateMany,
};
