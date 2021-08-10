import axios from "axios";

export const createLeague = async (authtoken, values, id) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/league/new`,
    {
      values,
      user: id
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getLeagues = async (id) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/${id}/leagues`);
};

export const getLeague = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/league/${id}`
  );
};

export const updateLeague = async (authtoken,id,values) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/league/${id}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeLeague = async (authtoken, id) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/league/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};