import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as HamburgerIcon} from '../../assets/hamburger-menu.svg';

import {selectCurrentUserName} from '../../redux/user/user.selectors';
import {selectUsersData} from '../../redux/users/users.selectors';
import {selectIsDataLoaded} from '../../redux/users/users.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import {ReactComponent as Add} from '../../assets/add.svg';
import {ReactComponent as Profile} from '../../assets/profile.svg';
import {ReactComponent as SignOut} from '../../assets/signout.svg'

import AppBaner from '../app-baner/app-baner.component';
import AddPost from '../add-post/add-post.component';
import SearchBox from '../search-box/search-box.component';
import SearchBoxItem from '../search-box-item/search-box-item.component';
import UserPanelItem from '../user-panel-item/user-panel-item.component';
import HamburgerMenuItem from '../hamburger-menu-item/hamburger-menu-item.component';
import Overlay from '../overlay/overlay.component';

import './header-panel.styles.scss';

const HeaderPanel = ({signOutStart, usersData, isDataLoaded, currentUserName}) => {
    let keyCount = 0;
    const getKey = () => keyCount++;

    const [addPostPage, showAddPostPage] = useState(false);
    const [hamburgerMenu, showHamburgerMenu] = useState(false);
    const [inputLength, setInputLength] = useState(0);
    const [filteredUsers, updateFilteredUsers] = useState(null);
    const [searchUser, setSearch] = useState('');

    const setHamburgerMenu = () => showHamburgerMenu(!hamburgerMenu);
    const setHidden = () => showAddPostPage(!addPostPage);
    const clearInput = () => setInputLength(0);
    const handleChange = (event) => {
        setSearch(event.target.value);
        setInputLength(event.target.value.length);
        if(isDataLoaded) {
            const users = Object.keys(usersData);
            updateFilteredUsers(users.filter(user => user.includes(searchUser)));
        }
    }

    return (
        <div>
            <div className="header-panel">
                <AppBaner />
                <SearchBox handleChange={handleChange} placeholder={'Search User ...'} />
                <div className="user-panel">
                    <UserPanelItem key={1} panelFunction={'Add Post'} icon={<Add />} onClickFunction={() => setHidden()} />
                    <UserPanelItem key={2} url={`/profile/${currentUserName}`} panelFunction={'Profile'} icon={<Profile />} />
                    <UserPanelItem key={3} panelFunction={'Sign Out'} icon={<SignOut />} onClickFunction={signOutStart}/>
                </div>
                <div className="hamburger-icon">
                    <HamburgerIcon onClick={() => setHamburgerMenu()}/>
                </div>
                {
                    hamburgerMenu ? (
                        <div className="hamburger-menu">
                            <HamburgerMenuItem key={1} panelFunction={'Add Post'} icon={<Add />} onClickFunction={() => setHidden()} setHamburgerMenu={setHamburgerMenu}/>
                            <HamburgerMenuItem key={2} url={`/profile/${currentUserName}`} panelFunction={'Profile'} icon={<Profile />} setHamburgerMenu={setHamburgerMenu}/>
                            <HamburgerMenuItem key={3} panelFunction={'Sign Out'} icon={<SignOut />} onClickFunction={signOutStart} setHamburgerMenu={setHamburgerMenu}/>
                        </div>
                    ) : null
                }
                {
                    inputLength > 2 && 
                        <div className="filtered-users">
                            {
                                filteredUsers.map(user => (
                                    <SearchBoxItem key={getKey()} userName={user} clearInput={clearInput}/>
                                ))
                            }
                        </div>
                }
            </div>
            {
                addPostPage ? (
                    <Overlay>
                        <AddPost setHidden={setHidden} />
                    </Overlay>
                ) : null
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserName: selectCurrentUserName,
    usersData: selectUsersData,
    isDataLoaded: selectIsDataLoaded
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPanel);