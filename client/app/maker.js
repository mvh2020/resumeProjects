// Sends a POST when a post is created (I got confused many times)
const handlePost = (e, csrf) => {
    e.preventDefault();

    $("#postMessage").animate({width:'hide'},350);

    if($("#postBody").val() == '') {
        handleError("Post text is required");
        return false;
    }

    sendAjax('POST', $("#postForm").attr("action"), $("#postForm").serialize(), redirect);

    return false;
};

// React component for the post text entry
const PostForm = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-start">
                <div className="col"></div>
                <div className="col-6">
                    <form id="postForm"
                    onSubmit={(e) => handlePost(e, props.csrf)}
                    name="postForm"
                    action="/maker"
                    method="POST"
                    className="postForm"
                    >
                        <label htmlFor="body">Post: </label>
                        <textarea className="form-control" id="postBody" name="body" placeholder="Type your post out here" rows="3"></textarea>
                        <label className="form-check-label labelSml" htmlFor="sponsored">Is this post an ad? </label>
                        <input type="checkbox" className="form-check-input" id="sponsoredCheck" name="sponsored" />
                        
                        <span className="block">
                        <input type="hidden" name="_csrf" value={props.csrf} />
                        <input className="makePostSubmit" type="submit" value="Make Post" />
                        </span>

                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

// Renders the nav and post form
const setup = (csrf) => {
    ReactDOM.render(
        <Header csrf={csrf} currentPage={"maker"} />, document.querySelector("#nav")
    );

    ReactDOM.render(
        <PostForm csrf={csrf} />, document.querySelector("#makePost")
    );
};

// GET request for the csrf token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

// Runs when the document is loaded
$(document).ready(function() {
    getToken();
});