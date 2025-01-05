import { TextField, Box, Button } from "@mui/material"
import { useRef, useState } from "react"

const ValidatedTextField = ({ label, validator, onChange }: { label: any, validator: any, onChange: any }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event: any) => {
        const { value } = event.target;
        const errorMessage = validator(value);
        setValue(value);
        setError(errorMessage);
        onChange(!errorMessage);
    }

    return <TextField
        label={label}
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        sx={{
            "& .MuiInputLabel-root.Mui-error": { color: "#ff8804" },
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": { border: "3px solid #ff8804 " },
            "& .MuiFormHelperText-root.Mui-error": { color: "#ff8804" }
        }}
    />
}


const nameValidator = (value: any) => {
    if (value.length < 2) return 'Name should be atleast 2 letters long'
    if (!/^[a-zA-Z ]+$/.test(value)) return 'Name must contain only letters and space'
    return false

}

const emailValidator = (value: any) => {
    if (!/^[a-zA-Z0-9]._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) return 'Invalid email address';
    return false
}

export default function FormValidation() {
    const formValid = useRef(({ name: false, email: false }));

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (Object.values(formValid.current).every(isValid => isValid)) {
            alert('Form is valid! Submitting the form..')
        } else {
            alert('Form is invalid! Please check the fileds..')
        }

    };

    return (
        <Box component={'form'} onSubmit={handleSubmit} noValidate>
            <ValidatedTextField
                label={'Name'}
                validator={nameValidator}
                onChange={(isValid: any) => (formValid.current.name === isValid)}
            />

            <ValidatedTextField
                label={'Email'}
                validator={emailValidator}
                onChange={(isValid: any) => (formValid.current.email === isValid)}
            />
            <Button
                type="submit"
                variant="contained"
            >
                Submit
            </Button>

        </Box>
    )

}