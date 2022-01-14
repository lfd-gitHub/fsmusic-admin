/* eslint-disable no-console */
export default {
  tag: (tag) => {
    if (import.meta.env.MODE !== 'production')
      console.log(`========${tag}========`);
  },
  d: (msg, ...args) => {
    if (import.meta.env.MODE !== 'production') console.log(msg, args);
  },
};
