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

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const {allColumns,setAllColumns} = useColumnContext();
  const [column,setColumn] = useState("");
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");

  const apendColumn = async ()=>{
    axios.post("http://localhost:8080/card/add",

    {
        title: title,
        desc: desc,
        column:column,
        date: new Date(),
        subtask: []
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

<Button sx={{display:{ xs: 'none', sm: 'block' }}} variant="contained" style={{background:"#5c59c3",borderRadius:"50px"}} onClick={handleClickOpen}>
            <AddIcon/>
            Add new Task</Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent sx={{ backgroundColor: '#2c2c38', color: 'white' ,minWidth:"250px"}}>
          <DialogContentText sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
            Add Task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
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
            type="text"
            fullWidth
            variant="standard"
            InputProps={{ sx: { color: 'white' } }}
            onChange={(e)=>{setDesc(e.target.value)}}
          />
      <FormControl fullWidth sx={{marginTop:"10px"}}>
        <InputLabel id="demo-simple-select-label">Column</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={column}
          label="Column"
          onChange={(e)=>{setColumn(e.target.value)}}
        >
            {allColumns.map((col)=>(
            <MenuItem value={col.name} key={col._id}>{col.name}</MenuItem>

            ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{
            apendColumn()

            handleClose()
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
