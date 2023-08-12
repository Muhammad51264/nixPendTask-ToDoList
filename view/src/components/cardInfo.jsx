import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useColumnContext } from '../App';
import EditTask from './editTaskForm';

export default function CardInfo(props) {
  const [open, setOpen] = useState(false);
  const {allColumns,setAllColumns} = useColumnContext();

  const id = props.id;
  localStorage.setItem("ID",id);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTask = async(id)=>{
    axios.delete(`http://localhost:8080/card/delete/${id}`
    ).then(res=>{
        console.log(res.data)
        if (res.data.status === "error"){
            alert(res.data.msg)
        }else{
            setAllColumns(res.data.Columns)
        }
    }).catch(err => {
        console.error(err);
        alert(err.message);
    });
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        View           

      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle sx={{ backgroundColor: '#2c2c38', color: 'white' }}>{props.title} - <span>{props.date}</span></DialogTitle>
        <DialogContent sx={{ backgroundColor: '#2c2c38', color: 'white' ,minWidth:"250px"}}>
          <DialogContentText sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
          {props.desc} 
          </DialogContentText>

                 <DialogContentText sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
                    {props.subtask?.map((task,index)=>{

                        return(
                            <div key={index} className='d-flex justify-content-around mt-3'> 
                                <div className='mt-2'>{task.task}</div>
                                <Checkbox checked={task.done} />
                            </div>
                        )
                    })}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
          <Button onClick={handleClose}>Close</Button>
          <EditTask id={props.id} title={props.title} desc={props.desc} subtask={props.subtask}/>
          <Button data-id={id} onClick={(e)=>{
            deleteTask(e.target.dataset.id);
          handleClose()
          }} className='bg-danger text-white'>delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
