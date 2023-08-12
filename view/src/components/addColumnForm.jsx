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

export default function AddColumn() {
  const [open, setOpen] = useState(false);
  const [columnName,setColumnName] = useState("");
  const {allColumns,setAllColumns} = useColumnContext();

  const apendColumn = async ()=>{
    axios.post("http://localhost:8080/card/addcolumn",
    {name:columnName,tasks:[]}).then(res=>{
        console.log(res.data)
        if (res.data.status === "error"){
            alert(res.data.msg)
        }else{
            setAllColumns(res.data.Columns);
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
      <div className="add__column rounded d-flex flex-column px-2 mx-3 justify-content-center align-items-center" style={{ minWidth: "300px" , width:"300px" ,height:"70vh",border:"1px solid #353541",marginTop:"90px"}} 
      onClick={handleClickOpen}
      >

<h4 style={{color:"#767887"}} className="fw-bold" >+ New Column</h4>
</div>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent sx={{ backgroundColor: '#2c2c38', color: 'white' ,minWidth:"250px"}}>
          <DialogContentText sx={{ backgroundColor: '#2c2c38', color: 'white' }}>
            Add Column
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="column"
            type="email"
            fullWidth
            variant="standard"
            InputProps={{ sx: { color: 'white' } }}
            onChange={(e)=>{setColumnName(e.target.value)}}
          />

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
