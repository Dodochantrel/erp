import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordQueryDto {
  @ApiProperty({
    required: true,
    description: "L'email de l'utilisateur",
    type: String,
  })
  email: string;
}
