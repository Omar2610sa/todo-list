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
import { useContext } from 'react';
import { TodosContext } from '../contexts/todosContext';

export default function SimpleContainer() {

    const { todos, setTodos } = useContext(TodosContext)
    const [titleInput, setTitleInput] = useState("")
    const [displayedBtn, setDisplayedBtn] = useState("all")

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
    }

    function checkDisplayed(e) {
        setDisplayedBtn(e.target.value)
    }

    const completedTodo = todos.filter((t) => t.isChecked)
    const notCompletedTodo = todos.filter((t) => !t.isChecked)

    let todosToRender = todos
    if (displayedBtn === "complete") todosToRender = completedTodo
    else if (displayedBtn === "non-complete") todosToRender = notCompletedTodo

    const todosJsx = todosToRender.map((t) => (
        <Todo key={t.id} todo={t} />
    ))

    return (
        // ✅ maxWidth="sm" كافي للموبايل، وبيتمدد على الشاشات الكبيرة
        <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 } }}>
            <Card sx={{ minWidth: 0 }} style={{
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                {/* ✅ padding أقل على الموبايل */}
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

                    {/* ✅ حجم الفونت أصغر على الموبايل */}
                    <Typography
                        variant='h2'
                        style={{ fontWeight: "bold" }}
                        sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}
                    >
                        مهامي اليوميه
                    </Typography>
                    <hr />

                    {/* ✅ الأزرار تتمدد على الموبايل */}
                    <ToggleButtonGroup
                        sx={{
                            direction: "ltr",
                            marginTop: "30px",
                            width: { xs: '100%', sm: 'auto' } // ✅ full width على الموبايل
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

                    {/* ✅ Input + Btn تحت بعض على الموبايل */}
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
    );
}