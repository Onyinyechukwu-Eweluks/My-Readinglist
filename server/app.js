const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemaGraphql/rootQuery");
require("./db");

const app = express();

//Middleware
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening for request on port ${port}...`));
