/** @format */

import Axios from 'axios';

export const AxiosClient = () => {
  return Axios.create({
    headers: { Authorization: 'Bearer ----', apiKey: '' },
  });
};
