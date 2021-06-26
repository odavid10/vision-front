export default {
  header: {
    self: {},
    items: [
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Mis Menús",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "mismenus",
        bullet: "dot"
      },
      {
        title: "Configuracion",
        root: true,
        bullet: "dot",
        icon: "flaticon-danger",
        submenu: [
          {
            title: "Owner",
            page: "configuration/owner"
          },
          {
            title: "Business",
            page: "configuration/business"
          },
        ]
      }
    ]
  }
};
