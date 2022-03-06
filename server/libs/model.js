const Joi = require('joi');
const mongodb = require('./mongodb');
const {
  validateMany,
  validateOne,
  parseDocumentToUpdate,
} = require('./utils');
const {
  errorCodes,
  AppError,
} = require('./errors');

class Model {
  constructor (collectionName, validationSchema, options = {}) {
    this.collectionName = collectionName;
    this.validationSchema = Joi.object(validationSchema);
    this.validationSchemaRequired = {};
    this.uniqueFiled = options.uniqueFiled;
    this.uniqueFieldError = options.uniqueFieldError;

    // add ".required()" to schema for CREATE method - all fields are required
    Object.entries(validationSchema).forEach(([fieldName, fieldValue]) => {
      const fieldIsObject = !!fieldValue && fieldValue.constructor === Object;

      if (fieldIsObject) {
        Object.entries(fieldValue).forEach(([nestedFieldName, nestedFieldValue]) => {
          fieldValue[nestedFieldName] = nestedFieldValue.required();
        });
        this.validationSchemaRequired[fieldName] = Joi.object(fieldValue);
      } else {
        this.validationSchemaRequired[fieldName] = fieldValue.required();
      }
    });

    this.validationSchemaRequired = Joi.object(this.validationSchemaRequired);
  }

  /**
   * Create new items
   * @param newDocuments [object|array]
   * @return {Promise<{success: boolean}>}
   */
  async create (newDocuments) {
    // unify input
    const items = Array.isArray(newDocuments) ? newDocuments : [newDocuments];
    const validationResults = validateMany(items, this.validationSchemaRequired);
    const result = {
      success: false,
      error: undefined,
      errorDetails: undefined,
    };

    // validation failed
    if (validationResults.nok) {
      throw new AppError(errorCodes.MODEL_VALIDATION_NOT_PASS, {
        details: validationResults.results,
      });
    } else {
      const itemsToCreate = validationResults.results.valid.map((item) => item.value);
      const collection = await mongodb.getCollection(this.collectionName);
      let foundDuplicates = false;
      let insertResult = {};

      // TODO move uniqueField feature to function
      if (this.uniqueFiled) {
        const findQuery = {};

        findQuery[this.uniqueFiled] = {
          '$in': itemsToCreate.map((item) => item[this.uniqueFiled]),
        };

        const duplicationUniqueField = await collection.find(findQuery).toArray();

        foundDuplicates = duplicationUniqueField.length !== 0;
      }

      if (!foundDuplicates) {
        insertResult = await collection.insertMany(itemsToCreate);
      }

      // check if created all items
      if (insertResult.insertedCount === items.length) {
        result.success = true;
        result.data = insertResult.ops;
      } else if (foundDuplicates) {
        if (this.uniqueFieldError) {
          throw new AppError(this.uniqueFieldError, {
            httpStatus: 400,
          });
        } else {
          throw new AppError(errorCodes.MODEL_FOUND_DOCUMENT_WITH_UNIQUE_FIELD, {
            httpStatus: 500,
          });
        }
      } else {
        throw new AppError(errorCodes.MODEL_INSERT_INCORRECT_LENGTH, {
          details: insertResult,
        });
      }
    }

    return result;
  }

  /**
   * @description Get filtered item
   * @param filters {object}
   * @param [options] {object}
   */
  // TODO secure from empty filters object
  async get (filters = {}, options = {}) {
    const {
      aggregationPipeline,
    } = options;
    const collection = await mongodb.getCollection(this.collectionName);
    let result;

    if (aggregationPipeline) {
      const aggregation = aggregationPipeline(filters);
      // TODO add handler for problem with aggregations
      const aggregatedData = await collection.aggregate(aggregation).toArray();

      result = aggregatedData[0];
    } else {
      result = await collection.findOne(filters);
    }

    return result;
  }

  /**
   * Get all items (after filter it)
   * @param filters {object}
   * @param [options] {object}
   */
  // TODO secure from empty filters object
  async getMany (filters, options = {}) {
    const {
      aggregationPipeline,
    } = options;
    const collection = await mongodb.getCollection(this.collectionName);
    let result;

    if (aggregationPipeline) {
      const aggregation = aggregationPipeline(filters);

      result = await collection.aggregate(aggregation).toArray();
    } else {
      result = await collection.find(filters).toArray();
    }

    return result;
  }

  /**
   * @description Delete filtered item
   * @param filters {object}
   */
  async delete (filters = {}) {
    const collection = await mongodb.getCollection(this.collectionName);
    const deleteResult = await collection.deleteOne(filters);

    return {
      success: deleteResult.deletedCount === 1,
    };
  }

  /**
   * @description Update filtered items
   * @param filters {object}
   * @param newDocument {object}
   * @param [options] {object}
   */
  async update (filters = {}, newDocument = {}, options = {}) {
    // unify input
    const { rawNewDocument } = options;
    const validationResults = rawNewDocument ? null : validateOne(newDocument, this.validationSchema);
    const result = {
      success: false,
      error: undefined,
      errorDetails: undefined,
    };

    // validation failed
    if (validationResults && validationResults.errors.length) {
      result.error = errorCodes.MODEL_VALIDATION_NOT_PASS;
      result.errorDetails = validationResults.errors;
    } else {
      const collection = await mongodb.getCollection(this.collectionName);
      const query = rawNewDocument ? newDocument : { $set: parseDocumentToUpdate(newDocument) };
      const updateResult = await collection.updateMany(filters, query);

      // check if created all items
      if (updateResult.matchedCount === 1) {
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
