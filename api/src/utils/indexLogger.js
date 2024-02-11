const indexLogger = (modelName) => (err) => {
  if (err) {
    console.error(`CRITICAL ERROR: ${modelName} index error: %s`, err);
  }
};

module.exports = {
  indexLogger,
};
