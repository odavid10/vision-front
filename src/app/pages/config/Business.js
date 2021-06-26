/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";

const useStyles = makeStyles((theme) => ({

}));

const Business = (props) => {
  const classes = useStyles();
  const user = useSelector(({ auth }) => auth.user);
  console.log('user redux', user)

  return (
    <div className="kt-login__body">
      <Typography variant="h2" color="initial">Edit business information</Typography>

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Formik
            initialValues={{
              nombre: "",
              direccion: "",
              instagram: "",
              twitter: "",
              facebook: "",
            }}

            onSubmit={async (values, { setStatus, setSubmitting }) => {
              console.log('values', values);

              // saveMenu(values.nombre, secciones, base64)
              // .then(({data: {save, menu: {_id}}}) => {
              //     if (save) setCreado({status: true, id: _id})
              // })
              // .catch((error) => console.log(error))
            }}
        >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <TextField
                        margin="normal"
                        placeholder="Restaurant name"
                        className="kt-width-full"
                        name="nombre"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nombre}
                        helperText={touched.nombre && errors.nombre}
                        error={Boolean(touched.nombre && errors.nombre)}
                      />
                    </Grid>
                    <Grid item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <TextField
                        className={classes.seccion}
                        margin="normal"
                        placeholder="Address"
                        name="direccion"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.direccion}
                        helperText={touched.direccion && errors.direccion}
                        error={Boolean(touched.direccion && errors.direccion)}
                      />
                    </Grid>
                    <Grid item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <TextField
                        margin="normal"
                        placeholder="Instagram"
                        className="kt-width-full"
                        name="instagram"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.instagram}
                        helperText={touched.instagram && errors.instagram}
                        error={Boolean(touched.instagram && errors.instagram)}
                      />
                    </Grid>
                    <Grid item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <TextField
                        className={classes.seccion}
                        margin="normal"
                        placeholder="Twitter"
                        name="twitter"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.twitter}
                        helperText={touched.twitter && errors.twitter}
                        error={Boolean(touched.twitter && errors.twitter)}
                      />
                    </Grid>
                    <Grid item
                      xs={12}
                      sm={12}
                      md={6}
                    >
                      <TextField
                        className={classes.seccion}
                        margin="normal"
                        placeholder="Facebook"
                        name="facebook"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.facebook}
                        helperText={touched.facebook && errors.facebook}
                        error={Boolean(touched.facebook && errors.facebook)}
                      />
                    </Grid>
                  </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </ Box>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
  )(Business)
);

