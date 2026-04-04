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
import { useState } from 'react';


// Dialogs PopUps
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';




export default function Todo({ todo, handleCheck }) {
    const { todos, setTodos } = useContext(TodosContext)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
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

    }

    function handleDelete() {
        setShowDeleteDialog(true)
    }

    function handleUpdate() {
        setShowUpdateDialog(true)
    }


    function handleDeleteCLose() {
        setShowDeleteDialog(false)

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
            {/* Delete Dialog Start */}
            <Dialog
                style={{ direction: "rtl" }}
                onClose={handleDeleteCLose}
                open={showDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    هل انت متأكد من حذف تلك المهمة؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن حذف بعد إتمامه
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCLose} >إغلاق</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        نعم قم بالحذف
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Dialog End */}

            {/* Update Dialog Start */}
            <Dialog
                style={{ direction: "rtl" }}
                onClose={handleUpdateCLose}
                open={showUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    تعديل المهمه
                </DialogTitle>
                <DialogContent>
                    <form id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="العنوان"
                            fullWidth
                            variant="standard"
                            value={updatedTodo.title}
                            onChange={(e) => { setUpdatedTodo({ ...updatedTodo, title: e.target.value }) }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="التفاصيل"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={updatedTodo.body}
                            onChange={(e) => { setUpdatedTodo({ ...updatedTodo, body: e.target.value }) }}
                            style={{ marginTop: "20px" }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateCLose} >إغلاق</Button>
                    <Button onClick={handleUpdateConfirm} autoFocus>
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Update Dialog End */}
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
                                onClick={handleDelete}
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