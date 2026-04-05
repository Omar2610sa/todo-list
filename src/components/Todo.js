import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';



// Icons
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Others
import { useContext } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { ToastContext } from '../contexts/ToastContext';
import { useState } from 'react';


// Dialogs PopUps
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';




export default function Todo({ todo, handleCheck, showDelete, showUpdate }) {
    const { todos, setTodos } = useContext(TodosContext)
    const { showHideToast } = useContext(ToastContext)

    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, body: todo.body })

    // Event Handles Start
    function handleCheck() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, isChecked: !t.isChecked }
            }
            return t
        })

        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        todo.isChecked == false? showHideToast("تم إنجازها بنجاح") : showHideToast("غير منجزة")
    }

    function handleDeleteDialog() {
        showDelete(todo)
    }

    function handleUpdate() {
        showUpdate(todo)
    }



    function handleUpdateCLose() {
        setShowUpdateDialog(false)

    }
    // Delete Confirm
    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id !== todo.id
        })

        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
    }

    // Updtae Confirm
    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if (todo.id == t.id) {
                return { ...t, title: updatedTodo.title, body: updatedTodo.body }
            } else {
                return t
            }
        })

        setTodos(updatedTodos)
        setShowUpdateDialog(false)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))

    }

    // Event Handles End

    return (
        <>

            <Card className='todoCard' sx={{ backgroundColor: "#283593", marginTop: 3, color: "white" }}>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Grid container spacing={1}>

                        <Grid size={{ xs: 7, sm: 8 }}>
                            <Typography
                                variant='h5'
                                style={{ textAlign: "right", textDecoration: todo.isChecked ? "line-through" : 'none' }}
                                sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}
                            >
                                {todo.title}
                            </Typography>
                            <Typography
                                variant='h6'
                                style={{ textAlign: "right" }}
                                sx={{ fontSize: { xs: '0.85rem', sm: '1.25rem' } }}
                            >
                                {todo.body}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 5, sm: 4 }} display="flex" justifyContent="space-around" alignItems="center">

                            <IconButton
                                sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                                style={{ color: todo.isChecked ? "white" : '#8bc34a', border: '3px solid #8bc34a', backgroundColor: todo.isChecked ? '#8bc34a' : "white" }}
                                onClick={handleCheck}
                            >
                                <CheckIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
                            </IconButton>

                            <IconButton
                                sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                                style={{ color: '#1769aa', border: '3px solid #1769aa', backgroundColor: "white" }}
                                onClick={handleUpdate}
                            >
                                <EditIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
                            </IconButton>

                            <IconButton
                                sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                                style={{ color: '#b23c17', border: '3px solid #b23c17', backgroundColor: "white" }}
                                onClick={handleDeleteDialog}
                            >
                                <DeleteIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
                            </IconButton>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}