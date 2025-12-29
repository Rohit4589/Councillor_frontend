import { Route } from "react-router-dom";
import Councillor from "../screens/Councillor";

export const superAdminRoutesConfig = {
  councillor: {
    path: "/super/councillor",
    title: "Councillors",
    subtitle: "Manage ward councillors",
    action: {
      label: "Add Councillor",
    },
  },
};

