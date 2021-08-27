const Joi = require('joi');
const mongodb = require('./mongodb');
const { validateMany, validateOne } = require('./utils');
const errorCodes = require('./errors/codes');

class Model {
  constructor (collectionName, validationSchema) {
    this.collectionName = collectionName;
    this.validationSchema = validationSchema;
    this.validationSchemaRequired = {};

    // add ".required()" to schema for CREATE method - all fields are required
    Object.keys(validationSchema).forEach((fieldName) => {
      this.validationSchemaRequired[fieldName] = validationSchema[fieldName].required();
    });
  }

  /**
	 * Get all items (after filter it)
	 * @param [filters] [object]
	 * @return {Promise<void>}
	 */
  async all (filters = {}) {
    const collection = await mongodb.getCollection(this.collectionName);
    const items = await collection.find(filters).toArray();

    return items;
  }

  /**
	 * Create new items
	 * @param newDocument [object|array]
	 * @return {Promise<{success: boolean}>}
	 */
  async create (newDocument) {
    // unify input
    const items = Array.isArray(newDocument) ? newDocument : [newDocument];
    const validationResults = validateMany(items, Joi.object(this.validationSchemaRequired));
    const result = {
      success: false,
      error: undefined,
      errorDetails: undefined,
    };

    // validation failed
    if (validationResults.nok) {
      result.error = errorCodes.MODEL_VALIDATION_NOT_PASS;
      result.errorDetails = validationResults.results;
    } else {
      const itemsToCreate = validationResults.results.valid.map((item) => item.value);
      const collection = await mongodb.getCollection(this.collectionName);
      const insertResult = await collection.insertMany(itemsToCreate);

      // check if created all items
      if (insertResult.insertedCount === items.length) {
        result.success = true;
        result.data = insertResult.ops;
      } else {
        result.error = errorCodes.MODEL_INSERT_INCORRECT_LENGTH;
        result.errorDetails = insertResult;
      }
    }

    return result;
  }

  /**
	 * @description Get filtered item
	 * @param filters {object}
	 */
  async get (filters = {}) {
    const collection = await mongodb.getCollection(this.collectionName);
    const result = await collection.findOne(filters);

    return result;
  }

  /**
	 * @description Delete filtered item
	 * @param filters {object}
	 */
  async delete (filters = {}) {
    const collection = await mongodb.getCollection(this.collectionName);
    const deleteResult = await collection.deleteOne(filters);
    const result = {
      success: deleteResult.deletedCount === 1,
    };

    return result;
  }

  /**
	 * @description Update filtered items
	 * @param filters {object}
	 * @param newDocument {object}
	 */
  async update (filters = {}, newDocument = {}) {
    // unify input
    const validationResults = validateOne(newDocument, Joi.object(this.validationSchema));
    const result = {
      success: false,
      error: undefined,
      errorDetails: undefined,
    };

    // validation failed
    if (validationResults.errors.length) {
      result.error = errorCodes.MODEL_VALIDATION_NOT_PASS;
      result.errorDetails = validationResults.errors;
    } else {
      const collection = await mongodb.getCollection(this.collectionName);
      const updateResult = await collection.updateMany(filters, { $set: newDocument });

      console.log(updateResult);

      // check if created all items
      if (updateResult.modifiedCount === 1) {
        result.success = true;
      } else {
        result.error = errorCodes.MODEL_UPDATE_INCORRECT_LENGTH;
        result.errorDetails = updateResult;
      }
    }

    return result;
  }
}

module.exports = Model;
