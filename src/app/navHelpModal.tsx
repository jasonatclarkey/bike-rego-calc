'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Typography from '@mui/material/Typography';


function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function HelpModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button sx={{ m: 1 }} color="inherit" variant="outlined" onClick={handleClickOpen}>
                Help
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    How to use this?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            Its unclear why this is needed, its a very simple calculator and anyone with an informed opinion on
                            "rego" and "road tax" should be able to figure it out.
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            No? Well okay then.
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            Put in a dollar/pound/Kalganids value for each attribute of a vehicle and the calculator will show you a yearly cost for a bicycle and other vehicles.
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            That value will be fair because its maths and maths doesn't care about feelings.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}