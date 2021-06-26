/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    makeStyles,
    TextField,
    Typography, 
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { toAbsoluteUrl } from '../../../_metronic';
import { savePlatillo } from "../../crud/menu.crud";

const useStyles = makeStyles((theme) => ({
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
    fab: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(2),
    },
    cancel: {
        bottom: theme.spacing(8),
        left: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const CrearPlatillo = (props) => {
    const classes = useStyles();
    const { menu, seccion } = useParams();
    const [creado, setCreado] = useState({
        stastus: false,
        platillo: undefined
    });
    const [cancelado, setCancelado] = useState(false)
    const [image, setImage] = useState('');
    const [base64, setBase] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setLoading(!loading);
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

    const confirm = () => {
        handleClose();
        handleToggle();
        savePlatillo(menu, seccion, creado.platillo)
            .then(({data: { save }}) => {
                if (save) {
                    handleToggle();
                    setCreado({...creado, status: true});
                }
            })
            .catch((e) => console.log(e))
    }

    if (creado.status) return <Redirect to={`/menu/${menu}`} />

    if (cancelado) return <Redirect to={`/menu/${menu}`} />

    return (
        <div className="kt-login__body">
            <Typography variant="h2" color="initial">Add Saucer</Typography>
            
            <Box
                className="mt-5"
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="md">
                    <Formik
                        initialValues={{
                            nombre: "",
                            descripcion: "",
                            precio: "",
                        }}

                        onSubmit={async (values, { setStatus, setSubmitting }) => {
                            handleClickOpen();
                            const platillo = {
                                nombre: values.nombre,
                                descripcion: values.descripcion,
                                precio: values.precio,
                                foto: base64
                            };
                            setCreado({...creado, platillo});
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
                                <Grid container spacing={2}>
                                    <Grid item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
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
                                        sm={12}
                                        md={8}
                                        lg={8}
                                        xl={8}
                                    >
                                        <TextField
                                            className="mb-4"
                                            fullWidth
                                            margin="normal"
                                            placeholder="Name saucer"
                                            name="nombre"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.nombre}
                                            helperText={touched.nombre && errors.nombre}
                                            error={Boolean(touched.nombre && errors.nombre)}
                                        />
                                        <TextField
                                            className="mb-4"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            margin="normal"
                                            placeholder="Description"
                                            name="descripcion"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.descripcion}
                                            helperText={touched.descripcion && errors.descripcion}
                                            error={Boolean(touched.descripcion && errors.descripcion)}
                                        />
                                        <TextField
                                            className="mb-4"
                                            margin="normal"
                                            placeholder="Price"
                                            name="precio"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.precio}
                                            helperText={touched.precio && errors.precio}
                                            error={Boolean(touched.precio && errors.precio)}
                                        />
                                    </Grid>
                                </Grid>
                                <div className="fixed-bottom">
                                    <Fab
                                        color="secondary"
                                        aria-label="add saucer"
                                        className={classes.fab}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        <ChevronRightIcon />
                                    </Fab>
                                    <Fab
                                        className={classes.cancel}
                                        color="primary"
                                        aria-label="cancel"
                                        onClick={() => setCancelado(true) }
                                    >
                                        <ChevronLeftIcon />
                                    </Fab>
                                </div>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">Confirm add saucer</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Confirm that you want to add the saucer
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose} >
                                        cancel
                                    </Button>
                                    <Button onClick={confirm} color="secondary" autoFocus>
                                        Save
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </form>
                        )}
                    </Formik>
                </Container>
            </ Box>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );            
}

export default injectIntl(
  connect(
    null,
  )(CrearPlatillo)
);
