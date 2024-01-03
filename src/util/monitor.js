
import { Modal } from "antd";
import { clearToken, goToLogin } from "@/api/apiutils";

const { inactiveTime, loginPageSuffix } = {inactiveTime :15, loginPageSuffix :'/'};

export const monitor = () => {
  const autoLogout = Number.parseInt(inactiveTime) * 60;
  const largest = 10;
  let counter = largest + 1;
  let modal  = null;
  let modalVisible = false;
  let content = "You'll be logging out in " + largest + " seconds";
  let wintimeout;

  const requestLogout = async () =>{
    //logoutapi goes here
    goToLogin();
  };

  const count = () => {
    let temp = counter - 1;
    counter = temp;
    content = "You'll be logging out in " + temp + " seconds";
    if (modal) {
      modal.update({ content: content });

    if (counter > 0) {
      window.setTimeout(count, 1000);
    } else {
      modalVisible = false;
      modal.destroy();
      requestLogout();
    }
  }
  };

const reset = () => {
  modal = null;
  modalVisible = false;
  counter = largest + 1;
};

const showLogout = () => {
  if (modalVisible) {
    return;
  }

  modalVisible = true;
  modal = Modal.confirm({
    title: "Logout",
    content: content,
    okText: 'Okay',
    cancelText: "Cancel",
    onOk: () => {
      reset();
      requestLogout();
    },
    onCancel: () => reset(),
  });

  counter = largest;
  window.setTimeout(count, 1000);
};

const toLogin = () => {
  const url = window.location.href;
  if (url.endsWith(loginPageSuffix)) {
    showLogout();
  }
};

const setWinTimeout = () => {
  clearWinTimeout();
  wintimeout = window.setTimeout(toLogin, 1000 * autoLogout);
};

const clearWinTimeout = () => {
  window.clearTimeout(wintimeout);
  wintimeout = null;
};

const rootContainer = document.getElementById("app");
rootContainer.onclick = clearWinTimeout;
rootContainer.onscroll = clearWinTimeout;
rootContainer.onkeydown = clearWinTimeout;
rootContainer.onmousemove = clearWinTimeout;

setWinTimeout();
return rootContainer;
}