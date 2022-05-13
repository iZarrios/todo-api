import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true });

todoSchema.index({ createdAt: -1 }); //descending order

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;