"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Operations() {
  const [Data, setData] = useState({ Task: "", Description: "" });
  const [TaskList, setTaskList] = useState([]);
  const [EditTask, setEditTask] = useState(null);

  async function prepareChange(tasks) {
    setData({ Task: tasks.Task, Description: tasks.Description });
    setEditTask(tasks._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function getTask() {
    try {
      const Get = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list`);
      setTaskList(Get.data.tasks);
    } catch (error) {
      toast.error("Failed loading tasks");
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  async function updateTask() {
    try {
      const Edit = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/edit`, {
        id: EditTask,
        Task: Data.Task,
        Description: Data.Description,
      });
      if (!Edit) {
        toast.error("Task not updated");
      } else {
        toast.success("Task updated successfully");
        getTask();
        setEditTask(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(userid) {
    try {
      const Delete = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete`, {
        data: { id: userid },
      });
      if (Delete) {
        toast.success("Task deleted successfully");
        getTask();
      }
    } catch (err) {
      toast.error("Task deletion failed");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (EditTask) {
        updateTask();
      } else {
        const Send = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add`, Data);
        toast.success("Task created");
        getTask();
      }
      setData({ Task: "", Description: "" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  function handleChange(e) {
    setData({ ...Data, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] p-6 flex flex-col items-center gap-6 transition-all">
      <h1 className="text-3xl font-bold text-[#00ADB5]">To-Do List Web App by Hansraj</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#393E46] p-6 rounded-xl w-full max-w-xl flex flex-col gap-4 shadow-md transition-all duration-300"
      >
        <input
          name="Task"
          placeholder="Enter the task"
          value={Data.Task}
          onChange={handleChange}
          className="bg-[#222831] text-[#EEEEEE] placeholder:text-[#EEEEEE99] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all"
        />
        <input
          name="Description"
          placeholder="Enter the description"
          value={Data.Description}
          onChange={handleChange}
          className="bg-[#222831] text-[#EEEEEE] placeholder:text-[#EEEEEE99] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all"
        />
        <button
          type="submit"
          className="bg-[#00ADB5] text-[#EEEEEE] font-medium py-2 rounded-md hover:bg-[#00cfd3] transition-all duration-300"
        >
          {EditTask ? "Save" : "Add"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold border-b border-[#00ADB5] pb-1">Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {TaskList.map((tasks) => (
          <div
            key={tasks._id}
            className="bg-[#393E46] p-4 rounded-lg shadow-md transition hover:scale-[1.01]"
          >
            <h3 className="text-xl font-semibold text-[#00ADB5] break-words">{tasks.Task}</h3>
            <p className="text-[#EEEEEE] break-words">{tasks.Description}</p>
            <div className="mt-2 flex gap-3 flex-wrap">
              <button
                onClick={() => prepareChange(tasks)}
                className="bg-[#00ADB5] text-[#EEEEEE] px-3 py-1 rounded hover:bg-[#00cfd3] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tasks._id)}
                className="bg-red-500 text-[#EEEEEE] px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Operations;