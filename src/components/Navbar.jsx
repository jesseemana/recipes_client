import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, redirect } from 'react-router-dom'
import { setLogout } from '../state/appSlice'
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Logout from '@mui/icons-material/Logout';
  
import axios from "../api/axios"
const LOGOUT_URL = '/auth/logout'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.access_token)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL, { headers: { Authorization: `Bearer ${token}` }}) // CLEARS REFRESH TOKEN FROM COOKIE
      dispatch(setLogout())
      redirect('/auth')
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  
  let content
  if(!token) content = (
    <>
      <div className="p-3 max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between items-center">
        <Link to={'/feed'}>
          <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
        </Link>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', border: 'white' }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography sx={{font: 12}}>
              Login/Register
            </Typography>
            <Avatar sx={{ width: 38, height: 38, ml:1 }} />
          </IconButton>
        </Box> */}
        {/* <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 38,
                height: 38,
                ml: -0.5,
                mr: 1,
             },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to={'/auth'}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
              <Logout fontSize="small" />
              </ListItemIcon>
              Login/Register
            </MenuItem>
          </Link>
        </Menu> */}
      </div>
    </>
  )
  else content = (
    <>
      <div className="max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between">
        <Link to={'/feed'}>
          <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
        </Link>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              background: '#FFF',
              '&:hover': {
                background: '#FFF'
            }}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography>
              {user.firstname}
            </Typography>
            <Avatar sx={{ width: 38, height: 38 }} />
          </IconButton>
        </Box> */}
       
      </div>
    </>
  )
  

  return content
}

export default Navbar

{/* <div className="max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10">
  <div className="py-4 flex justify-between items-center">
    <Link to={'/feed'}>
      <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
    </Link>
    <div className="flex gap-x-4">
      <Link to={`/newrecipe`} className="capitalize">
        <MdOutlineAddBox className="text-2xl text-[#38D6C4]" />
      </Link>
      <Link to={`${'/profile/'}${user._id}`} className="capitalize">
        <FiUser className="text-2xl text-[#38D6C4]" />
      </Link>
      <button onClick={handleLogout}>
        <FiLogOut className="text-2xl text-[#38D6C4]" />
      </button>
    </div>
  </div>
</div> */}