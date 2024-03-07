'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AboutModal from './navAboutModal';
import HelpModal from './navHelpModal';

const link: string = "https://github.com/jasonatclarkey/bike-rego-calc"

export default function NavTop() {
    return (
        <Box sx={{ flexGrow: 1, mb: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bicycle Rego Calc
                    </Typography>
                    <HelpModal />
                    <AboutModal />
                    <Button sx={{ m: 1 }} color="inherit" variant="outlined" href={link}>Source</Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
}