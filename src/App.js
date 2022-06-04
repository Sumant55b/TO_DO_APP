import { Card, Grid, Paper, TextField, Button, Typography,Checkbox, List, ListItemIcon, ListItem, } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './App.css';
// const todo = [
//   {
//     id:1,
//     title:"buy a milk",
//     status:true,
//   },
//   {
//     id:2,
//     title:"call rohan",
//     status:true,
//   },
//   {
//     id:3,
//     title:"buy phone cover",
//     status:false,
//   },
// ]



function App() {
  const [task,setTask] = useState("");  //add task
  const [data,setData] = useState(()=>{
    let saveTodo = localStorage.getItem("todo");

    if(saveTodo){
      return JSON.parse(saveTodo);
    }else{
      return [];
    }
  });  //

useEffect(()=>{
  localStorage.setItem("todo",JSON.stringify(data))
  
},[data]);

  //Function for insert data
  const handleInsert=()=>{
    setData([...data,{id:data.length+1,title:task,status:false}]);
    setTask("");
  }

  //Function for delete data
  const handleDelete = (id)=>{
      setData(data.filter((sVar) => sVar.id !== id));
  }

  //update function
  const handleChecked=(id,status)=>{
    if(!status){
      setData(data.map((item)=>(item.id===id)?{...item,status:true}:item))
    }else{
      setData(data.map((item)=>(item.id===id)?{...item,status:false}:item))
    } 
    
  }
  return (
    <>
      <Container>
        <Grid container sx={{justifyContent:"center"}}>
          <Grid item lg={6}>
            <Typography variant='h2' sx={{color:"#6F532A",textAlign:"center"}}>TO DO App</Typography>
          <Card sx={{height:600}}>
            <Paper elevation={3} sx={{display:"flex",gap:1,padding:1}}>
              <TextField autoFocus sx={{width:"80%"}} placeholder="e.g buy a milk, calll rohan etc." value={task} onChange={(e) => setTask(e.target.value)}/>
              <Button variant="contained" color='success' onClick={handleInsert} startIcon={<AddTaskIcon/>}>Add</Button>
            </Paper>
            <Card>
                <List>
                  {
                    data.map((item,key)=> (
                      <ListItem key={key} secondaryAction={
                        <Button variant='contained' color='error' onClick={()=>handleDelete(item.id)}>Delete</Button>
                      }>
                        <ListItemIcon>
                          {
                            !(item.status)?
                            <Checkbox  onChange={()=>handleChecked(item.id,item.status)}/>:
                            <Checkbox defaultChecked onChange={()=>handleChecked(item.id,item.status)}/>
                          }
                        </ListItemIcon>
                          {(!item.status) && item.title}
                          {(item.status) && <del>{item.title}</del>}
                      </ListItem>
                    ))
                  }
                </List>
            </Card>
          </Card> 
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
