// React component for the navigation header
const Header = (props) => {
    // knows if logged in, logging in, signing up, making post
    const {currentPage, csrf} = props;

    const handleLogin = (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
    };

    // Solves an issue of log out button not redirecting properly
    const handleLogout = (e) => {
        e.preventDefault();
        sendAjax('GET', '/logout', null, redirect);
    };

    const loginButton = <div className="navlink"><a role="button" onClick={handleLogin} id="loginButton" href="/login">Log in</a></div>;
    const signupButton = <div className="navlink"><a role="button" onClick={handleSignup} id="signupButton" href="/signup">Sign up</a></div>;
    const backButton = <div className="navlink"><a role="button" href="/">Back</a></div>;
    const makerButton = <div className="navlink"><a role="button" href="/maker">Make a Post</a></div>;
    const logoutButton = <div className="navlink"><a role="button" onClick={handleLogout} href="/logout">Log out</a></div>;

    // Determines which buttons to show based on the current page
    return (
        <nav>
            <a href="/"><img id="logo" src="/assets/img/doc.png" alt="doc logo"/></a>
            {currentPage === "loggedOut" &&
                [loginButton, signupButton]
            }
            {currentPage === "login" &&
                [backButton, signupButton]
            }
            {currentPage === "signup" &&
                [backButton, loginButton]
            }
            {currentPage === "loggedIn" &&
                [makerButton, logoutButton]
            }
            {currentPage === "maker" &&
                [backButton, logoutButton]
            }
        </nav>
    );
}