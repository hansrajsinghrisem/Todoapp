import Tasks from "../Schemas/taskSchema.js";

export const CreateTask = async (req, res) => {
    try {
        const { Task, Description } = req.body
        if (!Task || !Description) {
            return res.status(400).json({ message: "Please fill in all fields." })
        }
        const newTask = await Tasks.create({ Task, Description });
        res.status(201).json({ message: "Task created successfully", newTask })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating task." })
    }
};

export const GetTask = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error fetching the task list" })
    }
}

export const editTask = async (req, res) => {
    try {
        const { id, Task, Description, Status } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }
        const updatedTask = await Tasks.findByIdAndUpdate(
            id,
            { Task, Description, Status },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id required" })
        }
        const deleteTask = await Tasks.findByIdAndDelete(id)
        if (!deleteTask) {
            return res.status(404).json({ message: "task not found or deleted already" })
        }
        return res.status(200).json({ message: "deleted succesfully" })
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
}