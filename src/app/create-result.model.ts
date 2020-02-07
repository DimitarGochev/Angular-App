import { UpdateResult } from './update-result.model';

export type CreateResult = Pick<UpdateResult, "name" | "job"> & {id: string, createdAt: Date};
