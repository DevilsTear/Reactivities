import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [getActivities, setActivities] = useState<IActivity[]>([]);

  const [getSelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [getActivityEditMode, setActivityEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });

        setActivities(activities);
      });
  }, []);

  const activitySelectHandler = (id: string) => {
    setSelectedActivity(getActivities.filter((a) => a.id === id)[0]);
    setActivityEditMode(false);
  };

  const activityOpenCreateHandler = () => {
    setSelectedActivity(null);
    setActivityEditMode(true);
  };

  const activityCreateHandler = (activity: IActivity) => {
    setActivities([...getActivities, activity]);
    setSelectedActivity(activity);
    setActivityEditMode(false);
  };

  const activityEditHandler = (activity: IActivity) => {
    setActivities([
      ...getActivities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setActivityEditMode(false);
  };

  const activityDeleteHandler = (id: string) => {
    setActivities([...getActivities.filter((a) => a.id !== id)]);
    if (getSelectedActivity && getSelectedActivity.id === id) {
      setSelectedActivity(null);
      setActivityEditMode(false);
    }
  };

  return (
    <Fragment>
      <NavBar openCreateActivity={activityOpenCreateHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={getActivities}
          selectActivity={activitySelectHandler}
          selectedActivity={getSelectedActivity}
          activityEditMode={getActivityEditMode}
          setActivityEditMode={setActivityEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={activityCreateHandler}
          editActivity={activityEditHandler}
          deleteActivity={activityDeleteHandler}
        />
      </Container>
    </Fragment>
  );
};

export default App;
