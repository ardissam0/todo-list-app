import React, {useState} from 'react';
import './Todo.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    };

    return (
        <>
        <Modal style={{margin: '10% 25% auto', position: 'absolute', top: '25%'}} 
            open={open}
            onClose={e => setOpen(false)}
        >
            <form>
            <div style={{border: '10px solid #3F51B5',textAlign: 'center'}}  className={classes.paper}>
                <input placeholder = {props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button type='submit' style={{marginLeft: '10px'}} onClick={updateTodo}>Update</Button>
            </div>
            </form>
        </Modal>
        <List style={{display: 'inline-block',}}>
            <ListItem>
                <ListItemText primary={props.todo.todo} /> 
            </ListItem>
            <EditIcon style= {{cursor: 'pointer'}} onClick={e => setOpen(true)} />
            <DeleteForeverIcon style= {{cursor: 'pointer'}} onClick={event => db.collection('todos').doc(props.todo.id).delete()}/> 
        </List>
        </>
    )
}

export default Todo
