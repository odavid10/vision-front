/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Fab,
    Grid,
    makeStyles,
    TextField,
    Typography, 
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { toAbsoluteUrl } from '../../../_metronic';
import { saveMenu } from "../../crud/menu.crud";

const useStyles = makeStyles((theme) => ({
    cancel: {
        bottom: theme.spacing(8),
        left: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(2),
    },
    anadir: {
        marginTop: theme.spacing(3),
        color: '#fbbf4d',
    },
    seccion: {
        maxWidth: 250,
        marginRigth: theme.spacing(2)
    },
    avatar: {
        height: 200,
        width: 300,
    },
    button: {
        margin: theme.spacing(3),
    },
    input: {
        display: 'none',
    },
}));

const CrearMenu = (props) => {
    const classes = useStyles();
    const [creado, setCreado] = useState({
        status: false,
        id: null
    });
    const [image, setImage] = useState('');
    const [base64, setBase] = useState('');
    const [open, setOpen] = useState(false)
    const [cancel, setCancel] = useState(false);

    if (creado.status) return <Redirect to={`/menu/${creado.id}`} />
    if (cancel) return <Redirect to={`/mismenus`} />

    const handleToggle = () => {
        setOpen(!open);
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
    <React.Fragment>
        <div className="kt-login__body">
            <Typography variant="h2" color="initial">Crear menú</Typography>
        
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
                            seccionUno: "",
                            seccionDos: "",
                            seccionTres: "",
                        }}

                        onSubmit={async (values, { setStatus, setSubmitting }) => {
                            console.log('values', values);
                            const secciones = [
                                values.seccionUno,
                                values.seccionDos,
                                values.seccionTres
                            ]
                            console.log('enviar', values.nombre, secciones);

                            handleToggle();

                            saveMenu(values.nombre, secciones, base64)
                            .then(({data: {save, menu: {_id}}}) => {
                                if (save) setCreado({status: true, id: _id})
                            })
                            .catch((error) => console.log(error))

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

                                <Grid container spacing={1}>
                                    <Grid item
                                        xs={12}
                                    >
                                        <Box
                                        alignItems="center"
                                        display="flex"
                                        flexDirection="column"
                                        >
                                            <img
                                                className={classes.avatar}
                                                src={image ? image : `${toAbsoluteUrl("/media/img/placeholderImg.jpg")}`}
                                                alt="pic saucer"
                                            />
                                            <Box
                                            display="flex"
                                            justifyContent="center"
                                            className={classes.upload}
                                            >
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={onImageChange}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button
                                                    className="mt-3"
                                                    variant="text"
                                                    color="primary"
                                                    component="span"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                Upload picture
                                                </Button>
                                            </label>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                    >
                                        <TextField
                                            margin="normal"
                                            placeholder="Menu name"
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
                                    >
                                        <TextField
                                            className={classes.seccion}
                                            margin="normal"
                                            placeholder="Seccion name"
                                            name="seccionUno"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.seccionUno}
                                            helperText={touched.seccionUno && errors.seccionUno}
                                            error={Boolean(touched.seccionUno && errors.seccionUno)}
                                        />
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                    >
                                        <TextField
                                            className={classes.seccion}
                                            margin="normal"
                                            placeholder="Seccion name"
                                            name="seccionDos"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.seccionDos}
                                            helperText={touched.seccionDos && errors.seccionDos}
                                            error={Boolean(touched.seccionDos && errors.seccionDos)}
                                        />
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                    >
                                        <TextField
                                            className={classes.seccion}
                                            margin="normal"
                                            placeholder="Seccion name"
                                            name="seccionTres"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.seccionTres}
                                            helperText={touched.seccionTres && errors.seccionTres}
                                            error={Boolean(touched.seccionTres && errors.seccionTres)}
                                        />
                                    </Grid>
                                </Grid>

                                <div className="fixed-bottom">
                                    <Fab
                                        color="primary"
                                        aria-label="cancel"
                                        className={classes.cancel}
                                        onClick={() => setCancel(true) }
                                    >
                                        <ChevronLeftIcon />
                                    </Fab>
                                    <Fab
                                        color="secondary"
                                        aria-label="add menu"
                                        className={classes.fab}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        <ChevronRightIcon />
                                    </Fab>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Container>
            </ Box>
        </div>
        <Backdrop className={classes.backdrop} open={open} onClick={handleToggle}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </React.Fragment>
  );
}

export default injectIntl(
  connect(
    null,
  )(CrearMenu)
);

