const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRoutes = require("./routes/AuthRoute");
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: "../.env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 


// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// ToDo Schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

const ToDoModel = mongoose.model('Todo', todoSchema);

// Routes
app.get('/', async (req, res) => {
    try {
        const todos = await ToDoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/save', async (req, res) => {
    try {
        const { text } = req.body;
        const todo = await ToDoModel.create({ text });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/update', async (req, res) => {
    try {
        const { _id, text } = req.body;
        await ToDoModel.findByIdAndUpdate(_id, { text });
        res.json({ status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/delete', async (req, res) => {
    try {
        const { _id } = req.body;
        await ToDoModel.findByIdAndDelete(_id);
        res.json({ status: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use("/", AuthRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
