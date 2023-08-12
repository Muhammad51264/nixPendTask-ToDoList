import TaskIcon from '@mui/icons-material/Task';
import BasicCard from './card';

const Columns = (props) => {
    const handleDragStart = (e) => e.preventDefault();
    // console.log(props.tasks);
  return (
    // <div className="mt-2 d-flex flex-row justify-content-center mx-auto px-4 overflow-x-auto gap-5" style={{height:"89.8vh"}}>

    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>

    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>
    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>
    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>
    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>
    //     <div className="border rounded shadow my-5 d-flex flex-column px-3" style={{ minWidth: "250px" }}>
    //         <div className="mt-1 text-center border">
    //             <TaskIcon/>
    //         </div>
    //         <div className="mt-1 text-center border">

    //             <BasicCard/>
    //         </div>

    //     </div>




    // </div>

    <div className="rounded my-5 d-flex flex-column px-2 mx-3" style={{ minWidth: "300px" , width:"300px"}} onDragStart={handleDragStart}>
    <div className="mt-1 text-center">
        <h5 style={{color:"#767887"}}><TaskIcon sx={{color:"white"}}/>
        
         <span>{props.name} ({props.length})</span>  
        
        </h5>
    </div>

    <div className="mt-1 text-center d-flex flex-column gap-2">
    {props.length ? "":(
            <div className="add__column rounded d-flex flex-column px-2 mx-3 justify-content-center align-items-center" style={{ minWidth: "300px" , width:"300px" ,height:"70vh",border:"1px solid #353541"}}>
      
      <h4 style={{color:"#767887"}} className="fw-bold" >Empty</h4>
      </div>
    )}
    {props.tasks?.map((task) => {

let completedSubTasks = task.subtask.reduce((acc, subtask) => {
  if (subtask.done === true) {
    return acc + 1; 
  } else {
    return acc; 
  }
}, 0); 

     return (
  <BasicCard key={task._id} id={task._id} length={task.subtask.length} title={task.title} completedTasks={completedSubTasks} desc={task.desc} date={task.date} subtask={task.subtask}/>
)
      }
)}

        {/* <BasicCard/> */}

    </div>

</div>
  )
}

export default Columns;
