import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {signUpStart} from '../../redux/user/user.actions';
import {selectIsProcessing} from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {ReactComponent as Enter} from '../../assets/enter.svg';
import Spinner from '../spinner/spinner.component';

import './sign-up.styles.scss';

const SignUp = ({doesUserHaveAnAccount, signUpStart, isProcessing}) => {
    const [userData, setUserData] = useState({displayName: '', email: '', password: '', confirmPassword: ''});
    const {displayName ,email, password, confirmPassword} = userData;

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
        signUpStart({displayName, email, password});
    }

    return (
        <div className="sign-up-page">
            <div className="page-title">Sign up</div>
            <form onSubmit={handleSubmit}>
                <FormInput name="displayName" type="text" label="Display Name" value={displayName} onChange={handleChange} required/>
                <FormInput name="email" type="email" label="Email" value={email} onChange={handleChange} required />
                <FormInput name="password" type="password" label="Password" value={password} onChange={handleChange} required/>
                <FormInput name="confirmPassword" type="password" label="Confirm Password" value={confirmPassword} onChange={handleChange} required/>
                <div className="buttons">
                    <CustomButton type="submit">
                        {
                            isProcessing ? (
                                <Spinner />
                            ) : (
                                <Enter />
                            )
                        }
                    </CustomButton>
                </div>
            </form>
            <div className="switch-sign-in">
                <div>or</div>
                <div className="space">if you already have an acoount</div>
                <CustomButton onClick={doesUserHaveAnAccount}>Sign in</CustomButton>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isProcessing: selectIsProcessing
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userData => dispatch(signUpStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);