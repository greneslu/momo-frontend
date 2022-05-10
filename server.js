
// const express = require('express');
// const compression = require('compression');
// const path = require('path');
// const app = express();


// app.use(compression());
// app.use(express.static(path.join(__dirname, 'build')));


// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`App is running on port ${PORT}`);
// });
const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 3000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11