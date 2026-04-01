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



const todos = [
    {
        id: uuidv4(),
        title: 'المهمه الاولى',
        body:'تفاصيل المهمه الاولى',
        isChecked: false
    },
    {
        id: uuidv4(),
        title: 'المهمه الثانية',
        body:'تفاصيل المهمه الثانية',
        isChecked: false
    },
    {
        id: uuidv4(),
        title: 'المهمه الثالثه',
        body:'تفاصيل المهمه الثالثه',
        isChecked: false
    },
]

export default function SimpleContainer() {

    const todosJsx = todos.map((t) =>{
        return(
            <Todo title={t.title} body={t.body} key={t.id} />
        )
    })
    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant='h2' style={{ fontWeight: "bold" }}>
                        مهامي اليوميه
                    </Typography>
                    <hr />

                    {/* Filtters Btns Start */}

                    <ToggleButtonGroup

                        style={{ direction: "ltr", marginTop: "30px" }}
                        // value={alignment}
                        exclusive
                        // onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="right">
                            الغير منجز
                        </ToggleButton>
                        <ToggleButton value="center">
                            المنجز
                        </ToggleButton>

                        <ToggleButton value="left">
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
                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="أسم المهمه" variant="outlined" />
                        </Grid>
                        <Grid size={4}  display="flex" justifyContent="space-around" alignItems="center" >
                            <Button sx={{ width: '100%' , height: '100%' }} variant="contained">إضافة المهمه</Button>

                        </Grid>
                    </Grid>
                    {/* Input + Add Btn End */}
                </CardContent>

            </Card>
        </Container>
    );
}