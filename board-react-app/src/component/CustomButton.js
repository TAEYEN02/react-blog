import {Button} from '@mui/material';

const CustomButton = ({label, variant="contained", color="primary", onclick})=>{
    return(
        <Button variant={variant} color={color} onClick={onclick}>
            {label}
        </Button>
    )
}

export default CustomButton;