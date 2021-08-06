# Resume Projects
This repository exists to display projects made by Matt Hoffman for employers to take a look at. The current project is a <a href='https://fullstack-project-matt-hoffman.herokuapp.com/'>fullstack social media clone</a> based around basic twitter features. It uses React pages along with a Redis store and Mongoose schemas to interact with a MongoDB Atlas database.

<b><a href='https://fullstack-project-matt-hoffman.herokuapp.com/'>Fullstack Social Media Clone</a></b>

This is a screenshot of the home page. It displays all stored forum posts in chronological order. Posts can be liked once a user logs in.
![Home Page](/media/readmeImages/mainPage.PNG)

This is the account signup widget, which drops down from the top of the home page. Passwords have to match between the inputs before the account is made. Passwords are encrypted using salt generated hashes. Posts are validated using CSRF tokens. Accounts are structured using Mongoose schemas before being sent to the database.
![Sign Up Page](/media/readmeImages/signUp.PNG)

Once logged in, users can make posts, like and then unlike posts, delete their posts, and log out.
![Logged In Page](/media/readmeImages/loggedIn.PNG)

Creating posts is simple. The inputted text is used as the body of the post and is ascribed to the user. Forum posts are also formatted with schemas, but don't undergo any encryption. Selecting the advertisement checkbox will highlight the post with a black border as seen in the first image on this file. This is a basic prototype for monotization of the app.
![Post Maker Page](/media/readmeImages/postMaker.PNG)

Feel free to test this app out yourself using the link I've provided near the top of the page. You can try making an account and liking/creating posts, or simply observe the app as it is. Also take a look at the code if you'd like! If you have any questions about the code, I'd love to answer them, preferably during an interview. I've spent quite a lot of time turning this from a simple college assignment, to a final project, to a resume piece, so I hope you enjoy exploring it!
