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


// Components

import Todo from './Todo';


// Ohters
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { TodosContext } from '../contexts/todosContext';


export default function SimpleContainer() {

    const { todos, setTodos } = useContext(TodosContext)

    const [titleInput, setTitleInput] = useState("")

    const [displayedBtn, setDisplayedBtn] = useState("all")



    function handleAddTodo() {
        const newTodo =
        {
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
    const completedTodo = todos.filter((t) => {
        return t.isChecked
    })
    const notCompletedTodo = todos.filter((t) => {
        return !t.isChecked
    })


    let todosToRender = todos

    if (displayedBtn == "complete") {
        todosToRender = completedTodo
    } else if (displayedBtn == "non-complete") {
        todosToRender = notCompletedTodo
    } else {
        todosToRender = todos
    }

    const todosJsx = todosToRender.map((t) => {
        return (
            <Todo key={t.id} todo={t} />
        )
    })
    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }} style={{
                maxHeight: '80vh',
                overflow: 'overlay'
            }}>
                <CardContent>
                    <Typography variant='h2' style={{ fontWeight: "bold" }}>
                        مهامي اليوميه
                    </Typography>
                    <hr />

                    {/* Filtters Btns Start */}

                    <ToggleButtonGroup

                        style={{ direction: "ltr", marginTop: "30px" }}
                        value={displayedBtn}
                        exclusive
                        onChange={checkDisplayed}
                        aria-label="text alignment"
                        color='primary'
                    >
                        <ToggleButton value="non-complete">
                            الغير منجز
                        </ToggleButton>
                        <ToggleButton value="complete">
                            المنجز
                        </ToggleButton>

                        <ToggleButton value="all">
                            الكل
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Filtters Btns End */}


                    {/* Todo Elements Start */}

                    {todosJsx}
                    {/* Todo Elements End */}

                    {/* Input + Add Btn Start */}

                    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                        <Grid size={8} display="flex" justifyContent="space-around" alignItems="center"  >
                            <TextField value={titleInput} onChange={(e) => { setTitleInput(e.target.value) }} sx={{ width: '100%' }} id="outlined-basic" label="أسم المهمه" variant="outlined" />
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                            <Button sx={{ width: '100%', height: '100%' }} variant="contained" onClick={handleAddTodo} disabled={titleInput.length === 0}>إضافة المهمه</Button>

                        </Grid>
                    </Grid>
                    {/* Input + Add Btn End */}
                </CardContent>

            </Card>
        </Container>
    );
}