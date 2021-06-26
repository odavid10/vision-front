/* eslint-disable no-restricted-imports */
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { 
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    makeStyles,
    Typography, Grid, Box, TextField,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { toAbsoluteUrl } from '../../_metronic';
import { Formik } from 'formik';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  titulo: {
    padding: 'auto'
  },
  input: {
    display: 'none',
  },
  avatar: {
    height: 120,
    width: 150,
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <ZoomOutMapIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const CardSeccion = ({idMenu, seccion}) => {
  const classes = useStyles();
  const [crearPlatillo, setCrearPlatillo] = useState(false)
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [base64, setBase] = useState('');

  if (crearPlatillo) return <Redirect to={`/platillo/${idMenu}/${seccion._id}`} />

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onImageChange = async (event) => {
    const reader = new FileReader();
    event.persist();

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      await setImage(URL.createObjectURL(event.target.files[0]));

      reader.addEventListener("load", function () {
        // convert image file to base64 string
        setBase(reader.result);
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            variant="h5"
            align='center'            
          >
            {seccion.nombre}
          </Typography>
          <Divider />   
          <List dense={false}>
            {
              seccion.platillos.map((plato) => (
                <ListItem key={plato._id}>
                  <ListItemText
                    primary={plato.nombre}
                    secondary={plato.precio}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Edit seccion">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Delete seccion">
                      <CancelIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            <ListItem button
              onClick={() => setCrearPlatillo(true)}
            >
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="New platillo" />
            </ListItem> 
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardSeccion;
