import { ApiProperty } from '@nestjs/swagger';

export class LoginQueryDto {
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
