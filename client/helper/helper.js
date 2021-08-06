// Sets the text of an alert and animates it coming out of the left side of the screen
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#appMessage").animate({width:'toggle'}, 350);
};

// Sets the current user in local storage and redirects to the given location
// This method of passing the user id can cause a desync between server and client
//      on the logged in state. I was unable to find any solutions that didn't take
//      me down a rabbit hole.
const redirect = (response) => {
    $("#appMessage").animate({width:'hide'}, 350);
    localStorage.setItem('userInfo', response.userId);
    window.location = response.redirect;
};

// Parses data from requests on the client and sends them to the server
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};