const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let PostModel = {};

const convertId = mongoose.Types.ObjectId;

// Schematic for posts in the database
const PostSchema = new mongoose.Schema({
  // text of the post
  body: {
    type: String,
    required: true,
  },

  // number of likes, is just the length of likedBy
  likes: {
    type: Number,
    min: 0,
    required: true,
  },

  // array of account ids that have liked this post
  likedBy: {
    type: [String],
    required: true,
  },

  // account id of the account that made the post
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  // username of the owner
  ownerName: {
    type: String,
    required: true,
  },

  // whether or not the post is an ad
  isSponsored: {
    type: Boolean,
    required: true,
  },

  // time post was made
  createdData: {
    type: Date,
    default: Date.now,
  },
});

// allows for outside js to access a post's data
PostSchema.statics.toAPI = (doc) => ({
  body: doc.body,
  likes: doc.likes,
  likedBy: doc.likedBy,
  owner: doc.owner,
  ownerName: doc.ownerName,
  isSponsored: doc.isSponsored,
});

// returns all posts
PostSchema.statics.findAll = (callback) => PostModel.find().exec(callback);

// returns posts made by provided account id
PostSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PostModel.find(search).select('body likes likedBy').lean().exec(callback);
};

// returns post with given post id
PostSchema.statics.findByPostId = async (postId) => PostModel.findById(postId);

// removes post with given post id
PostSchema.statics.deleteByPostId = async (postId, account) => PostModel.deleteOne({
  _id: postId, owner: account._id,
});

PostModel = mongoose.model('Post', PostSchema);

module.exports.PostModel = PostModel;
module.exports.PostSchema = PostSchema;
