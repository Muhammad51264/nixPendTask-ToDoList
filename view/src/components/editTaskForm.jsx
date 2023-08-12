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
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useColumnContext } from '../App';

export default function EditTask(props) {
  const [open, setOpen] = useState(false);
  const {allColumns,setAllColumns} = useColumnContext();
  const [column,setColumn] = useState("");
  const [title,setTitle] = useState(props.title);
  const [desc,setDesc] = useState(props.desc);
  const [subtask,setSubtask] = useState(props.subtask);
  const [id,setId] = useState(props.id);
  const [newSubTask,setNewSubtask] = useState("");
  const [newSubTaskDone,setNewSubtaskDone] = useState(false);
  const edit = async (id)=>{
    console.log(id)
    axios.put(`http://localhost:8080/card/edit/${localStorage.getItem("ID")}`,
    {
        title: title,
        desc: desc,
        column:column,
        "date": new Date(),
        "subtask": subtask
      }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

<Button sx={{display:{ xs: 'none', sm: 'block' }}} variant="contained" style={{background:"#2c28a8"}} onClick={handleClickOpen}>
            Edit</Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent sx={{ backgroundColor: '#2c2c38', color: 'white' ,minWidth:"250px"}}>
          <DialogContentText sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
            Edit Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={title}
            label="title"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{ sx: { color: 'white' } }}
            onChange={(e)=>{setTitle(e.target.value)}}
          />

<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            value={desc}
            type="text"
            fullWidth
            variant="standard"
            InputProps={{ sx: { color: 'white' } }}
            onChange={(e)=>{setDesc(e.target.value)}}
          />

{subtask?.map((task,index)=>{

return(
    <div key={index} className='d-flex gap-1'>
    
    <TextField 
    autoFocus
    margin="dense"
    id="name"
    label="Description"
    value={task.task}
    type="text"
    fullWidth
    variant="standard"
    InputProps={{ sx: { color: 'white' } }}
    onChange={(e)=>{
        task.task=e.target.value;
        setSubtask([...subtask])
    }}
    
    > 
    </TextField>
    <Checkbox checked={task.done}
    onClick={()=>{
        task.done = !task.done;
        setSubtask([...subtask]);
    }}
    />

    </div>

)
})}
    <div className='d-flex gap-1'>
<TextField 
    autoFocus
    margin="dense"
    id="name"
    label="new SubTask"
    type="text"
    fullWidth
    variant="standard"
    InputProps={{ sx: { color: 'white' } }}
    onChange={(e)=>{
        setNewSubtask(e.target.value);
    }}
    /> 
    <Checkbox checked={newSubTaskDone}
    onClick={()=>{setNewSubtaskDone(!newSubTaskDone)}}/>

</div>


      <FormControl fullWidth sx={{marginTop:"10px"}}>
        <InputLabel id="demo-simple-select-label">Column</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={column}
          label="Column"
          required
          onChange={(e)=>{setColumn(e.target.value)}}
        >
            {allColumns.map((col)=>(
            <MenuItem value={col.name} key={col._id}>{col.name}</MenuItem>

            ))}

        </Select>
      </FormControl>

        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#2c2c38', color: 'white' }}>


        <Button onClick={()=>{
            let addedSubTask={task: newSubTask,done: newSubTaskDone}
            setSubtask([...subtask,addedSubTask]);
            console.log(subtask);
        }}>add sub Task</Button>

          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{
            edit()

            handleClose()
          }}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
