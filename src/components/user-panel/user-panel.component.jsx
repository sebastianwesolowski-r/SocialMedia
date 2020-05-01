import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectUsersData} from '../../redux/users/users.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import {ReactComponent as Add} from '../../assets/add.svg';
import {ReactComponent as Profile} from '../../assets/profile.svg';
import {ReactComponent as SignOut} from '../../assets/signout.svg';

import SearchUser from '../search-user/search-user.component';
import SearchUserItem from '../search-user-item/search-user-item.component';
import UserPanelItem from '../user-panel-item/user-panel-item.component';

import './user-panel.styles.scss';

const UserPanel = ({signOutStart, usersData}) => {
    const [inputLength, setInputLength] = useState(0);
    const [filteredUsers, updateFilteredUsers] = useState(null);
    const [searchUser, setSearch] = useState('');
    const handleChange = (event) => {
        setSearch(event.target.value);
        setInputLength(event.target.value.length);
        if(usersData) {
            const users = Object.keys(usersData);
            updateFilteredUsers(users.filter(user => user.includes(searchUser)));
            console.log(filteredUsers);
        }
    }
    console.log(inputLength);
    return (
        <div>
            <div className="user-panel">
                <SearchUser handleChange={handleChange} />
                <UserPanelItem key={1} url={'addpost'} panelFunction={'Add Post'} icon={<Add />} />
                <UserPanelItem key={2} url={'profile'} panelFunction={'Profile'} icon={<Profile />} />
                <UserPanelItem key={3} panelFunction={'Sign Out'} icon={<SignOut />} onClickFunction={signOutStart}/>
            </div>
            {
                inputLength > 2 && 
                    <div className="filtered-users">
                        {
                            filteredUsers.map(user => (
                                <SearchUserItem userName={user} />
                            ))
                        }
                    </div>
            } 
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    usersData: selectUsersData
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);