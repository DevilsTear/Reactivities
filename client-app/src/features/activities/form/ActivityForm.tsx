import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  activity: IActivity;
  setActivityEditMode: (activityEditMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  activity: initialActivity,
  setActivityEditMode,
  createActivity,
  editActivity,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialActivity) {
      return initialActivity;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const activitySubmitHandler = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };

      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const activityInputChangeHandler = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    console.log(name + ": " + value);
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={activitySubmitHandler}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity?.title}
          onChange={activityInputChangeHandler}
        />
        <Form.TextArea
          name="description"
          rows={2}
          placeholder="Description"
          value={activity?.description}
          onChange={activityInputChangeHandler}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity?.category}
          onChange={activityInputChangeHandler}
        />
        <Form.Input
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity?.date}
          onChange={activityInputChangeHandler}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity?.city}
          onChange={activityInputChangeHandler}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity?.venue}
          onChange={activityInputChangeHandler}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setActivityEditMode(false)}
        />
      </Form>
    </Segment>
  );
};
