import logo from "./logo.svg";
import "./App.css";
import TaskCard from "./components/taskCard";
import { useEffect, useState } from "react";
import { create, readAll, updateById } from "./api";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState([]);

  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);

  const getAllData = async () => {
    const data = await readAll();
    console.log(data);
    setTasks(data.data);
  };

  const [newTaskValue, setNewTaskValue] = useState();

  const addTask = async () => {
    const data = {
      position: tasks.length + 1,
      description: newTaskValue,
      isComplete: false,
    };
    await create(data);
    setNewTaskValue("");
    getAllData();
  };
  useEffect(() => {
    getAllData();
  }, []);

  const handleDrop = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) {
      return;
    }
    const newCol = [...tasks];
    const [removed] = newCol.splice(source.index, 1);
    newCol.splice(destination.index, 0, removed);
    setTasks(newCol);
    updateList();
  };

  const updateListItem = async (id, data) => {
    await updateById(id, data);
  };

  const updateList = () => {
    console.log("tasks updated frontend: ", tasks);
    // Promise.all(
    //   tasks.map((item, index) => {
    //     console.log("hiiiiii, ", item);
    //     return updateListItem(item._id, { position: index + 1 });
    //   })
    // ).then(() => {
    //   getAllData();
    // });
    // for (var i = 0; i < tasks.length; i++) {
    //   console.log("hiiiiii, ", tasks[i]);
    //   updateListItem(tasks[i]._id, { position: i + 1 });
    // }
  };
  return (
    <div className="background min-h-screen p-8">
      <div className="bg-transparent min-h-full min-w-full rounded-md px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-purple-300 pb-8">
          Tasks-<spam className="text-purple-500">List</spam>
        </h1>
        {isTextBoxOpen ? (
          <div className="w-full shadow-md rounde-md flex justify-between px-4 py-2 border items-center">
            <div className="flex space-x-4">
              <div>{tasks.length + 1}</div>
              <div>
                <input
                  onChange={(e) => {
                    setNewTaskValue(e.target.value);
                  }}
                  className="outline-none border-b w-full"
                  placeholder="write here....."
                  type="text"
                />
              </div>
            </div>
            <div
              className="cursor-pointer bg-indigo-600 rounded-md px-8 py-1 text-white shadow-lg"
              onClick={() => {
                addTask();
                setIsTextBoxOpen(false);
              }}
            >
              Add
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsTextBoxOpen(true);
            }}
            className="bg-indigo-200 rounded-md px-8 py-2 text-black shadow-lg"
          >
            Add Task
          </div>
        )}
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <div
                className="w-full pt-4 flex flex-col space-y-2"
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {/* cards */}
                {tasks.map(
                  ({ position, description, isComplete, _id }, index) => (
                    <Draggable
                      key={`${_id}`}
                      draggableId={`${_id}`}
                      className="rounded-xl "
                      index={index}
                    >
                      {(draggableProvided) => (
                        <div
                          className="rounded-xl"
                          key={_id}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <TaskCard
                            position={position}
                            description={description}
                            isComplete={isComplete}
                            id={_id}
                            getAllData={getAllData}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
