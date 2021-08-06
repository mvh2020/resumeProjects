// redirects to login if a url requires logged out user to be logged in
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/login');
  }
  return next();
};

// multiple pages use logged in users, so this method does nothing in the meantime
const requiresLogout = (req, res, next) => {
  next();
};

// ensures users are validated before entering a url
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

// allows unsecure redirects when not in production environment
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
