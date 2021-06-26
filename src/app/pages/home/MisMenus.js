/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
  Box,
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

import CardMenu from '../../components/CardMenuComponent';
import { getmenus } from "../../crud/menu.crud";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  buscar: {
    maxWidth: 450
  }
}));

const MisMenus = (props) => {
  
  const classes = useStyles();
  const [crear, setCrear] = useState(false);
  const [menus, setMenus] = useState([]);
  const [vista, setVista] = React.useState('Card');
  const [orden, setOrden] = React.useState('Name');

  useEffect(() => {
    getmenus()
      .then(({data: { menus }}) => {
        console.log('menus',menus)
        setMenus(menus);
      })
      .catch( e => console.log(e))
  }, []);

  if (crear) return <Redirect to="/crearmenu" />

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

  return (
    <div className="kt-login__body">
      <Typography variant="h2" color="initial">Mis Menús</Typography>
      <div className="d-flex justify-content-start mb-2">
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
        <Box maxWidth={450} className="pt-2">
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
            placeholder="Search menu"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      </div>
      <Divider />

      <Grid container spacing={2} className="mt-4">
      {
        menus.map((menu) => (
          <Grid item 
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            key={menu._id}
          >
            <CardMenu menu={menu} />
          </Grid>
        ))
      }
      </Grid>

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setCrear(true) }
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
  )(MisMenus)
);

