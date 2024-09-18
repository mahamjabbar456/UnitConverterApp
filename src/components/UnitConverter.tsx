'use client';

import { useState,ChangeEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectGroup,
    SelectItem,
    SelectLabel
} from "./ui/select";

// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string , Record<string,number>> = {
    length :{
        "Millimeters (mm)" : 1,
        "Centimeters (cm)" : 10,
        "Meters (m)" : 1000,
        "Kilometers (km)" : 1000000,
        "Inches (in)" : 25.4,
        "Feet (ft)" : 304.8,
        "Yards (yd)" : 914.4 ,
        "Miles (mi)" : 1609344 ,
    },
    weight : {
        "Grams (g)" : 1,
        "Kilograms (kg)" : 1000,
        "Ounces (oz)" : 28.3495,
        "Pounds (lb)" : 453.592,
    },
    volume : {
        "Milliliters (ml)" : 1,
        "Liters (l)" : 1000,
        "Fluid Ounces (fl oz)" : 29.5735,
        "Cups (cup)" : 240,
        "Pints (pt)" : 473.176,
        "Quarts (qt)" : 946.353,
        "Gallons (gal)" : 3785.41,
    }
}

// Unit types categorized by length, weight, and volume
const unitTypes : Record<string,string[]> = {
    length : [
        "Millimeters (mm)" ,
        "Centimeters (cm)" ,
        "Meters (m)",
        "Kilometers (km)" ,
        "Inches (in)" ,
        "Feet (ft)" ,
        "Yards (yd)" ,
        "Miles (mi)" ,
    ],
    weight : [
        "Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"
    ],
    volume : [
        "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
    ]
}

const UnitConverter = () => {
      // State hooks for managing input value, selected units, and the converted value
    const [inputValue,setInputValue] = useState<number | null>(null);
    const [inputUnit,setInputUnit] = useState<string | null>(null);
    const [outputUnit,setOutputUnit] = useState<string | null>(null);
    const [convertedValue ,setConvertedValue] = useState<number | null>(null);

    const handleInputUnitChange = (value:string) : void => {
        setInputUnit(value);
    }

    const handleOutputUnitChange = (value : string) : void => {
        setOutputUnit(value);
    }

    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        setInputValue(parseFloat(e.target.value));
    }

    const convertValue = () : void => {
        if(inputValue !== null && inputUnit && outputUnit){
            let unitCategory : string | null = null;

            for (const category in unitTypes){
                if(
                    unitTypes[category].includes(inputUnit)  &&
                    unitTypes[category].includes(outputUnit)
                ){
                    unitCategory = category;
                    break;
                }
            }

            if(unitCategory){
                const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
                const result = baseValue / conversionRates[unitCategory][outputUnit];
                setConvertedValue(result);
            }else{
                setConvertedValue(null);
                alert("Incompitable unit types selected");
            }
        }else{
            setConvertedValue(null);
            alert("Please fill all fields.");
        }
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* Center the unit converter card within the screen */}
      <div className="w-full max-w-md p-6 bg-card rounded-2xl shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-1">Unit Converter</h1>
        <p className="text-center mb-6 text-sm">
        Convert values between different units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label className="font-bold" htmlFor="input-unit">From</Label>
                <Select  onValueChange={handleInputUnitChange}>
                   <SelectTrigger className="rounded-2xl hover:border-black shadow-lg">
                    <SelectValue placeholder="Select Unit" />
                   </SelectTrigger>
                   <SelectContent>
                    {Object.entries(unitTypes).map(([category,units]) => (
                        <SelectGroup key={category}>
                            <SelectLabel>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectLabel>
                            {units.map((unit)=>(
                                <SelectItem key={unit} value={unit}>
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                   </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label className="font-bold" htmlFor="output-unit">To</Label>
                <Select onValueChange={handleOutputUnitChange}>
                   <SelectTrigger className="rounded-2xl hover:border-black shadow-lg">
                      <SelectValue placeholder="Select Unit" />
                   </SelectTrigger>
                   <SelectContent>
                       {Object.entries(unitTypes).map(([category,units]) => (
                        <SelectGroup>
                            <SelectLabel>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectLabel>
                            {units.map((unit) => (
                                <SelectItem key={unit} value={unit} >
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                       ))}
                   </SelectContent>
                </Select>
            </div>
            {/* Input for value to convert */}
            <div className="space-y-2 col-span-2">
                <Label htmlFor="input-value" className="font-bold">Value</Label>
                <Input 
                id="input-value"
                type="number"
                placeholder="Enter value"
                value={inputValue || ""}
                onChange={handleInputChange}
                className="w-full rounded-2xl shadow-sm hover:border-black"
                />
            </div>
            {/* Button to trigger conversion */}
            <Button className="col-span-2 rounded-2xl" type="button"
            onClick={convertValue}>
                Convert
            </Button>
        </div>
            {/* Display the converted value */}
            <div className="mt-6 text-center">
                <div className="text-4xl font-bold">
                    {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
                </div>
                <div className="text-muted-foreground">
                    {outputUnit ? outputUnit : "Unit"}
                </div>
            </div>
      </div>
    </div>
  )
}

export default UnitConverter
