const models = require('../models');

const { ForumPost } = models;

// renders app from a get request
const makerPage = (req, res) => {
  ForumPost.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), posts: docs });
  });
};

// creates a post from info on the DOM and places it in the database
const makePost = (req, res) => {
  if (!req.body.body) {
    return res.status(400).json({ error: 'ERROR: Post requires text' });
  }

  // container of relavent info to give the post
  const postData = {
    body: req.body.body,
    likes: 0,
    owner: req.session.account._id,
    ownerName: req.session.account.username,
    isSponsored: req.body.sponsored === 'on',
  };

  const newPost = new ForumPost.PostModel(postData);

  const postPromise = newPost.save();

  // redirect back to the main page after posting
  postPromise.then(() => res.json({ redirect: '/', userId: req.session.account._id }));

  postPromise.catch((err) => {
    console.log(err);

    return res.status(400).json({ error: 'An error occurred' });
  });

  return postPromise;
};

// returns the list of posts
const getPosts = (req, res) => {
  return ForumPost.PostModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ posts: docs });
  });
};

// asynchronously removes a given post from the database
const deletePost = async (req, res) => {
  try {
    // wait until post is removed before continuing
    await ForumPost.PostModel.deleteByPostId(req.body.id, req.session.account);
    res.status(204).json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting post' });
  }
};

// asynchronously likes a post from the given post and user ids
const likePost = async (req, res) => {
  try {
  // waits for post to be found before continuing
    const likedPost = await ForumPost.PostModel.findByPostId(req.body.id);

    // owner index is used to determine if user has already liked, stays -1 if not
    let ownerIndex = -1;

    // autmatically like post if there are no likes yet
    // if there are likes, search to see if given user has liked
    // if the haven't liked, add them to the list
    // if they have liked, remove them from the list (unlike)
    if (likedPost.likedBy.length === 0) {
      likedPost.likedBy.push(req.session.account._id);
    } else {
      for (let i = 0; i < likedPost.likedBy.length; i++) {
        if (req.session.account._id === likedPost.likedBy[i]) {
          ownerIndex = i;
        }
      }
      if (ownerIndex === -1) {
        likedPost.likedBy.push(req.session.account._id);
      } else {
        likedPost.likedBy.splice(ownerIndex, 1);
      }
    }

    // client must also determine if current user liked each post, so that data is sent back
    likedPost.likes = likedPost.likedBy.length;
    const savePromise = likedPost.save();
    savePromise.then(() => res.status(200).json({
      body: likedPost.body,
      likes: likedPost.likes,
      likedBy: likedPost.likedBy,
      owner: likedPost.owner,
      userLiked: (ownerIndex === -1),
      isSponsored: likedPost.isSponsored,
    }));

    savePromise.catch((err) => res.status(500).json({ err }));
  } catch (err) {
    res.status(400).json({ error: 'Error liking post' });
  }
};

module.exports.makerPage = makerPage;
module.exports.make = makePost;
module.exports.getPosts = getPosts;
module.exports.deletePost = deletePost;
module.exports.likePost = likePost;
