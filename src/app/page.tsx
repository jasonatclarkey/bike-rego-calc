'use client'
import { useState } from 'react';
import * as React from 'react';
import { Button, Tooltip } from '@mui/material';
import DisplayForm from './form';
import DisplayVehicles, * as v from './vehicles';


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
        <DisplayVehicles
          vehicles={v.Vehicles}
          fields={fields}
          CalculateRegoFunc={CalculateRego}
        />
      </div>
    </div>
  );
}
