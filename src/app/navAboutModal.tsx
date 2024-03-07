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

export default function AboutModal() {
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
                About
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    What is this then?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            You've probably been linked to this calculator as part of a discussion around the
                            idea that people on bicycles do not "pay to use the road", and perhaps that
                            paying some form of "rego", or "road tax" is required.
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            This payment would make it fair, apparently, and all road users would get along, apparently.
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1, m: 1 }}>
                            So lets calculate what a bicycle rego/tax should cost, but be fair about it.
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