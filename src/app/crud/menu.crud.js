import axios from "axios";
import api from "../utils/api"

export const SAVE_MENU_URL = api + 'menu';
export const MENUS_URL = api + 'menus';
export const MENU_URL = api + 'menu';
export const SAVE_PLATILLO_URL = api + 'platillo';

export const saveMenu = (nombre, secciones, imagen) => {
  return axios.post(SAVE_MENU_URL, { nombre, secciones, imagen });
}

export const getmenus = () => {
  return axios.get(MENUS_URL);
}

export const getmenu = (id) => {
  return axios.get(MENU_URL + `/${id}`);
}

export const savePlatillo = (menu, seccion, platillo) => {
  const { nombre, descripcion, precio, foto } = platillo;
  return axios.post(SAVE_PLATILLO_URL + `/${menu}/${seccion}`, 
    { nombre, descripcion, precio, foto }
  );
}
