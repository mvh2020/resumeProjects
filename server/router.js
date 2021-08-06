const controllers = require('./controllers');
const mid = require('./middleware');

// Note that requiresLogout does not currently do anything as multiple pages require log in

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPosts', controllers.ForumPost.getPosts);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.ForumPost.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.ForumPost.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.post('/deletePost', mid.requiresLogin, controllers.ForumPost.deletePost);
  app.post('/likePost', mid.requiresLogin, controllers.ForumPost.likePost);
};

module.exports = router;
