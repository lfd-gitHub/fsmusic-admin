import { Notify } from 'quasar';
import log from './log';

export default {
  logd: (msg, ...args) => log.d(msg, args),
  showErr(message) {
    Notify.create({
      type: 'negative',
      message,
      position: 'center',
    });
  },
  showWarn(message) {
    Notify.create({
      type: 'warning',
      message,
      position: 'center',
    });
  },
  showOk(message) {
    Notify.create({
      type: 'positive',
      message,
      position: 'center',
    });
  },
  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
};
