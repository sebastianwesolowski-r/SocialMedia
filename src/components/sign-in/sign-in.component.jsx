import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {ReactComponent as Enter} from '../../assets/enter.svg';

import './sign-in.styles.scss';

const SignIn = ({doesUserHaveAnAccount}) => {
    const [userData, setUserData] = useState({email: '', password: ''});
    const {email, password} = userData;

    const handleChange = event => {
        const {value, name} = event.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
    }

    return (
        <div className="sign-in-page">
            <div className="page-title">Sign in</div>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" label="Email" value={email} onChange={handleChange} required/>
                <FormInput name="password" type="password" label="Password" value={password} onChange={handleChange} required/>
                <div className="buttons">
                    <CustomButton type="submit">
                        <Enter />
                    </CustomButton>
                    <CustomButton type="button" googleSignIn>Sign in with Google</CustomButton>
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

export default SignIn;