import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardInfo from './cardInfo';



export default function BasicCard(props) {
  const desc=props.desc;
  const date=props.date;
  const id = props.id;
  return (
    <Card sx={{ minWidth: 225 ,backgroundColor:"#2c2c38",color:"white"}}>
      <CardContent>

        <Typography variant="h5" component="div">
            {props.title}
        </Typography>
        <Typography sx={{color:"#767887"}} color="text.secondary">
        {props.length? `${props.completedTasks} out of ${props.length}` : ""}   
        </Typography>
        <CardInfo title={props.title} desc={desc} date={date} subtask={props.subtask} id={id}/>

      </CardContent>
    </Card>
  );
}