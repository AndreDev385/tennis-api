
export type GuardResponse = string;

import { Result } from "./Result";

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {

  public static combine (guardResults: Result<any>[]): Result<GuardResponse> {
    for (let result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static greaterThan (minValue: number, actualValue: number): Result<GuardResponse> {
    return actualValue > minValue
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`El numero {${actualValue}} es menor que {${minValue}}`);
  }

  public static againstAtLeast (numChars: number, text: string): Result<GuardResponse> {
    return text.length >= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`Al menos ${numChars} caracteres.`);
  }

  public static againstAtMost (numChars: number, text: string): Result<GuardResponse> {
    return text.length <= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(`Maximo ${numChars} caracteres.`);
  }

  public static againstNullOrUndefined (argument: any, argumentName: string): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(`${argumentName} es requerido`)
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static isOneOf (value: any, validValues: any[], argumentName: string) : Result<GuardResponse> {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Result.ok<GuardResponse>()
    } else {
      return Result.fail<GuardResponse>(`${argumentName} no esta dentro de los tipos permitidos en ${JSON.stringify(validValues)}. "${value}".`);
    }
  }

  public static inRange (num: number, min: number, max: number, argumentName: string) : Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Result.fail<GuardResponse>(`${argumentName} no esta en el entre ${min} y ${max}.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }

  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : Result<GuardResponse> {
    let failingResult: Result<GuardResponse> | null = null;

    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.isFailure) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return Result.fail<GuardResponse>(`${argumentName} no esta dentro del rango.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }
}
