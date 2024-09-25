import { ApiProperty } from '@nestjs/swagger';

export class ValidEmailQueryDto {
  @ApiProperty({
    required: true,
    description: "Le token de l'utilisateur",
    type: String,
  })
  token: string;
}
