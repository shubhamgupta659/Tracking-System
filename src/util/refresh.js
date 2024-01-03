import { getNowTime, getUVid } from "@/utils/commonUtils";

const setTimer = () => window.setTimeout(autoRefresh, 1000 * 60 * 10);

export const refreshToken = () => {
  //refresh token api goes here
};

let timerOn = true;

export const triggerAutoRefresh = () => {
  timerOn = true;
  if (timerOn) {
    clearTimeout(setTimer);
  }
  setTimer();
};

const reset = () => {
  timerOn = false;
  clearTimeout(reset);
};

export const stopAutoRefresh = () => {
    timerOn = false;
    clearTimeout(setTimer);
  };