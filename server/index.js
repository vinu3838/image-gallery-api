const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const requestIpLogger = require('./middleware/resposeIpLogger');
const errorHandling = require('./middleware/errorHandling');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(requestIpLogger);
app.use(helmet());

// eslint-disable-next-line no-undef
app.use('/uploads', express.static(`${process.env.IMAGE_UPLOAD_DIRECTORY}`));
app.use('/user', userRoutes);
app.use('/image', imageRoutes);

app.use(errorHandling);

// eslint-disable-next-line no-undef
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => {
        console.log(err);
    });

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Listening on port ${process.env.PORT}`);
});
