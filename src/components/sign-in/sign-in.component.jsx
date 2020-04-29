import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';
import {selectIsProcessing} from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {ReactComponent as Enter} from '../../assets/enter.svg';
import Spinner from '../spinner/spinner.component';

import './sign-in.styles.scss';

const SignIn = ({doesUserHaveAnAccount, googleSignInStart, emailSignInStart, isProcessing}) => {
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
        <div className="sign-in-page">
            <div className="page-title">Sign in</div>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" label="Email" value={email} onChange={handleChange} required/>
                <FormInput name="password" type="password" label="Password" value={password} onChange={handleChange} required/>
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
                    <CustomButton type="button" onClick={googleSignInStart} googleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
            <div className="switch-sign-up">
                <div>or</div>
                <div className="space">if you don't have an account</div>
                <CustomButton onClick={doesUserHaveAnAccount}>Sign up</CustomButton>
            </div>
        </div>
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