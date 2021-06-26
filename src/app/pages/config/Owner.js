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

const Owner = (props) => {
    const classes = useStyles();
    const user = useSelector(({ auth }) => auth.user);
    console.log('user redux', user)

    return (
        <div className="kt-login__body">
            <Typography variant="h2" color="initial">Edit owner information</Typography>

            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="md">
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confimrPass: "",
                            fullname: "",
                            telefono: "",
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
                                {status && (
                                    <div role="alert" className="alert alert-danger">
                                        <div className="alert-text">{status}</div>
                                    </div>
                                )}

                                <Grid container spacing={3}>
                                    <Grid item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                    >
                                        <TextField
                                            margin="normal"
                                            placeholder="Username"
                                            className="kt-width-full"
                                            name="username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(touched.username && errors.username)}
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
                                            placeholder="Fullname"
                                            name="fullname"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.fullname}
                                            helperText={touched.fullname && errors.fullname}
                                            error={Boolean(touched.fullname && errors.fullname)}
                                        />
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                    >
                                        <TextField
                                            margin="normal"
                                            placeholder="Email"
                                            className="kt-width-full"
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(touched.email && errors.email)}
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
                                            placeholder="Password"
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(touched.password && errors.password)}
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
                                            placeholder="Confirm password"
                                            name="confimrPass"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.confimrPass}
                                            helperText={touched.confimrPass && errors.confimrPass}
                                            error={Boolean(touched.confimrPass && errors.confimrPass)}
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
  )(Owner)
);

