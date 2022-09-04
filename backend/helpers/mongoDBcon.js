const { connect } = require("mongoose");

module.exports = (app) => {
  const PORT = process.env.PORT || 5000;
  connect(process.env.MONGO_URI)
    .then(() =>
      app.listen(PORT, () => {
        console.log(`your server is running at ${PORT}`);
      })
    )
    .catch((err) => {
      console.log("mongo connection error", err.message);
    });
};
