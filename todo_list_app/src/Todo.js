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

const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        margin: '10% 30% auto',
        minWidth: 400,
        backgroundColor: 'white',
        border: '10px solid #3F51B5',
        padding: '1%',
        textAlign: 'center',
        ['@media (max-width: 750px)'] : {
            minWidth: 200,
            margin: '10% 20% auto',
            padding: '2%',
        }
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    };

    return (
        <>
        <Modal style={{verticalAlign: 'baseline'}}
            open={open}
            onClose={e => setOpen(false)}
        >
            <form>
            <div className={classes.paper}>
                <input placeholder = {props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button type='submit' style={{marginLeft: '10px'}} onClick={updateTodo}>Update</Button>
            </div>
            </form>
        </Modal>
        <List style={{display: 'inline-block',}}>
            <ListItem style ={{borderBottom: '1px solid #3F51B5'}}>
                <ListItemText style={{marginRight: '5px'}} primary={props.todo.todo} /> 
            <EditIcon style= {{cursor: 'pointer'}} onClick={e => setOpen(true)} />
            <DeleteForeverIcon style= {{cursor: 'pointer'}} onClick={event => db.collection('todos').doc(props.todo.id).delete()}/> 
            </ListItem>
        </List>
        </>
    )
}

export default Todo
