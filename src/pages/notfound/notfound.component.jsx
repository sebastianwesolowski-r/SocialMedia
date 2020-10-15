import React from 'react';
import {withRouter} from 'react-router-dom';

import {Box, Typography, Button} from '@material-ui/core';

const NotFound = ({history}) => (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%" paddingBottom="140px">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height="240px">
            <Typography variant="h1" color="primary">404</Typography>
            <Typography variant="subtitle1" style={{color: "#333333", letterSpacing: "0.4px"}}>this page is missing or you assembled the link incorrectly</Typography>
            <Button style={{width: "170px", height: "35px"}} variant="contained" color="secondary" onClick={() => history.push("/")}>back to home</Button>
        </Box>
    </Box>
);

export default withRouter(NotFound);