import React from 'react';

import {Box, Typography} from '@material-ui/core';

const Footer = () => (
    <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%" height="60px" position="absolute" bottom="0" left="0" padding="0 60px">
        <a style={{textDecoration: "none"}} href="https://sebastianwesolowski.netlify.app" target="_blank" rel="noopener noreferrer"><Typography variant="subtitle2" style={{color: "#272627", marginRight: "40px", fontSize: "0.85rem"}}>© 2020 React Connect by SEBASTIANWESOLOWSKI.</Typography></a>
        <a style={{textDecoration: "none"}} href="https://github.com/sebastianwesolowski-r/social-media" target="_blank" rel="noopener noreferrer"><Typography variant="subtitle2" style={{color: "#272627", fontSize: "0.85rem"}}>GitHub</Typography></a>
    </Box>
);

export default Footer;