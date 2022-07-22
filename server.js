const express = require('express');

// creating an express server
const app = express();

// sets up the port to use
const PORT = process.env.PORT || 3001;

// parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connecting routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`PORT: ${PORT} is being used.`);
});
