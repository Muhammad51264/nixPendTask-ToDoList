const mongoose = require ("mongoose");

const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    tasks: [
        {
            title: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            subtask: [
                {
                    task: {
                        type: String,
                        required: true,
                    },
                    done: {
                        type: Boolean,
                        required: true,
                    },
                },
            ]
        }
    ]
});

const Column = new mongoose.model("columns", columnSchema);

module.exports = Column;
