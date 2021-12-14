const app = require('./src/server');

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${port}`);
});
