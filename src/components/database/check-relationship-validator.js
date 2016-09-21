import mongoose from 'mongoose';

export default function buildValidator(modelName, message) {
  const model = mongoose.models[modelName]

  if (!model) {
    throw new Error(`The ${modelName} was not registered in mongoose !`);
  }

  if (!message) {
    message = `The ${modelName} with id [{VALUE}] does not exists !`;
  }

  return {
    validator: (value, done) => {
      model.count({ id: value })
        .exec(function (err, count) {
          done(!err && count > 0);
        });
    },
    message: message
  }
}
