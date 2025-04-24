import Tasks from '../../../DB/Models/task.model.js'
import { DateTime } from 'luxon';
import User from '../../../DB/Models/user.model.js';


export const getAllTasks = async (req, res) => 
{
    const user = req.authUser._id;

    var { status, priority, dueDate, page, limit } = req.query;
    const query = {  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false };

    if (status)
        query.status = status;
    if (priority)
        query.priority = priority;
    if (dueDate)
    {
        const date = DateTime.fromISO(dueDate);
        if (date.isValid)
            query.dueDate = date.toJSDate();
        else
            return res.status(400).json({message: "Invalid date format"});
    }
    if (!page)
        page = 1;
    if (!limit)
        limit = 10;
    const tasks = await Tasks.find(query).skip((page - 1) * limit).limit(limit);
    if (!tasks || tasks.length === 0)
        return res.status(404).json({message: "No tasks found"})
    res.status(200).json(tasks);
}

export const createTask = async (req, res) => 
{
    var { title, description, assignedTo, priority, dueDate} = req.body;
    
    const user = req.authUser._id;
    const status = "pending";

    if (dueDate && DateTime.fromISO(dueDate) < DateTime.now())
        status = "completed";
    if (!priority)
        priority = "low";
    if (!dueDate)
        return res.status(400).json({message: "Date is required"});
    if (!assignedTo)
        assignedTo = user;
    
    const isUserExist = await User.findById(assignedTo);
    if (!isUserExist)
        return res.status(404).json({message: "User not found"});
    
    const task = await Tasks.create({title, description, assignedTo, priority, dueDate, status,  createdBy: user});
    res.status(201).json({message: "task created successfuly", task});
}

export const getTaskById = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false});
    if (!task)
        return res.status(404).json({message: "Task not found"});
    res.status(200).json({message: "task found", task});
}

export const updateTask = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false });
    if (!task)
        return res.status(404).json({message: "Task not found"});
    
    const {title, description, assignedTo, dueDate} = req.body;
    if (title)
        task.title = title;
    if (description)
        task.description = description;
    if (dueDate && DateTime.fromISO(dueDate) < DateTime.now())
        task.status = "completed", task.dueDate = dueDate;
    if (dueDate)
        task.dueDate = dueDate;
    if (assignedTo)
    {
        const isUserExist = await User.findById(assignedTo);
        if (!isUserExist)
            return res.status(404).json({message: "User not found"});
        task.assignedTo = assignedTo;
    }
    
    const updatedTask = await task.save();
    res.status(200).json({message: "task updated successfuly", updatedTask});
}

export const deleteTask = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false });
    if (!task)
        return res.status(404).json({message: "Task not found"});
    
    task.isDeleted = true;
    const deletedTask = await task.save();
    if (!deletedTask)
        return res.status(500).json({message: "Error deleting task"});
    res.status(200).json({message: "task deleted successfuly"});
}

export const completeTask = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false });
    if (!task)
        return res.status(404).json({message: "Task not found"});
    
    task.status = "completed";
    const updatedTask = await task.save();
    if (!updatedTask)
        return res.status(500).json({message: "Error completing task"});
    res.status(200).json({message: "task completed successfuly"});
}

export const uncompleteTask = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false });
    if (!task)
        return res.status(404).json({message: "Task not found"});
    task.status = "in progress";
    const updatedTask = await task.save();
    if (!updatedTask)
        return res.status(500).json({message: "Error uncompleting task"});
    res.status(200).json({message: "task uncompleted successfuly"});
}


export const updatePriority = async (req, res) =>
{
    const { id } = req.params;
    const user = req.authUser._id;
    const task = await Tasks.findOne({_id: id,  $or: [{ createdBy: user }, { assignedTo: user }], isDeleted: false });
    if (!task)
        return res.status(404).json({message: "Task not found"});
    
    const {priority} = req.body;
    if (priority)
        task.priority = priority;
    
    const updatedTask = await task.save();
    if (!updatedTask)
        return res.status(500).json({message: "Error updating task"});
    res.status(200).json({message: "task updated successfuly", updatedTask});
}