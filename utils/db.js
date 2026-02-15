import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

/** * Global is used here to maintain a cached connection across hot-reloads 
 * in development and multiple worker threads during build.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    // If we already have a connection, return it
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('\n--- MongoDB connected successfully ---');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('Error connecting to MongoDB: ', e);
        throw e;
    }

    return cached.conn;
}


export const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('\nMongoDB disconnected successfully');
        } else {
            console.log('\nMongoDB already disconnected');
        }
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB: ', error);
        process.exit(1);
    }
}