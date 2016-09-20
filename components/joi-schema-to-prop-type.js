import joiToPropType from 'joi-react';

function joiSchemaToPropType(schema) {
  const newSchema = {};

  Object
    .keys(schema)
    .forEach(key => {
      const value = schema[key];
      newSchema[key] = joiToPropType(value);
    });

  return newSchema;
}

export default joiSchemaToPropType;
