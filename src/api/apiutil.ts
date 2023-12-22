import { Modal, message } from 'antd';

export function clearToken() {
  Modal.destroyAll();
  window.localStorage.removeItem("x-acc-op");
  window.localStorage.removeItem("lan-id");
  window.localStorage.removeItem("firstName");
  window.localStorage.removeItem("lastName");
  window.localStorage.removeItem("userInfo");
  window.localStorage.removeItem("countryCode");
  window.localStorage.removeItem("x-ref-op");
}

export function goToLogin() {
  clearToken();
  window.location.replace('/');
}

export function handleError(res: any) {
  if (res && res.status === 400) {
    message.error('Bad request, please check your input');
  } else if (res && res.status === 401) {
    message.error("Login session expired, You will be redirected to the login page");
    window.setTimeout(goToLogin, 1000 * 2);
  } else if (res && res.status === 403) {
    message.error("No Permission");
  } else if (res && res.status === 404) {
    message.error("Resource Not Found");
  } else if (res && res.status === 500) {
    message.error("Technical exception, Please contact service owner");
  } else if (res && res.status === 503) {
    message.error("Service Unavailable");
  } else if (res && res.status === 504) {
    message.error("Gateway Timeout");
  } else {
    message.error("Unexpected Error");
  }
}
