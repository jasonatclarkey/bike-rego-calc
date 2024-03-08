'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface DisplayFormProps {
    ResetFunc: () => void;
    CalculateRegoFunc: (i: number) => number;
    fields: any;
    FieldChange: (field: string, n: number) => void;
}

interface Fields {
    name: string;
    description: string;
    adornment: string;
    value: number;
}

const fields: Fields[] = [
    {
        name: "fieldKG",
        description: "Vehicle Weight cost per",
        adornment: "kg",
        value: 0,
    },
    {
        name: "fieldPower",
        description: "Vehicle Power cost per",
        adornment: "watts",
        value: 0,
    },
    {
        name: "fieldLength",
        description: "Vehicle Length cost per",
        adornment: "cm",
        value: 0,
    },
    {
        name: "fieldsWidth",
        description: "Vehicle Width cost per",
        adornment: "cm",
        value: 0,
    },
    {
        name: "fieldsMaxSpeed",
        description: "Vehicle Max Speed cost per",
        adornment: "kmh",
        value: 0,
    },
    {
        name: "fieldsCO2",
        description: "Vehicle CO2 gram/km cost per",
        adornment: "gram/km",
        value: 0,
    },
]

export default function DisplayForm(props: DisplayFormProps) {

    const FieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.FieldChange(e.target.id, parseFloat(e.target.value))
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 500 }} >
            <Grid container spacing={2} columns={2}>
                {
                    fields.map((f: Fields, i: number) => (
                        <Grid item xs={2} id={f.name} key={f.name}>
                            <TextField
                                onChange={FieldChange}
                                type="number"
                                label={f.description}
                                value={props.fields[f.name] ? props.fields[f.name] : fields[i].value}
                                id={f.name}
                                sx={{ m: 1, width: '15ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{f.adornment}</InputAdornment>,
                                }}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );

}