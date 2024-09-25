import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordQueryDto {
  @ApiProperty({
    required: true,
    description: "Le token de l'utilisateur",
    type: String,
  })
  token: string;

  @ApiProperty({
    required: true,
    description: "Le mot de passe de l'utilisateur",
    type: String,
  })
  password: string;
}
