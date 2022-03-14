function parseDocumentToUpdate (document) {
  const newDocument = {};

  Object.entries(document).forEach(([key, value]) => {
    // update value nested in object
    if (!!value && value.constructor === Object) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        newDocument[`${key}.${nestedKey}`] = nestedValue;
      });
    } else {
      // update common value
      newDocument[key] = value;
    }
  });

  return newDocument;
}

module.exports = parseDocumentToUpdate;
