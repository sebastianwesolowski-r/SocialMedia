import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {changeUserPassword} from '../../firebase/firebase';

import {deleteUserStart} from '../../redux/user/user.actions';
import {selectCurrentUserId} from '../../redux/user/user.selectors';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './profile-settings.styles.scss';

const ProfileSettings = ({deleteUser, currentUserId}) => {
    const [panelOption, switchPanelOption] = useState('');
    
    const [passwordChangeData, setPasswordChangeData] = useState({presentPassword: '', newPassword: '', confirmNewPassword: ''});
    const {presentPassword, newPassword, confirmNewPassword} = passwordChangeData;

    const handleChange = event => {
        const {value, name} = event.target;
        setPasswordChangeData({...passwordChangeData, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if(newPassword === confirmNewPassword) {
            changeUserPassword(presentPassword, newPassword);
        } else {
            alert("Password's didn't match");
        }
    }

    const renderSwitch = (panelOption) => {
        switch(panelOption) {
            case 'changePassword': 
                return (
                    <div className="settings">
                        <div className="settings-option">Change Password</div>
                        <form onSubmit={handleSubmit}>
                            <FormInput name="presentPassword" type="password" label="Actual Password" value={presentPassword} onChange={handleChange} required/>
                            <FormInput name="newPassword" type="password" label="New Password" value={newPassword} onChange={handleChange} required/>
                            <FormInput name="confirmNewPassword" type="password" label="Confirm New Password" value={confirmNewPassword} onChange={handleChange} required/>
                            <CustomButton type="submit">save</CustomButton>
                        </form>
                    </div>
                );
            case 'deleteAccount':
                return (
                    <div className="settings">
                        <div className="settings-option delete-account">Delete Account</div>
                        <FormInput name="presentPassword" type="password" label="Actual Password" value={presentPassword} onChange={handleChange} required/>
                        <CustomButton onClick={() => deleteUser({presentPassword, currentUserId})}>confirm</CustomButton>
                    </div>
                );
            default:
                return (
                    <div className="settings">
                        <div className="settings-item" onClick={() => switchPanelOption('changePassword')}>Change Password</div>
                        <div className="settings-item delete-account" onClick={() => switchPanelOption('deleteAccount')}>Delete Account</div>
                    </div>
                );
        }
    }

    return (    
        <div>
            {
                renderSwitch(panelOption)
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserId: selectCurrentUserId
});

const mapDispatchToProps = dispatch => ({
    deleteUser: userData => dispatch(deleteUserStart(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);