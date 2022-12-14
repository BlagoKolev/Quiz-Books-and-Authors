import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';

function Header() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser, score, setScore } = useContext(UserContext);

  const navigate = useNavigate();
  let newQuestionButton;

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    setScore(null);
    navigate('/');
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  if (user && user.role === 'Administrator') {
    newQuestionButton = <Link to={'/addQuestion'}>
      <Button sx={{mx:3}} variant="outlined">Add Question</Button>
    </Link>;
  } else {
    newQuestionButton = <div />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
            <h3>Books Quiz</h3>
          </Link>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {newQuestionButton}

          {user
            ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.username}
            </Typography>
            : <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>}
          {score && <div>Total score: {score}</div>}

          <div>
            {user &&
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            }
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            {!user &&
              <Link to={'/login'}><Button variant="outlined">Login</Button>
              </Link>
            }
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header