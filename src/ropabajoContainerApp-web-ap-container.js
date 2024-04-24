import { registerApplication, start } from "single-spa";
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

import "@angular/localize/init";

const routes = constructRoutes(microfrontendLayout);

const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return System.import(name);
    },
});
const layoutEngine = constructLayoutEngine({
    routes,
    applications,
});

applications.forEach(registerApplication);
layoutEngine.activate();

registerApplication({
    name: "@ropabajoContainerApp/ropabajo-header",
    app: () => System.import("@ropabajoContainerApp/ropabajo-header"),
    activeWhen: ["/ropabajocontainer"],
});

// registerApplication({
//     name: "@ropabajoContainerApp/nsrtm-menu",
//     app: () => System.import("@ropabajoContainerApp/nsrtm-menu"),
//     activeWhen: ["/", "/ropabajocontainer"],
// });

//MFE EMSION COBRANZAS
registerApplication({
    name: "@ropabajoContainerApp/ropabajobulkload",
    app: () => System.import("@ropabajoContainerApp/ropabajobulkload"),
    activeWhen: ["/ropabajocontainer/ropabajobulkload"],
});

start();