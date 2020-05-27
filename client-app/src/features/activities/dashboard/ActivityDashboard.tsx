import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  activityEditMode: boolean;
  setActivityEditMode: (activityEditMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  activityEditMode,
  setActivityEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {setActivityEditMode && !activityEditMode && selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            setActivityEditMode={setActivityEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {activityEditMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity?.id) || 0}
            activity={selectedActivity!}
            setActivityEditMode={setActivityEditMode}
            createActivity = {createActivity}
            editActivity = {editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
