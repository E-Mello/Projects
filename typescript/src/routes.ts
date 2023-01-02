import { Request, Response } from 'express';

import CreateCourseService from './CreateCourseService';

export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({
    name: 'NodeJS',
    duration: 10,
    educator: 'Mello',
  });

  CreateCourseService.execute({
    name: 'Typescript',
    educator: 'Édio',
  });

  return res.send();
}
