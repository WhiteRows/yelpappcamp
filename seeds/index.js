//IMPORT MONGOOSE
const mongoose = require('mongoose');
//IMPORT CITIES DATA
const cities = require('./cities');
//IMPORT PLACES AND DESCRIPTORS DATA
const { places, descriptors } = require('./seedHelper');
//IMPORT MODEL
const Campground = require('../models/campground');

//CONNECTING MONGOOSE 
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//DATABASE ERROR HANDLING
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

//FUNCTION TO PICK RANDOM ITEM FROM THE GIVEN ARRAY
const sample = array => array[Math.floor(Math.random() * array.length)];


//FUNCTION TO EDIT DB
const seedDB = async () => {
    //DELETE DATA FROM DB
    await Campground.deleteMany({});
    //LOOP OVER IMPORTED DATA TO CREATE NEW RANDOM DATA 
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60750b8498a00926f804861b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sunt quibusdam neque qui corporis exercitationem, porro iusto illum aut odio, quaerat doloremque expedita ducimus? Sequi excepturi qui in corrupti animi.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/whiterows/image/upload/v1618537243/YelpCamp/rigmnnv61ruhqhgdpyjj.jpg',
                    filename: 'YelpCamp/rigmnnv61ruhqhgdpyjj'
                },
                {
                    url: 'https://res.cloudinary.com/whiterows/image/upload/v1618537243/YelpCamp/byyyssxjvhy5p1vcsfch.jpg',
                    filename: 'YelpCamp/byyyssxjvhy5p1vcsfch'
                }
            ]
        });
        //SAVE CHANGES TO DB
        await camp.save();
    }
};

//CALL FUNCTION
seedDB().then(() => {
    mongoose.connection.close();
});