const mongoose = require('mongoose');

const ConnectDb = (handler) => async (req, res) => {
    try {
        // Check if there is already a connection
        if (mongoose.connection.readyState !== 1) {
            // If not connected, establish a new connection
            await mongoose.connect(process.env.MONGO_URL);
        }

        // Connection successful, execute the handler
        return await handler(req, res);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // You might want to handle this error appropriately in your application
    }
};

export default ConnectDb;
