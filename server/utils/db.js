import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_DB = process.env.MONGO_DB_URL;
        await mongoose.connect(MONGO_DB);
        console.log('MongoDB Connected');
    }
    catch (error) {
        console.error(error.message);
    }
}

export default connectDB;