Test project to learn Express.js. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server.<br />
Default port is 3001. You can set it in `corsOptions` in index.js

## Description


First the Passport.js Middleware checks if the user is authorized or not.<br />

Once you authorized, you get access for dataStorage API.
Allow cookies in your browser to work your app properly.<br />

Set API in your app to connect via [http://localhost:3001/api/calendarData](http://localhost:3001/api/calendarData) to get data.


The page will reload if you make edits.<br />
You will also see any lint errors in the console.

This server provides data for [Test React App](https://github.com/Nylevyy/travelBlog). Be sure to set your CORS settings (`corsOptions`) are valid for your main app.<br />

