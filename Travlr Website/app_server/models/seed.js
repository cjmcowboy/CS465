
const mongoose = require('mongoose');
const Trip = require('../database/models/trips');
const tripsData = require('../../data/trips.json');

// Connect to the Travlr database
mongoose.connect('mongodb://localhost:27017/travlr')
    .then(async () => {
        console.log('Connected to MongoDB');

        try {
            // Remove existing trip records
            await Trip.deleteMany({});

            // Convert the JSON object into an array
            const trips = Object.values(tripsData);

            // Insert the trip records
            await Trip.insertMany(trips);

            console.log(`Successfully inserted ${trips.length} trips`);
        } catch (error) {
            console.error('Error seeding trips:', error);
        } finally {
            await mongoose.connection.close();
            console.log('Database connection closed');
        }
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
    });
