import Search from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'

const Users = () => {
    return (
        <div className='users_groups_'>
            <div className="users_groups_Header">
                <img src="/icon-512.png" alt="Logo" style={{ height: '2rem', width: '2rem' }} />
                <p className="users_groups_Title">
                    Users
                </p>
            </div>
            <div className="sidebarSearch">
                <IconButton>
                    <Search />
                </IconButton>
                <input placeholder='Search' type="text" name="search" id="search" />
            </div>
            <div className="users_groups_List">
                <div className="users_groups_ListItem">
                    <p className="chatPhoto">
                        S
                    </p>
                    <p className="chatTitle">
                        Sample User
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Users