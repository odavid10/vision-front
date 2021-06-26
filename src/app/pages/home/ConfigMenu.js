/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  Select,
  SvgIcon,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import QRCode from "react-qr-code";

import CardSeccion from '../../components/CardSeccionComponent';
import { getmenu } from "../../crud/menu.crud";

const useStyles = makeStyles((theme) => ({
  cancel: {
    position: 'absolute',
    bottom: theme.spacing(8),
    left: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  buscar: {
    paddingTop: theme.spacing(1),
    minWidth: 250
  },
  botones: {
    minWidth: 150,
    marginTop: theme.spacing(2),
  }
}));

const ConfigMenu = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const [menu, setMenu] = useState(undefined);
  const [vista, setVista] = React.useState('Card');
  const [orden, setOrden] = React.useState('Name');
  const [show, setShow] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    getmenu(id)
      .then(({data: { menu }}) => {
        console.log('menu', menu)
        setMenu(menu);
      })
      .catch( e => console.log(e))
  }, []);

  const handleChangeView = (event) => {
    setVista(event.target.value);
  };
  
  const handleChangeOrder = (event) => {
    setOrden(event.target.value);
  };

  const handleChange = (event) => {
    const text = event.target.value;
    console.log(text)
    // filter(text)
  }

  const handleShow = () => {
    setShow(!show);
  };
  
  const handleClose = () => {
    setGuardado(!guardado);
  };

  if (guardado) return <Redirect to="/mismenus"/>

  if (cancel) return <Redirect to="/mismenus"/>

  return (
    <React.Fragment>
      <div className="kt-login__body">
        <Typography variant="h2" color="initial" className="mb-4">{menu && menu.nombre}</Typography>
        <div className="d-flex justify-content-start mb-2">
          <Grid container spacing={2}>
            <Grid item
              className="d-flex"
              sm={8}
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="view-select">View as:</InputLabel>
                <Select
                  native
                  value={vista}
                  onChange={handleChangeView}
                  label="View as:"
                  inputProps={{
                    name: 'View as:',
                    id: 'view-select',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={'List'}>List</option>
                  <option value={'Table'}>Table</option>
                  <option value={'Card'}>Card</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="order-select">Order by:</InputLabel>
                <Select
                  native
                  value={orden}
                  onChange={handleChangeOrder}
                  label="Order by:"
                  inputProps={{
                    name: 'Order by:',
                    id: 'order-select',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={'Name'}>Name</option>
                  <option value={'Date created'}>Date created</option>
                </Select>
              </FormControl>
              <Box maxWidth={250} className={classes.buscar}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search seccion"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item
              sm={4}
            >
              <Grid container spacing={2}>
                <Grid item
                >
                  <Button
                    className={classes.botones}
                    variant="outlined"
                    color="primary"
                  >
                    Custom
                  </Button>
                </Grid>
                <Grid item
                >
                  <Button
                    className={classes.botones}
                    variant="contained"
                    color="secondary"
                    onClick={handleShow}
                  >
                    Save menu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Divider className="mb-3" />
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {
              menu && (
                menu.secciones.map((seccion) => (
                  <Grid item
                    key={seccion._id}
                    sm={6}
                    md={4}
                  >
                    <CardSeccion idMenu={menu._id} seccion={seccion} />
                  </Grid>
                ))
              )
            }
          </Grid>
          <Fab
            aria-label="add"
            className={classes.fab}
            // onClick={() =>  }
          >
            <AddIcon />
          </Fab>
        </Container>
        <Fab
          aria-label="add seccion"
          color="primary"
          className={classes.cancel}
          onClick={() => setCancel(true) }
        >
          <ChevronLeftIcon />
        </Fab>
      </div>
      <Dialog
        open={show}
        onClose={handleShow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3" gutterBottom>
            Complete
          </Typography>
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <Typography gutterBottom>
              Successfully generated codeknow your menu by scanning the following QR code:
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
          <Button onClick={handleClose} color="secondary" variant="contained" autoFocus>
            okey
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default injectIntl(
  connect(
    null,
  )(ConfigMenu)
);
