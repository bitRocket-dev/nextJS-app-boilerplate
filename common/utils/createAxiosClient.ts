/** @format */

import Axios from 'axios';

export const AxiosClient = () =>
  Axios.create({
    headers: { Authorization: 'Bearer ----', apiKey: '' },
  });
