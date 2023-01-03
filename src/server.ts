import App from './app';
import RouteController from './router/route.controller';

const app = new App(new RouteController());

app.listen(3000);
