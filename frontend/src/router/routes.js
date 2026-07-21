/**
 * routes.js — mapa de rutas → componentes HTML (pages/).
 *
 * El router NO importa controladores aquí; solo el HTML de cada pantalla.
 * La lógica la ejecuta router.js llamando iniciarXxx() después de pintar el HTML.
 */
import { Landing } from "../pages/Landing.js";
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

    inicio: Landing,
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
