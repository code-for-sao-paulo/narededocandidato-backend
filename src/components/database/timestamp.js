export default function timestamp(schema) {
  schema.add({ createdAt: { type: Date, default: Date.now } });
  schema.add({ updatedAt: { type: Date, default: Date.now } });

  schema.pre('save', function (done) {
    this.updatedAt = Date.now();
    done();
  });
}
