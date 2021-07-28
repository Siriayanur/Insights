import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility,VisibilityOff } from '@material-ui/icons'
import React from 'react'

const Input = ({half,name,handleChange,handleShowPassword,label,autoFocus,type}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                    name === "password" && {
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={handleShowPassword}>
                                    {type === "password" ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }
            />
        </Grid>
    )
}

export default Input
