require('dotenv').config();
const express = require('express');
const massive = require('massive');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());

//endpoints
//post
app.post('/api/products', products_controller.create);

//get
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);

//put
app.put('/api/products/:id', products_controller.update);

//delete
app.delete('/api/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});