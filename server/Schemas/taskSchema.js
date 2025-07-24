import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    Task: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Tasks = mongoose.models.Tasks || mongoose.model('Tasks', taskSchema);
export default Tasks;