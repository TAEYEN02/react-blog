import {TextField } from "@mui/material";

const CustomInput = ({
    label,
    type="text",
    multiline= false,
    rows = 1,
    value,
    onChange,
    readOnly=false,
    placeholder = "",
    maxLength  = 200,
}) =>{
    return(
        <TextField
            fullWidth
            label={label}
            type={type}
            multiline={multiline}
            rows={rows}
            value={value}
            onChange={onChange}
            margin="normal"
            inputProps={{
                readOnly,
                placeholder,
                maxLength
            }}
        />
    )
}
export default CustomInput;