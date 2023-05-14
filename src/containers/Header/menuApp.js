//admin menu
export const adminMenu = [
  {
    //hệ thống
    name: "Quản lý hệ thống",
    menus: [
      {
        name: "Quản lý người dùng",
        link: "/system/user-manage",
      },
      {
        name: "Quản lý bác sĩ",
        link: "/system/manage-doctor",
      },
      {
        name: "Quản lý lịch khám bệnh",
        link: "/doctor/manage-schedule",
      },
      // detail doctor
      {
        name: "detail doctor",
        link: "/doctor/detail-doctor",
      },
    ],
  },
  {
    //Phòng khám
    name: "Phòng khám",
    menus: [
      {
        name: "Quản lý phòng khám",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Chuyên khoa
    name: "Chuyên khoa",
    menus: [
      {
        name: "Quản lý chuyên khoa",
        link: "/system/manage-specialty",
      },
    ],
  },
];

//doctor menu
export const doctorMenu = [
  {
    //hệ thống
    name: "Quản lý hệ thống",
    menus: [
      {
        name: "Quản lý lịch khám bệnh",
        link: "/doctor/manage-schedule",
      },
      {
        name: "Quản lý bệnh nhân khám bệnh",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
