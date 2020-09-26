import React from 'react';

import {TextField} from '@material-ui/core';

const FormInput = ({handleChange, label, smallMargin, ...otherProps}) => (
    <TextField fullWidth onChange={handleChange} label={<span style={{fontSize: "1rem", color: "#333333"}}>{label}</span>} {...otherProps} style={{marginBottom: smallMargin ? "30px" : "45px"}} />
);

export default FormInput;