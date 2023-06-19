import { UseCaseError } from "../../../../shared/core/UseCaseError"
import { Result } from "../../../../shared/core/Result"

export namespace LoginUseCaseErrors {

  export class EmailDoesNotExist extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Correo o contraseña incorrectos.`
      } as UseCaseError)
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Correo o contraseña incorrectos.`
      } as UseCaseError)
    }
  }

}

