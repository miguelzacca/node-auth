import { NextFunction, Response, Request } from "express";
/**
 * @example
 * app.get("/example", checkToken, (req, res) => {
 *   ...
 * })
 */
export declare const checkToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
