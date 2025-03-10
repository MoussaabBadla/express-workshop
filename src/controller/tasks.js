
import Task from "../models/task.js";



export async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
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
        const task = new Task({ name, user });
        await task.save();
        if (!task) {
            return res.status(400).json({ message: 'Task not created' });
        }
        return res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;
        const  task = await Task.findByIdAndUpdate(id, { name, completed } , {new: true});
        return res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export  async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        await Task.findByIdAndDelete(id);
        console.log(id);
         res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}


export async function  getTask (req , res) {
    try {
        const {id } = req.params;
        const tasks = await Task.findById(id);
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

        const tasks = await Task.find({user: userId}).populate('user');
        
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' });
        }

        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}