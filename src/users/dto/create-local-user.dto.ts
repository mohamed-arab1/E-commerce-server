import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  validate(passwordConfirm: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = (args.object as any)[relatedPropertyName];
    return password === passwordConfirm;
  }

  defaultMessage() {
    return 'password and passwordConfirm do not match';
  }
}

function IsPasswordMatching(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsPasswordMatchingConstraint,
    });
  };
}

export class CreateLocalUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  avatar?: string;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Expose()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @IsPasswordMatching('password')
  passwordConfirm: string;
}
