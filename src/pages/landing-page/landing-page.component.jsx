import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up-component';

import {fetchUsersStart} from '../../redux/users/users.actions';

import './landing-page.styles.scss';

const LandingPage = ({fetchUsersStart}) => {
    useEffect(() => {
        fetchUsersStart();
    }, [fetchUsersStart]);
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

const mapDispatchToProps = dispatch => ({
    fetchUsersStart: () => dispatch(fetchUsersStart())
});

export default connect(null, mapDispatchToProps)(LandingPage);