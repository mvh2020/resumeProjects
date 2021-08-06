"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// makes a POST for logging in when login button is pressed
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#appMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  } //console.log($("input[name=_csrf]").val());


  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; // makes a POST for signing up when signup button is pressed


var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#appMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect); //console.log($("#signupForm").serialize());

  return false;
}; // React component for the pop-up login window


var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign in"
    }))
  );
}; // React component for the pop-up signup window


var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
}; // Renders the login and appropriate nav React


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, {
    csrf: csrf,
    currentPage: "login"
  }), document.querySelector("#nav"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // Renders the signup and appropriate nav React


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, {
    csrf: csrf,
    currentPage: "signup"
  }), document.querySelector("#nav"));
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // Renders the page and determines if a user is signed in or not


var setup = function setup(csrf) {
  var currentPage = getUserInfo() ? "loggedIn" : "loggedOut";
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, {
    csrf: csrf,
    currentPage: currentPage
  }), document.querySelector("#nav"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostFeed, {
    csrf: csrf,
    posts: []
  }), document.querySelector("#posts"));
  loadPostsFromServer(csrf);
}; // GET request for the csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; // Runs when the document is loaded


$(document).ready(function () {
  getToken();
}); // Helper function for checking locally stored logged in user id

var getUserInfo = function getUserInfo() {
  return localStorage.getItem('userInfo');
}; // React component for list of posts, maps post nodes to itself


var PostFeed = function PostFeed(props) {
  var _props$csrf = props.csrf,
      csrf = _props$csrf === void 0 ? false : _props$csrf;

  if (props.posts.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col"
      }), /*#__PURE__*/React.createElement("div", {
        className: "postFeed col-6"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyPost"
      }, "No posts found...")), /*#__PURE__*/React.createElement("div", {
        className: "col"
      })))
    );
  }

  var user = getUserInfo();
  var postNodes = props.posts.map(function (post) {
    return (/*#__PURE__*/React.createElement(PostNode, {
        post: post,
        user: user,
        csrf: csrf
      })
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }), /*#__PURE__*/React.createElement("div", {
      className: "postFeed col-6"
    }, postNodes), /*#__PURE__*/React.createElement("div", {
      className: "col"
    })))
  );
}; // React class for posts, displays relevent info, dynamically creates like and delete buttons


var PostNode = /*#__PURE__*/function (_React$Component) {
  _inherits(PostNode, _React$Component);

  var _super = _createSuper(PostNode);

  function PostNode(props) {
    var _this;

    _classCallCheck(this, PostNode);

    _this = _super.call(this, props); // setting class state to likedBy for access/re-rendering

    _this.state = {
      likedBy: props.post.likedBy
    };
    _this.handleLike = _this.handleLike.bind(_assertThisInitialized(_this));
    return _this;
  } // Deletes a post when the user clicks the delete button, only the user who made the post can delete it


  _createClass(PostNode, [{
    key: "handleDelete",
    value: function handleDelete(id, csrf, e) {
      e.preventDefault();
      sendAjax('POST', '/deletePost', "id=".concat(id, "&_csrf=").concat(csrf), function () {
        loadPostsFromServer(csrf);
      });
    } // Likes a post if the user clicks the like button, unlikes if user already clicked like before

  }, {
    key: "handleLike",
    value: function handleLike(id, csrf, e) {
      var _this2 = this;

      e.preventDefault();
      sendAjax('POST', '/likePost', "id=".concat(id, "&_csrf=").concat(csrf), function (data) {
        _this2.setState({
          likedBy: data.likedBy
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          post = _this$props.post,
          user = _this$props.user,
          csrf = _this$props.csrf;
      var likedText = "Like Post";
      var userLiked = false;
      var likedBy = this.state.likedBy; // Changes like button text based off whether the current user has liked this post or not

      if (user) {
        for (var i = 0; i < likedBy.length; i++) {
          if (user === likedBy[i]) userLiked = true;
        }

        likedText = userLiked ? "Unlike Post" : "Like Post";
      } // Changes post's class if it sponsored


      var postClass = "post container";
      if (post.isSponsored) postClass = "".concat(postClass, " sponsored");
      return (/*#__PURE__*/React.createElement("div", {
          key: post._id,
          className: postClass
        }, /*#__PURE__*/React.createElement("div", {
          className: "row justify-content-end"
        }, /*#__PURE__*/React.createElement("img", {
          src: "/assets/img/speech.png",
          alt: "profile icon",
          className: "profilePic col-2"
        }), /*#__PURE__*/React.createElement("h3", {
          className: "postOwner col-6"
        }, " Name: ", post.ownerName, " "), /*#__PURE__*/React.createElement("div", {
          className: "col"
        }, user && post.owner === user && /*#__PURE__*/React.createElement("button", {
          className: "deleteButton btn btn-dark",
          onClick: function onClick(e) {
            return _this3.handleDelete(post._id, csrf, e);
          }
        }, "x"))), /*#__PURE__*/React.createElement("div", {
          className: "row-6"
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-2"
        }), /*#__PURE__*/React.createElement("h3", {
          className: "postBody col-7"
        }, " ", post.body, " ")), /*#__PURE__*/React.createElement("div", {
          className: "row justify-content-start"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "postLikes col"
        }, " Likes: ", likedBy.length, " "), /*#__PURE__*/React.createElement("div", {
          className: "col-4"
        }, user && /*#__PURE__*/React.createElement("button", {
          className: "likeButton btn btn-light",
          onClick: function onClick(e) {
            return _this3.handleLike(post._id, csrf, e);
          }
        }, likedText))))
      );
    }
  }]);

  return PostNode;
}(React.Component); // Requests posts from the server, then renders them in the post feed


var loadPostsFromServer = function loadPostsFromServer(csrf) {
  sendAjax('GET', '/getPosts', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PostFeed, {
      csrf: csrf,
      posts: data.posts
    }), document.querySelector("#posts"));
  });
};
"use strict";

