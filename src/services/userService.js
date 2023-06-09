import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userID) => {
  return axios.delete("/api/delete-user", { data: { id: userID } });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const createNewPasswordService = (data) => {
  return axios.post("/api/create-new-password", data);
};

//
const getscheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
  );
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`,
  );
};

const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const postSendRefuse = (data) => {
  return axios.post(`/api/send-refuse`, data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`,
  );
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getAllDoctors,
  saveDetailDoctorService,
  createNewSpecialty,
  getAllSpecialty,
  saveBulkScheduleDoctor,
  createNewPasswordService,
  getscheduleDoctorByDate,
  getProfileDoctorById,
  postPatientBookAppointment,
  getDetailInforDoctor,
  getTopDoctorHomeService,
  getExtraInforDoctorById,
  postVerifyBookAppointment,
  getAllPatientForDoctor,
  postSendRemedy,
  postSendRefuse,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllDetailSpecialtyById,
};
