import express from "express";
import cors from "cors";
//import bodyParser from 'body-parser';

interface AppStructure {
  app: express.Application;
  listen(port: number): void;
}

class App implements AppStructure {
  public app = express();

  constructor(controllers) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.initalizeControllers(controllers);
  }

  private initalizeControllers(controllers) {
    this.app.use("/", controllers.router);
  }

  public listen(port) {
    this.app.listen(port, () => {
      console.log(`App listening on the port 3000`);
    });
  }
}

export default App;
