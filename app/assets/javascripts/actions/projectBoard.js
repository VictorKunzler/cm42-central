import actionTypes from "./actionTypes";
import { receiveUsers } from "./user";
import { receiveStories } from "./story";
import { receivePastIterations } from "./pastIterations";

const requestProjectBoard = () => ({
  type: actionTypes.REQUEST_PROJECT_BOARD
});

const receiveProjectBoard = projectId => ({
  type: actionTypes.RECEIVE_PROJECT_BOARD,
  data: projectId
});

const errorRequestProjectBoard = error => ({
  type: actionTypes.ERROR_REQUEST_PROJECT_BOARD,
  error: error
});

const receiveProject = data => ({
  type: actionTypes.RECEIVE_PROJECT,
  data
});

export const fetchProjectBoard = projectId =>
  async (dispatch, getState, { ProjectBoard }) => {
    dispatch(requestProjectBoard());

    try {
      const {
        project, users,
        stories, pastIterations
      } = await ProjectBoard.get(projectId);

      dispatch(receiveProject(project));
      dispatch(receivePastIterations(pastIterations));
      dispatch(receiveUsers(users));
      dispatch(receiveStories(stories));
      dispatch(receiveProjectBoard(projectId));
    }
    catch (error) {
      return dispatch(errorRequestProjectBoard(error));
    }
  };
