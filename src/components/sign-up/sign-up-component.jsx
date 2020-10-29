import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Enter} from '../../assets/enter.svg';
import {ReactComponent as PasswordVisible} from '../../assets/password-visible.svg';
import {ReactComponent as PasswordNotVisible} from '../../assets/password-not-visible.svg';

import {Box, Typography, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {signUpStart} from '../../redux/user/user.actions';
import {selectIsProcessing} from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import Spinner from '../spinner/spinner.component';

const useStyles = makeStyles({
    panelForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: "40px"
    },
    signBtn: {
        width: "100px",
        height: "35px"
    },
    signCheckbox: {
        fontSize: "0.8rem",
        color: "555555"
    },
    signSwitch: {
        textAlign: "center",
        color: "#333333",
        marginTop: "45px",
        marginBottom: "20px",
        fontWeight: "500"
    },
    passwordIcon: {
        position: "absolute",
        top: "17%",
        right: "3%",
        cursor: "pointer",
        transitionDuration: "150ms",
        "&:active": {
            transform: "scale(1.4)"
        }
    }
});

const SignUp = ({doesUserHaveAnAccount, signUpStart, isProcessing}) => {
    const classes = useStyles();
    const [userData, setUserData] = useState({displayName: '', email: '', password: '', confirmPassword: ''});
    const {displayName ,email, password, confirmPassword} = userData;
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => setPasswordShown(!passwordShown);

    const handleChange = event => {
        const {value, name} = event.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords didn't match");
            return;
        }
        if(!termsAccepted) {
            alert('You must accept Terms and Conditions');
            return;
        }
        signUpStart({displayName, email, password});
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" width="95%" maxWidth="460px" height="500px" borderRadius="5px" boxShadow={7} marginTop="50px" padding="0 50px">
                <Box display="flex" alignItems="center" justifyContent="center" width="calc(100% + 100px)" height="60px" borderRadius="5px 5px 0 0" bgcolor="primary.main"><Typography variant="h5">Sign up</Typography></Box>
                <form className={classes.panelForm} onSubmit={handleSubmit}>
                    <FormInput name="displayName" type="text" label="Display Name" value={displayName} onChange={handleChange} smallMargin required/>
                    <FormInput name="email" type="email" label="Email" value={email} onChange={handleChange} smallMargin required/>
                    <Box width="100%" position="relative">
                        <FormInput name="password" type={passwordShown ? 'text' : 'password'} label="Password" value={password} onChange={handleChange} smallMargin required/>
                        <i className={classes.passwordIcon} onClick={() => togglePasswordVisiblity()}>{passwordShown ? <PasswordVisible /> : <PasswordNotVisible />}</i>
                    </Box>
                    <FormInput name="confirmPassword" type={passwordShown ? 'text' : 'password'} label="Confirm Password" value={confirmPassword} onChange={handleChange} smallMargin required/>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
                            <FormControlLabel control={
                                <Checkbox color="primary" value={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)}/>
                            }
                            label={<span className={classes.signCheckbox}>I agree <span style={{textDecoration: "underline"}}>Terms and Conditions</span></span>}
                            />
                        <Button className={classes.signBtn} variant="contained" color="primary" type="submit" disabled={isProcessing}>
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
            </Box>
            <div className={classes.signSwitch}>
                <p style={{fontSize: "1rem", marginBottom: "5px", letterSpacing: "0.4px"}}>Already have an account ?</p>
                <Typography variant="subtitle2" style={{color: "#555555"}}><span onClick={() => doesUserHaveAnAccount()} style={{textDecoration: "underline", fontSize: "0.9rem", color: "#333333", cursor: "pointer"}}>Sign in</span> to access all the features of service.</Typography>
            </div>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    isProcessing: selectIsProcessing
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userData => dispatch(signUpStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);