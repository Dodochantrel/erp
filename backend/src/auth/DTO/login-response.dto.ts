import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    required: true,
    description: "Le prénon de l'utilisateur",
    type: String,
  })
  firstName: string;

  @ApiProperty({
    required: true,
    description: "Le nom de l'utilisateur",
    type: String,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    description: "L'email de l'utilisateur",
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    description: "Le role de l'utilisateur",
    type: String,
  })
  role: string;
}
