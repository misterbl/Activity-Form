import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { saveActivityData } from "../actions/actionCreators/apiActions";
import ActivityForm from "../components/ActivityForm";
import ROUTES from "../const/route";

export class Activity extends React.Component {
  state = {
    activityData: JSON.parse(localStorage.getItem("activityData"))
  };
  handleSubmit = async data => {
    const {
      saveActivityData,
      history: { push }
    } = this.props;
    await localStorage.setItem("activityData", JSON.stringify(data));
    await saveActivityData(data);
    push(ROUTES.ADDRESS);
  };
  backToPreviousPage = () => {
    this.props.history.push(ROUTES.INDEX);
  };

  render() {
    const { activityData } = this.state;
    return (
      <main className="bg-white form-container p-5">
        <h1 className="font-30 text-center mb-5">About your activity</h1>
        <Formik
          validationSchema={Yup.object().shape({
            activityName: Yup.string().required("Activity name requiered"),
            activityWebpage: Yup.string().required("Activity webpage requiered")
          })}
          initialValues={{
            activityName: activityData ? activityData.activityName : "",
            minRecommendedAge: activityData
              ? activityData.minRecommendedAge
              : "No Min. Age",
            maxRecommendedAge: activityData
              ? activityData.maxRecommendedAge
              : "No Max. Age",
            activitWebpage: activityData ? activityData.activitWebpage : "",
            activityPhoneNumber: activityData
              ? activityData.activityPhoneNumber
              : ""
          }}
          onSubmit={this.handleSubmit}
          render={formikProps => (
            <ActivityForm
              {...formikProps}
              backToPreviousPage={this.backToPreviousPage}
            />
          )}
        />
      </main>
    );
  }
}

export const mapDispatchToProps = {
  saveActivityData
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Activity)
);