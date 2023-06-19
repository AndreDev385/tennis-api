import { UseCaseError } from "../../../../shared/core/UseCaseError"
import { Result } from "../../../../shared/core/Result"

export namespace CreateUserErrors {

  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor (email: string) {
      super(false, {
        message: `El correo ${email} ya se encuentra en uso`
      } as UseCaseError)
    }
  }

}

