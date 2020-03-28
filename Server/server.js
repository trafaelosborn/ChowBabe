const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();
const port = process.env.PORT || 3001;

// Body Parser middleware
app.use(express.json());
 
// DB config
const db = config.get('mongoURI');

// connect to DB
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

// use routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Server static assets if we're in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    // server index.html from public folder
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));