import { Request, Response, Router } from 'express';
import { pool } from './../dbServerInfo';

class RouteController {
  public path: string = '/records';
  public router: any = Router();
  public db: any = pool.getConnection();
  public date: string;
  public time: string;
  public type: string;
  public description: string;
  public amount: string;
  public SQLtext: string;
  public params: string[];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getRecord`, this.getRecords);
    this.router.post(`${this.path}/insert`, this.insertRecord);
  }
  private getRecords = (request: Request, response: Response) => {
    console.log('API CALL: getRecords');
    this.SQLtext = 'SELECT * FROM SaveRecord';
    this.db.then((conn) => {
      conn
        .query(this.SQLtext)
        .then((res) => {
          response.json(res);
        })
        .catch((err) => {
          console.log(err);
          response.json(err);
        });
    });
  };

  private insertRecord = (request: Request, response: Response) => {
    console.log('API CALL: insertRecord');
    this.date = request.body.date as string;
    this.time = request.body.time as string;
    this.type = request.body.type as string;
    this.description = request.body.description as string;
    this.amount = request.body.amount as string;
    //GET query

    this.params = [
      this.date,
      this.time,
      this.type,
      this.description,
      this.amount,
    ];
    //console.log('params',this.params);
    this.SQLtext = `
        INSERT INTO SaveRecord (date, time, type, description, amount)
        VALUE (?,?,?,?,?)`;

    this.db.then((conn) => {
      conn
        .query(this.SQLtext, this.params)
        .then((res) => {
          response.json('Insert Success!');
        })
        .catch((err) => {
          console.log(err);
          response.json(err);
        });
    });
  };
}

export default RouteController;
