import React, {useState} from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up-component';

import './landing-page.styles.scss';

const LandingPage = () => {

    const [account, setAccount] = useState(true);
    const doesUserHaveAnAccount = () => setAccount(!account);
    return(
        <div className="landing-page">
            {
                account ? (
                    <SignIn doesUserHaveAnAccount={doesUserHaveAnAccount} />
                ) : (
                    <SignUp doesUserHaveAnAccount={doesUserHaveAnAccount} />
                )
            }
        </div>
    );
};

export default LandingPage;