if (process.env.NODE_ENV === 'production') {
    module.exports = {
      MONGO_URI: process.env.MONGO_URI,
      SECRET_KEY: process.env.SECRET_KEY
    };
  } else {
    module.exports = require('./dev'); // Apenas em desenvolvimento
  }
  