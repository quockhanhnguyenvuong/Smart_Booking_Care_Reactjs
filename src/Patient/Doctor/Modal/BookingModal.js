import React, { Component } from "react";
import "./BookingModal.scss";
import { connect } from "react-redux";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
// import DatePicker from "../../../components/Input/DatePicker";
// import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  postPatientBookAppointment,
} from "../../../services/userService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      email: "",
      address: "",
      reason: "",
      yearOld: "",

      firstName: "",
      lastName: "",
      doctorId: "",
      gender: "",
      genderArr: [],
      timeType: "",
      fullName: "",
      bookingType: "",
      currentDate: "",
      currentDateAtHome: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    await this.getGenderFormReact();
    let genderArr = this.state.genderArr;
    this.setState({
      gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
    });
    if (this.props.type === "ATHOME") {
      this.setState({
        doctorId: this.props.doctorIdFromParent,
      });
    }
  }

  getDoctorId = () => {
    let { dataExtra } = this.props;
    this.setState({
      doctorId: dataExtra.doctorId,
    });
  };
  getGenderFormReact = async () => {
    let response = await getAllCodeService("gender");
    if (response && response.errCode === 0) {
      this.setState({
        genderArr: response.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime !== !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      yearOld: date[0],
    });
  };

  onChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buildTimeBooking = (dataTime) => {
    // console.log("check renderTimeBooking: ", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.timeTypeData.valueVI;

      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
      return `${time} - ${this.capitalizeFirstLetter(date)}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = `${dataTime.lastName} ${dataTime.firstName}`;
      return name;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    // validate input
    // data.email || !data.doctorId || !data.timeTypeData || !data.date
    // let date = new Date(this.state.yearOld).getTime();
    this.setState({
      isShowLoading: true,
    });
    let res = {};
    if (this.props.type === "ONLINE") {
      let timeString = this.buildTimeBooking(this.props.dataTime);
      let doctorName = this.buildDoctorName(this.props.dataTime.doctorData);
      res = await postPatientBookAppointment({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullName: this.state.firstName + " " + this.state.lastName,
        phonenumber: this.state.phonenumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        date: this.state.currentDate,
        yearOld: this.state.yearOld,
        gender: this.state.gender,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        timeString: timeString,
        doctorName: doctorName,
        bookingType: "ONLINE",
      });
    } else if (this.props.type === "ATHOME") {
      // console.log("check state", this.state);
      let { currentDateAtHome, doctorId } = this.state;
      if (!currentDateAtHome) {
        toast.warn("Vui lòng chọn thòi gian!");
        return;
      }
      let formatedDate = new Date(currentDateAtHome).getTime();
      let doctorName = this.buildDoctorName(this.props.doctorName);
      let date = moment.unix(+formatedDate / 1000).format("dddd - DD/MM/YYYY");

      res = await postPatientBookAppointment({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fullName: this.state.firstName + " " + this.state.lastName,
        phonenumber: this.state.phonenumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        date: formatedDate,
        gender: this.state.gender,
        doctorId: doctorId,
        doctorName: doctorName,
        bookingType: this.props.type,
        timeType: "T0",
        timeString: date,
      });
    }

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
      this.setState({
        isShowLoading: false,
      });
      this.props.closeBookingClose();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Booking a new appointment error!");
    }
    console.log("check err", res);
  };

  handleFillInfoUser = (userInfo) => {
    this.setState({
      phonenumber: userInfo.phonenumber,
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      address: userInfo.address,
    });
  };

  handleChangeDatePicker = (date) => {
    this.setState({
      currentDateAtHome: date[0],
    });
  };

  render() {
    let { isOpenModal, closeBookingClose, dataTime, type, doctorIdFromParent } =
      this.props;
    let genders = this.state.genderArr;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
      this.state.currentDate = dataTime.date;
    }

    let today = new Date(new Date().setDate(new Date().getDate()));
    // console.log("check data from booking modal", doctorName);
    // console.log("check dataTime:", this.state.currentDate);
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <Modal
            isOpen={isOpenModal}
            className="modal-container"
            size="lg"
            centered
            // backdrop={true}
          >
            <ModalHeader className="d-flex">
              <span className="left">{this.props.title}</span>
            </ModalHeader>
            <ModalBody>
              <div className="modal-body">
                <div className="doctor-infor">
                  <ProfileDoctor
                    doctorId={
                      this.props.type === "ONLINE"
                        ? doctorId
                        : doctorIdFromParent
                    }
                    isShowDescriptionDoctor={true}
                    dataTime={dataTime}
                    type={type}
                    isShowLinkDetail={false}
                    isShowLinkPrice={true}
                  />
                </div>

                <div className="container">
                  <div className="row">
                    <div
                      className="col-12 text-end mb-1 text-info"
                      onClick={() =>
                        this.handleFillInfoUser(this.props.userInfo)
                      }
                    >
                      <span>Điền giúp thông tin?</span>
                    </div>
                    <div className="col-6 form-group mb-3">
                      <label>Họ</label>
                      <input
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "firstName")
                        }
                      />
                    </div>
                    <div className="col-6 form-group mb-3">
                      <label>Tên</label>
                      <input
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "lastName")
                        }
                      />
                    </div>
                    <div className="col-6 form-group mb-3">
                      <label>Số điện thoại</label>
                      <input
                        className="form-control"
                        value={this.state.phonenumber}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "phonenumber")
                        }
                      />
                    </div>
                    <div className="col-6 form-group mb-3">
                      <label>Địa chỉ Email</label>
                      <input
                        className="form-control"
                        value={this.state.email}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "email")
                        }
                      />
                    </div>
                    <div className="col-12 form-group mb-3">
                      <label>Địa chỉ liên hệ</label>
                      <input
                        className="form-control w-100"
                        value={this.state.address}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "address")
                        }
                      />
                    </div>

                    <div className="col-12 form-group mb-3">
                      <label>Lý do khám</label>
                      <input
                        className="form-control  w-100 "
                        value={this.state.reason}
                        onChange={(event) =>
                          this.handleOnchangeInput(event, "reason")
                        }
                      />
                    </div>

                    {type === "ONLINE" ? (
                      <div className="col-6 form-group mb-3">
                        <label>Ngày sinh</label>
                        <input
                          className="form-control"
                          value={this.state.yearOld}
                          onChange={(event) =>
                            this.handleOnchangeInput(event, "yearOld")
                          }
                        />
                      </div>
                    ) : (
                      <div className="col-6 form-group mb-3">
                        <label>Chọn ngày khám</label>
                        <br />
                        <DatePicker
                          onChange={this.handleChangeDatePicker}
                          className="form-control"
                          value={this.state.currentDateAtHome}
                          minDate={today}
                        />
                      </div>
                    )}

                    <div className="col-6 form-group mb-3">
                      <label>Giới tính </label>
                      <select
                        className="form"
                        value={this.state.gender}
                        onChange={(event) => {
                          this.onChangInput(event, "gender");
                        }}
                      >
                        {genders &&
                          genders.length > 0 &&
                          genders.map((item, index) => {
                            return (
                              <option selected key={index} value={item.keyMap}>
                                {item.valueVI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="btn "
                onClick={() => this.handleConfirmBooking()}
              >
                Xác nhận
              </Button>
              <Button
                color="secondary"
                className="btn"
                onClick={closeBookingClose}
              >
                Hủy
              </Button>
            </ModalFooter>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
