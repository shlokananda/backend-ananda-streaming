const { SchemaComposer } = require("graphql-compose");

const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require("./user");
const { ArtistQuery, ArtistMutation } = require("./artist");
const { MediaQuery, MediaMutation } = require("./media");

schemaComposer.Query.addFields({
  ...ArtistQuery,
  ...UserQuery,
  ...MediaQuery,
});

schemaComposer.Mutation.addFields({
  ...ArtistMutation,
  ...UserMutation,
  ...MediaMutation,
});

module.exports = schemaComposer.buildSchema();
