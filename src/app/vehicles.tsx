'use client'

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