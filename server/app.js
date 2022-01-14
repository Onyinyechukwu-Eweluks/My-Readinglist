const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemaGraphql/schema");
require("./db");

const app = express();

//Middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening for request on port ${port}...`));
