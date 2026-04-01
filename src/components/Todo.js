import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



// Icons
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';






export default function Todo({ title, body }) {

    return (
        <>

            <Card className='todoCard' sx={{ backgroundColor: "#283593", marginTop: 5, color: "white" }}>
                <CardContent>
                    {/* Name Of Task Start */}
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant='h5' style={{ textAlign: "right", }}>
                                {title}
                            </Typography>
                            <Typography variant='h6' style={{ textAlign: "right", }}>
                                {body}
                            </Typography>
                        </Grid>
                        {/* Name Of Task End */}

                        {/* Actions Btns Start */}
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">

                            <IconButton className='iconBtn' aria-label="delete" style={{ color: '#8bc34a', border: '3px solid #8bc34a', backgroundColor: "white" }}>
                                <CheckIcon />
                            </IconButton>

                            <IconButton className='iconBtn' aria-label="delete" style={{ color: '#1769aa', border: '3px solid #1769aa', backgroundColor: "white" }}>
                                <EditIcon />
                            </IconButton>

                            <IconButton className='iconBtn' aria-label="delete" style={{ color: '#b23c17', border: '3px solid #b23c17', backgroundColor: "white" }}>
                                <DeleteIcon />
                            </IconButton>

                        </Grid>
                        {/* Actions Btns End */}

                    </Grid>



                </CardContent>

            </Card>
        </>
    )
}