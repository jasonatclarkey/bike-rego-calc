'use client'
import { useState } from 'react';
import * as React from 'react';
import { Button, Tooltip } from '@mui/material';
import DisplayForm from './form';
import Paper from '@mui/material/Paper';
import * as v from './vehicles';
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

export default function Home() {

  const [fields, setFields] = useState({
    fieldKG: 0,
    fieldPower: 0,
    fieldLength: 0,
    fieldWidth: 0,
    fieldMaxSpeed: 0,
    fieldCO2: 0
  });

  const UpdateField = (fieldName: string, value: number) => {
    setFields(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const HandleFieldChange = (id: string, v: number) => {
    UpdateField(id, v)
  }

  const CalculateRego = (i: number): number => {
    return fields.fieldKG > 0 ?
      (fields.fieldKG * v.Vehicles[i].details.weight)
      + (fields.fieldPower * v.Vehicles[i].details.power)
      + (fields.fieldLength * v.Vehicles[i].details.length)
      + (fields.fieldWidth * v.Vehicles[i].details.width)
      + (fields.fieldMaxSpeed * v.Vehicles[i].details.maxSpeed)
      + (fields.fieldCO2 * v.Vehicles[i].details.co2)
      : v.Vehicles[i].details.tacIncluded
        ? v.Vehicles[i].details.originalRegoCost - v.Vehicles[i].details.tacCost
        : v.Vehicles[i].details.originalRegoCost

  }

  const Reset = () => {
    setFields({
      fieldKG: 0,
      fieldPower: 0,
      fieldLength: 0,
      fieldWidth: 0,
      fieldMaxSpeed: 0,
      fieldCO2: 0
    })
  }

  const DisplayVehicles = (vehicles: v.VehiclesInterface[]) => {
    return (vehicles.map((v: v.VehiclesInterface, i: number) => {
      return (
        <Accordion sx={{ maxWidth: 500 }}>
          <AccordionSummary
            expandIcon={<ExpandCircleDownIcon />}
            aria-controls="panel1-content"
            id={v.name}
          >
            <Typography><Tooltip title={v.details.reference}><Link target="_blank" rel="noopener" href={v.details.reference}>{v.name}</Link></Tooltip> - {toCurrency(CalculateRego(i))}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                <TableBody>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Original Rego:</TableCell>
                    <TableCell align="right">{toCurrency(v.details.originalRegoCost)}</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">TAC Charge</TableCell>
                    <TableCell align="right">{toCurrency(v.details.tacCost)}</TableCell>
                  </TableRow>
                  {v.details.tacIncluded &&
                    <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">TAC included</TableCell>
                      <TableCell align="right">Yes</TableCell>
                    </TableRow>
                  }
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Rego Only</TableCell>
                    <TableCell align="right">{toCurrency(v.details.tacIncluded ? v.details.originalRegoCost - v.details.tacCost : v.details.originalRegoCost)}</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Calculated Rego</TableCell>
                    <TableCell align="right">{toCurrency(CalculateRego(i))}</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Weight</TableCell>
                    <TableCell align="right">{v.details.weight}kg</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Engine Watts</TableCell>
                    <TableCell align="right">{toWatts(v.details.power)}w</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Length</TableCell>
                    <TableCell align="right">{v.details.length}cm</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Width</TableCell>
                    <TableCell align="right">{v.details.width}cm</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Max Speed</TableCell>
                    <TableCell align="right">{v.details.maxSpeed}</TableCell>
                  </TableRow>
                  <TableRow key={v.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
  }

  return (
    <div>
      <DisplayForm
        ResetFunc={Reset}
        CalculateRegoFunc={CalculateRego}
        FieldChange={HandleFieldChange}
        fields={fields}
      />
      <Button
        variant="contained"
        sx={{ ml: 1 }}
        onClick={() => { Reset() }}
      >RESET</Button>
      <div style={{ padding: 5 }}>
        {DisplayVehicles(v.Vehicles)}
      </div>
    </div>
  );
}