// React component for the navigation header
var Header = function Header(props) {
  // knows if logged in, logging in, signing up, making post
  var currentPage = props.currentPage,
      csrf = props.csrf;

  var handleLogin = function handleLogin(e) {
    e.preventDefault();
    createLoginWindow(csrf);
  };

  var handleSignup = function handleSignup(e) {
    e.preventDefault();
    createSignupWindow(csrf);
  }; // Solves an issue of log out button not redirecting properly


  var handleLogout = function handleLogout(e) {
    e.preventDefault();
    sendAjax('GET', '/logout', null, redirect);
  };

  var loginButton = /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    role: "button",
    onClick: handleLogin,
    id: "loginButton",
    href: "/login"
  }, "Log in"));
  var signupButton = /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    role: "button",
    onClick: handleSignup,
    id: "signupButton",
    href: "/signup"
  }, "Sign up"));
  var backButton = /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    role: "button",
    href: "/"
  }, "Back"));
  var makerButton = /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    role: "button",
    href: "/maker"
  }, "Make a Post"));
  var logoutButton = /*#__PURE__*/React.createElement("div", {
    className: "navlink"
  }, /*#__PURE__*/React.createElement("a", {
    role: "button",
    onClick: handleLogout,
    href: "/logout"
  }, "Log out")); // Determines which buttons to show based on the current page

  return (/*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
      href: "/"
    }, /*#__PURE__*/React.createElement("img", {
      id: "logo",
      src: "/assets/img/doc.png",
      alt: "doc logo"
    })), currentPage === "loggedOut" && [loginButton, signupButton], currentPage === "login" && [backButton, signupButton], currentPage === "signup" && [backButton, loginButton], currentPage === "loggedIn" && [makerButton, logoutButton], currentPage === "maker" && [backButton, logoutButton])
  );
};
"use strict";

// Sets the text of an alert and animates it coming out of the left side of the screen
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#appMessage").animate({
    width: 'toggle'
  }, 350);
}; // Sets the current user in local storage and redirects to the given location
// This method of passing the user id can cause a desync between server and client
//      on the logged in state. I was unable to find any solutions that didn't take
//      me down a rabbit hole.


var redirect = function redirect(response) {
  $("#appMessage").animate({
    width: 'hide'
  }, 350);
  localStorage.setItem('userInfo', response.userId);
  window.location = response.redirect;
}; // Parses data from requests on the client and sends them to the server


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
