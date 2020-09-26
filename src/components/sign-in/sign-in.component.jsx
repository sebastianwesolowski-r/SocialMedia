import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Enter} from '../../assets/enter.svg';
import {ReactComponent as FbLogin} from '../../assets/fb-login.svg';
import {ReactComponent as GoogleLogin} from '../../assets/google-login.svg';

import {Box, Typography, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import {selectIsProcessing} from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import Spinner from '../spinner/spinner.component';

const useStyles = makeStyles({
    panelForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: "50px"
    },
    signBtn: {
        width: "95px",
        height: "35px"
    },
    signCheckbox: {
        fontSize: "0.9rem",
        color: "555555"
    },
    signInMediaButton: {
        width: "130px",
        height: "40px",
        color: "#FAFAFA",
        marginBottom: "15px",
        borderRadius: "20px",
        textTransform: "none"
    },
    signSwitch: {
        textAlign: "center",
        color: "#333333",
        marginTop: "45px",
        fontWeight: "500"
    }
});

const SignIn = ({doesUserHaveAnAccount, googleSignInStart, emailSignInStart, isProcessing}) => {
    const classes = useStyles();
    const [userData, setUserData] = useState({email: '', password: ''});
    const {email, password} = userData;

    const handleChange = event => {
        const {value, name} = event.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart({email, password})
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" width="420px" height="500px" borderRadius="5px" boxShadow={7} marginTop="50px" padding="0 30px">
                <Box display="flex" alignItems="center" justifyContent="center" width="420px" height="60px" borderRadius="5px 5px 0 0" bgcolor="primary.main"><Typography variant="h5">Sign in</Typography></Box>
                <form className={classes.panelForm} onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" label="Email" value={email} onChange={handleChange} required/>
                    <FormInput name="password" type="password" label="Password" value={password} onChange={handleChange} required/>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
                        <FormControlLabel control={
                            <Checkbox color="primary" />
                        }
                        label={<span className={classes.signCheckbox}>Remember me</span>}
                        />
                        <Button className={classes.signBtn} variant="contained" color="primary" type="submit">
                            {
                                isProcessing ? (
                                    <Spinner />
                                ) : (
                                    <Enter />
                                )
                            }
                        </Button>
                    </Box>
                </form>
                <Typography variant="subtitle2" style={{marginTop: "10px", marginBottom: "15px"}}>or with</Typography>
                <Button className={classes.signInMediaButton} variant="contained" startIcon={<FbLogin />} style={{backgroundColor: "#285080"}}>Facebook</Button>
                <Button onClick={() => googleSignInStart()} className={classes.signInMediaButton} variant="contained" startIcon={<GoogleLogin />} style={{backgroundColor: "#CA4939"}}>Google</Button>
            </Box>
            <div className={classes.signSwitch}>
                <p style={{fontSize: "1rem", marginBottom: "5px", letterSpacing: "0.4px"}}>Don’t have an account ?</p>
                <Typography variant="subtitle2"><span onClick={() => doesUserHaveAnAccount()} style={{textDecoration: "underline", fontSize: "0.9rem", color: "#333333", cursor: "pointer"}}>Sign up</span> to access all the features of service.</Typography>
            </div>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    isProcessing: selectIsProcessing
});

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: userData => dispatch(emailSignInStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);