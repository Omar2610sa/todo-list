import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Todo from './Todo';

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useContext, useMemo } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { useToast } from '../contexts/ToastContext';

// Dialogs PopUps
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function SimpleContainer() {

    // States
    const { todos, setTodos } = useContext(TodosContext)
    const { showHideToast } = useToast()

    const [titleInput, setTitleInput] = useState("")
    const [displayedBtn, setDisplayedBtn] = useState("all")
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const [dialogTodo, setDialogTodo] = useState("")




    // Add handle
    function handleAddTodo() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            body: 'تفاصيل  ' + titleInput,
            isChecked: false
        }
        const updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        setTitleInput("")
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        showHideToast("تم أضافتها بنجاح")
    }

    function checkDisplayed(e) {
        setDisplayedBtn(e.target.value)
    }

    // Filteration of Check

    const completedTodo = useMemo(() => {
        return todos.filter((t) => {
            return t.isChecked
        }
        )
    }, [todos])

    const notCompletedTodo = useMemo(() => {
        return todos.filter((t) => {
            return !t.isChecked
        }
        )
    }, [todos])


    let todosToRender = todos
    if (displayedBtn === "complete") todosToRender = completedTodo
    else if (displayedBtn === "non-complete") todosToRender = notCompletedTodo



    // Handlers Start

    // Delete handle
    function handleDeleteDialog(todo) {
        setDialogTodo(todo)
        setShowDeleteDialog(true)
    }

    function handleDeleteCLose() {
        setShowDeleteDialog(false)

    }

    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id !== dialogTodo.id
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        setShowDeleteDialog(false)
        showHideToast("تم الحذف بنجاح", "#d32f2f")
    }

    // Updtae Confirm

    function handleUpdateDialog(todo) {
        setDialogTodo(todo)
        setShowUpdateDialog(true)
    }



    function handleUpdateCLose() {

        setShowUpdateDialog(false)

    }

    function handleUpdateConfirm() {


        const updatedTodos = todos.map((t) => {
            if (dialogTodo.id == t.id) {
                return { ...t, title: dialogTodo.title, body: dialogTodo.body }
            } else {
                return t
            }
        })

        setTodos(updatedTodos)
        setShowUpdateDialog(false)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        showHideToast("تم تعديلها بنجاح", "#5c6bc0" )

    }


    // Handlers End


    const todosJsx = todosToRender.map((t) => (
        <Todo key={t.id} todo={t} showDelete={handleDeleteDialog} showUpdate={handleUpdateDialog} />
    ))

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
                            value={dialogTodo.title}
                            onChange={(e) => { setDialogTodo({ ...dialogTodo, title: e.target.value }) }}
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
                            value={dialogTodo.body}
                            onChange={(e) => { setDialogTodo({ ...dialogTodo, body: e.target.value }) }}
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
            <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 } }}>
                <Card sx={{ minWidth: 0 }} style={{
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

                        <Typography
                            variant='h2'
                            style={{ fontWeight: "bold" }}
                            sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}
                        >
                            مهامي اليوميه
                        </Typography>
                        <hr />

                        <ToggleButtonGroup
                            sx={{
                                direction: "ltr",
                                marginTop: "30px",
                                width: { xs: '100%', sm: 'auto' }
                            }}
                            value={displayedBtn}
                            exclusive
                            onChange={checkDisplayed}
                            aria-label="text alignment"
                            color='primary'
                        >
                            <ToggleButton value="non-complete" sx={{ flex: { xs: 1, sm: 'unset' } }}>
                                الغير منجز
                            </ToggleButton>
                            <ToggleButton value="complete" sx={{ flex: { xs: 1, sm: 'unset' } }}>
                                المنجز
                            </ToggleButton>
                            <ToggleButton value="all" sx={{ flex: { xs: 1, sm: 'unset' } }}>
                                الكل
                            </ToggleButton>
                        </ToggleButtonGroup>

                        {todosJsx}

                        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                            <Grid size={{ xs: 12, sm: 8 }} display="flex" justifyContent="space-around" alignItems="center">
                                <TextField
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    sx={{ width: '100%' }}
                                    label="أسم المهمه"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="space-around" alignItems="center">
                                <Button
                                    sx={{ width: '100%', height: { xs: '48px', sm: '100%' } }}
                                    variant="contained"
                                    onClick={handleAddTodo}
                                    disabled={titleInput.length === 0}
                                >
                                    إضافة المهمه
                                </Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Container>
        </>

    );
}