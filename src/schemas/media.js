const { MediaTC, MediaSchema } = require("../model/media");

MediaTC.addResolver({
  name: "create",
  kind: "mutation",
  type: MediaTC.getResolver("createOne").getType(),
  args: MediaTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const media = await MediaSchema.create(args.record);

    return {
      record: media,
      recordId: MediaTC.getRecordIdFn()(media),
    };
  },
});

const MediaQuery = {
  mediaById: MediaTC.getResolver("findById"),
  mediaByIds: MediaTC.getResolver("findByIds"),
  mediaOne: MediaTC.getResolver("findOne"),
  mediaMany: MediaTC.getResolver("findMany"),
  mediaCount: MediaTC.getResolver("count"),
  mediaConnection: MediaTC.getResolver("connection"),
  mediaPagination: MediaTC.getResolver("pagination"),
};

const MediaMutation = {
  mediaWithFile: MediaTC.getResolver("create"),
  mediaCreateOne: MediaTC.getResolver("createOne"),
  mediaCreateMany: MediaTC.getResolver("createMany"),
  mediaUpdateById: MediaTC.getResolver("updateById"),
  mediaUpdateOne: MediaTC.getResolver("updateOne"),
  mediaUpdateMany: MediaTC.getResolver("updateMany"),
  mediaRemoveById: MediaTC.getResolver("removeById"),
  mediaRemoveOne: MediaTC.getResolver("removeOne"),
  mediaRemoveMany: MediaTC.getResolver("removeMany"),
};

module.exports = { MediaQuery: MediaQuery, MediaMutation: MediaMutation };
