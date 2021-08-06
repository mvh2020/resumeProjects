"use strict";

// Sends a POST when a post is created (I got confused many times)
var handlePost = function handlePost(e, csrf) {
  e.preventDefault();
  $("#postMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#postBody").val() == '') {
    handleError("Post text is required");
    return false;
  }

  sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), redirect);
  return false;
}; // React component for the post text entry


var PostForm = function PostForm(props) {
  return (/*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }), /*#__PURE__*/React.createElement("div", {
      className: "col-6"
    }, /*#__PURE__*/React.createElement("form", {
      id: "postForm",
      onSubmit: function onSubmit(e) {
        return handlePost(e, props.csrf);
      },
      name: "postForm",
      action: "/maker",
      method: "POST",
      className: "postForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "body"
    }, "Post: "), /*#__PURE__*/React.createElement("textarea", {
      className: "form-control",
      id: "postBody",
      name: "body",
      placeholder: "Type your post out here",
      rows: "3"
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label labelSml",
      htmlFor: "sponsored"
    }, "Is this post an ad? "), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "form-check-input",
      id: "sponsoredCheck",
      name: "sponsored"
    }), /*#__PURE__*/React.createElement("span", {
      className: "block"
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makePostSubmit",
      type: "submit",
      value: "Make Post"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "col"
    })))
  );
}; // Renders the nav and post form


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, {
    csrf: csrf,
    currentPage: "maker"
  }), document.querySelector("#nav"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PostForm, {
    csrf: csrf
  }), document.querySelector("#makePost"));
}; // GET request for the csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; // Runs when the document is loaded


$(document).ready(function () {
  getToken();
});
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
