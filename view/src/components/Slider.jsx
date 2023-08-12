import { useEffect, useRef, useState } from "react";
import Columns from "./Columns";
import axios from "axios";
import AddColumn from "./addColumnForm";
import { useColumnContext } from "../App";


export default function Slider() {
  const ref = useRef(null);
  const {allColumns,setAllColumns,isLoading,setIsLoading} = useColumnContext();


  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8080/card").then(res=>{
      setAllColumns(res.data.Columns);
      localStorage.setItem("data", JSON.stringify(res.data));
      setIsLoading(false);
    }).catch(err => console.error(err));

  },[])
  return (
    <>
    
    {isLoading? (
      <div className="loading">loading ...</div>
    ) :(

      <div className="container-fluid row m-auto">
      <div className="col-12 col-sm-4 col-lg-2"></div>
      <ul ref={ref} className="slider mt-5 col-12 col-sm-8 col-lg-10">
    {allColumns.map((col)=>{
return (
  <Columns tasks={col.tasks} length={col.tasks.length} name={col.name} key={col._id}/>

)
    }
    )}

      {/* <Columns/> */}
      {/* <Columns/>
      <Columns/>
      <Columns/> */}
      {/* <div className="add__column rounded my-5 d-flex flex-column px-2 mx-3 justify-content-center align-items-center" style={{ minWidth: "300px" , width:"300px" ,height:"70vh",border:"1px solid #353541"}} >

      <h4 style={{color:"#767887"}} className="fw-bold" >+ New Column</h4>
</div> */}
<AddColumn/>




      </ul>
      </div>





    )
  }

    </>
  );
}
