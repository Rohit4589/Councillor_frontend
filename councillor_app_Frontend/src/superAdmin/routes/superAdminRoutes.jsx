import { Route } from "react-router-dom";
import Councillor from "../screens/Councillor";

const superAdminRoutes = (
  <>
    <Route path="councillor" element={<Councillor />} />
  </>
);

export default superAdminRoutes;
