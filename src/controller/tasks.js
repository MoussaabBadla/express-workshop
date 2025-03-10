
import Task from "../models/task.js";



export async function getTasks(req, res) {
    try {
        const tasks = Task.find({});
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

}

export async function createTask(req, res) {
    try {
        const { name, user } = req.body;
        const task = Task.create({ name, user });
        return res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;
        const  task = Task.findByIdAndUpdate(id, { name, completed });
        return res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export  async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        Task.findByIdAndDelete(id);
        return res.status(204);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    };
}


export async function  getTask (req , res) {
    try {
        const {id } = req.params;
        const tasks = Task.findById(id);
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });   
        
    }
}

export  async function  getTaskByUser (req , res) {
    try {
        const {userId} = req.params;

        const tasks = Task.find({user: userId});
        
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}