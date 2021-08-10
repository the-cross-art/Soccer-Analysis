import axios from "axios";

export const createPlayer = async (authtoken, values) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/player/new`,
    {
      values
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getPlayers = async (id) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/${id}/players`);
};

export const getPlayer = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/player/${id}`
  );
};

export const updatePlayer = async (authtoken,id,values) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/player/${id}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removePlayer = async (authtoken, id) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/player/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updatePlayerTeam = async (authtoken,id,values) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/player/${id}/team`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};