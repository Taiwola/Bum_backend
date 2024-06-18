import { SubAccount } from "../database/entities/user.model";

export interface PipelineInterface {
    name: string,
    subAccount: SubAccount,
    subAccountId: string
}

export interface PipelinePartialInterface extends Partial<PipelineInterface> {}