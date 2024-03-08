'use client'
import { useState } from 'react';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

interface DisplayVehiclesProps {
    vehicles: VehiclesInterface[];
    fields: any;
    CalculateRegoFunc: (i: number) => number;
}

export interface VehicleInterface {
    weight: number; // in KG
    length: number; // in CM
    width: number; // in CM
    power: number; // in Watts, not kWatts
    maxSpeed: number; // in KM/H
    co2: number; // in Grams per KM
    originalRegoCost: number; // $AUD
    tacIncluded: boolean; // True / False
    tacCost: number; // $AUD
    reference: string; // Reference documentation where most data is pulled from.
}

export interface VehiclesInterface {
    name: string;
    details: VehicleInterface;
}

export const Vehicles: VehiclesInterface[] = [
    {
        name: "Bicycle",
        details: {
            weight: 12,
            length: 160,
            width: 60,
            power: 0,
            maxSpeed: 25,
            co2: 0,
            originalRegoCost: 0,
            tacIncluded: false,
            tacCost: 0,
            reference: "https://www.giant-bicycles.com/au/cross-city-disc-3"
        },
    },
    {
        name: "eBicycle",
        details: {
            weight: 23,
            length: 160,
            width: 60,
            power: 250,
            maxSpeed: 25,
            co2: 0,
            originalRegoCost: 0,
            tacIncluded: false,
            tacCost: 0,
            reference: "https://www.giant-bicycles.com/au/roam-eplus"
        },
    },
    {
        name: "Kia Picanto (S Manual)",
        details: {
            weight: 993,
            length: 359,
            width: 159,
            power: 62000,
            maxSpeed: 160,
            co2: 117,
            originalRegoCost: 876.90,
            tacIncluded: true,
            tacCost: 502,
            reference: "https://www.kia.com/au/cars/picanto/specification.html"
        },
    },
    {
        name: "Ford Ranger RAPTOR 3.0 (4x4)",
        details: {
            weight: 2475,
            length: 538,
            width: 192,
            power: 292000,
            maxSpeed: 178,
            co2: 2.62,
            originalRegoCost: 876.90,
            tacIncluded: true,
            tacCost: 502,
            reference: "https://www.carexpert.com.au/ford/ranger/2023-raptor-30-4x4-6ca4662e"
        }
    },
    {
        name: "2023 Tesla Model 3",
        details: {
            weight: 1760,
            length: 538,
            width: 192,
            power: 208000,
            maxSpeed: 225,
            co2: 0,
            originalRegoCost: 876.90,
            tacIncluded: true,
            tacCost: 502,
            reference: "https://www.carexpert.com.au/tesla/model-3/2023-rear-wheel-drive-4a3f0b7d"
        }
    },
    {
        name: "Hino 500 (FC 1124)",
        details: {
            weight: 11000,
            length: 470,
            width: 200,
            power: 177000,
            maxSpeed: 100,
            co2: 0.500,
            originalRegoCost: 653.00,
            tacIncluded: false,
            tacCost: 733,
            reference: "https://www.hino.com.au/uploads/pdf/specification/HSMY19FC1124-1118_WEB.pdf"
        }
    }
]

const toCurrency = (x: number): string => {
    return x.toLocaleString('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2
    }
    )
}

const toWatts = (x: number): string => {
    return `${x.toLocaleString()}`;
}

const DisplayVehicles = React.memo((props: DisplayVehiclesProps) => {
    return (props.vehicles.map((v: VehiclesInterface, i: number) => {
        return (
            <Accordion sx={{ maxWidth: 500 }} key={i} id={v.name}>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownIcon />}
                    aria-controls="panel1-content"
                    id={v.name}
                >
                    <Typography><Tooltip title={v.details.reference}><Link target="_blank" rel="noopener" href={v.details.reference}>{v.name}</Link></Tooltip> - {toCurrency(props.CalculateRegoFunc(i))}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="simple table">
                            <TableBody>
                                <TableRow key={`${i}-${v.name}-rego`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Original Rego:</TableCell>
                                    <TableCell align="right">{toCurrency(v.details.originalRegoCost)}</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-taccharge`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">TAC Charge</TableCell>
                                    <TableCell align="right">{toCurrency(v.details.tacCost)}</TableCell>
                                </TableRow>
                                {v.details.tacIncluded &&
                                    <TableRow key={`${i}-${v.name}-tacincluded`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">TAC included</TableCell>
                                        <TableCell align="right">Yes</TableCell>
                                    </TableRow>
                                }
                                <TableRow key={`${i}-${v.name}-regoonly`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Rego Only</TableCell>
                                    <TableCell align="right">{toCurrency(v.details.tacIncluded ? v.details.originalRegoCost - v.details.tacCost : v.details.originalRegoCost)}</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-calculatedrego`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Calculated Rego</TableCell>
                                    <TableCell align="right">{toCurrency(props.CalculateRegoFunc(i))}</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-weight`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Weight</TableCell>
                                    <TableCell align="right">{v.details.weight}kg</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-power`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Engine Watts</TableCell>
                                    <TableCell align="right">{toWatts(v.details.power)}w</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-length`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Length</TableCell>
                                    <TableCell align="right">{v.details.length}cm</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-width`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Width</TableCell>
                                    <TableCell align="right">{v.details.width}cm</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-maxSpeed`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Max Speed</TableCell>
                                    <TableCell align="right">{v.details.maxSpeed}</TableCell>
                                </TableRow>
                                <TableRow key={`${i}-${v.name}-co2`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">gram/km CO2</TableCell>
                                    <TableCell align="right">{v.details.co2}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion >
        )
    }))
})

export default DisplayVehicles