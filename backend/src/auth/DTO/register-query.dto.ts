import { ApiProperty } from '@nestjs/swagger';

export class RegisterQueryDto {
  @ApiProperty({
    required: true,
    description: "Le nom de famille de l'utilisateur",
    type: String,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    description: "Le prénom de l'utilisateur",
    type: String,
  })
  firstName: string;

  @ApiProperty({
    required: true,
    description: "L'email de l'utilisateur",
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    description: "Le mot de passe de l'utilisateur",
    type: String,
  })
  password: string;
}
