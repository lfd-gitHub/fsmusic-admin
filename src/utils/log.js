/* eslint-disable no-console */
export default {
  d: (msg) => {
    if (import.meta.env.MODE !== 'production') console.log(msg);
  },
};
