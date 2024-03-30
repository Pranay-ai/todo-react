import TaskCard from "./TaskCard";
export default function TaskSection({list}) {

    return(
        <div className="TaskSection">
            <div className="TaskDescription">
                <h1>{list.name}</h1>

            </div>
            <hr />
            <div className="TaskLists">
                {list.tasks.map((task, index) => {return <TaskCard key={index} tasks={task.name} />})}
            </div>
        </div>
    );
}