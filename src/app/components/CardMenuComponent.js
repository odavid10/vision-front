import React, {  useState } from 'react';
import { Redirect } from "react-router-dom";
import { 
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import QRCode from "react-qr-code";

import { toAbsoluteUrl } from '../../_metronic';

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
  },
  nombremenu: {
    color: 'white',
  }
});

const CardMenu = ({menu}) => {
  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false)
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setEdit(true);
    setAnchorEl(null);
  };
  
  const handleView = () => {
    setEdit(true);
  };

  const handleShow = () => {
    setShow(!show);
    setAnchorEl(null);
  };

  if(edit) return <Redirect to={`/menu/${menu._id}`} />

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={menu.imagen ? menu.imagen : `${toAbsoluteUrl("/media/img/placeholderImg.jpg")}`}
            title="Contemplative Reptile"
          />
          <Divider />
          <CardContent className='d-flex justify-content-between'>
            <Typography gutterBottom variant="h5" component="h2"
              className="pt-2"
            >
              {menu.nombre}
            </Typography>
            <IconButton
              aria-label="options"
              aria-controls="options-menu"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="options-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={handleShow}>
                View QR
              </MenuItem>
              <MenuItem onClick={handleView}>
                Edit menu
              </MenuItem>
            </Menu>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        open={show}
        onClose={handleShow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Welcome to your restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography gutterBottom>
              know your menu by scanning the following QR code:
            </Typography>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <QRCode
              className="mt-4"
              value="www.google.com"
              size={256}
              bgColor="#282c34"
              fgColor="#fff"
              level="H"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mx-auto">
          <Button
            color="secondary"
            variant="contained"
            autoFocus
            onClick={handleShow}
          >
            Donwload
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CardMenu;
