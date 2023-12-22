import HomeIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/List";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WarningIcon from "@mui/icons-material/Warning";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const getModules = (access: any) => {
  let modules = [];
  if (access) {
    modules = getAccessModules(access);
    return modules;
  }
};

const getAccessModules = (accessList: any) => {
  const homeItem: any = { title: "Home", key: '/home', icon: HomeIcon, position: "top" };
  const licenseTrackingItem: any = { title: "License Tracking", key: '/license', icon: ListIcon, position: 'top' };
  const securityComplianceItem: any = { title: "Security Compliance", key: '/compliance', icon: AccountBalanceIcon, position: "top" };
  const costUtilisationItem: any = { title: "Cost Utilisation", key: '/costutil', icon: WarningIcon, position: 'top' };
  const settingsItem: any = { title: "Settings", key: '/settings', icon: SettingsIcon, position: "top" };
  const helpItem: any = { title: "Help", key: '/help', icon: HelpIcon, position: 'bottom' };
  const profileItem: any = { title: "Profile", key: "/profile", icon: AccountCircleIcon, position: 'bottom' };
  const logoutItem: any = { title: "Logout", key: '/', icon: LogoutIcon, position: 'bottom' };

  const isAdmin = accessList.some((it: string) => ['ADMIN'].includes(it));

  const modules = [];
  modules.push(homeItem);
  modules.push(licenseTrackingItem);
  modules.push(securityComplianceItem);
  modules.push(costUtilisationItem);
  isAdmin && modules.push(settingsItem);
  modules.push(helpItem);
  modules.push(profileItem);
  modules.push(logoutItem);
  return modules;
};
