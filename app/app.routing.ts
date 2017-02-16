// import { LoginComponent } from "./pages/login/login.component";
import { OpentokComponent } from "./pages/opentok/opentok.component";
// import { ListComponent } from "./pages/list/list.component";

export const routes = [
  { path: "", component: OpentokComponent },
  // { path: "list", component: ListComponent }
];

export const navigatableComponents = [
  OpentokComponent,
  // ListComponent
];
