import { Login } from "../pages/auth/Login.js";
import { Dashboard } from "../pages/dashboard/Dashboard.js";
import { Families } from "../pages/families/Families.js";
import { Children } from "../pages/children/Children.js";
import { FamilyProfile } from "../pages/families/FamilyProfile.js";
import { ChildProfile } from "../pages/children/ChildProfile.js";
import { Users } from "../pages/administration/Users.js";
import { AcademicFollowUp } from "../pages/followup/AcademicFollowUp.js";
import { Reports } from "../pages/reports/Reports.js";

export const routes = {

    login: Login,
    dashboard: Dashboard,
    familias: Families,
    nna: Children,
    perfilFamilia: FamilyProfile,
    perfilNna: ChildProfile,
    usuarios: Users,
    seguimiento: AcademicFollowUp,
    reportes: Reports

};
