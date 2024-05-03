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
    name: "@containerApp/ropabajo-header",
    app: () => System.import("@containerApp/ropabajo-header"),
    activeWhen: ["/container"],
});

registerApplication({
    name: "@containerApp/bulk-load",
    app: () => System.import("@containerApp/bulk-load"),
    activeWhen: ["/container/bulk-load"],
});

start();