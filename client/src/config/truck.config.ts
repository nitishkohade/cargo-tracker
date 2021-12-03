export const inputFields = [
    {key: "model", placeholder: "Model", type: "text", minLength: 1, maxLength: 10},
    {key: "year", placeholder: "Year", type: "number", min: 1000, max: 9999},
    {key: "licensePlate", placeholder: "License Plate", type: "text", minLength: 1, maxLength: 10},
    {key: "currentDistance_KM", placeholder: "Current Distance KM", type: "number", min: 0, max: 9999},
    {key: "maxLoad_KG", placeholder: "Max Load KG", type: "number", min: 1, max: 9999}
]

export const fuelTypes = [
    {key: "", value: "Select..."},
    {key: "GAS", value: "Gas"},
    {key: "DIESEL", value: "Diesel"},
    {key: "ELECTRIC", value: "Electric"}
]