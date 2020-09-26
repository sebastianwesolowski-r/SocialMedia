import React, {useState} from 'react';

import {Box, Typography} from '@material-ui/core';

import {ReactComponent as AppLogoBig} from '../../assets/app-logo-big.svg';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up-component';

const LandingPage = () => {
    const [account, setAccount] = useState(true);
    const doesUserHaveAnAccount = () => setAccount(!account);

    return(
        <Box display="flex" flexDirection="column" alignItems="center" paddingTop="90px">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width="365px" height="80px">
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <AppLogoBig />
                    <Typography variant="h3" color="primary">React Connect</Typography>
                </Box>
                <Box width="100%" textAlign="center">
                    <Typography variant="subtitle1" color="secondary">connect with people arount the world</Typography>
                </Box>
            </Box>
            {
                account ? (
                    <SignIn doesUserHaveAnAccount={doesUserHaveAnAccount} />
                ) : (
                    <SignUp doesUserHaveAnAccount={doesUserHaveAnAccount} />
                )
            }
        </Box>
    );
};

export default LandingPage;