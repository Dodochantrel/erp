import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { mapFromDtoToEntity, UpdateUserDto } from './dto/update-user.dto';
import { UserEmail } from './user-email.decorator';
import { GetUserInformationDto, mapFromEntity } from './dto/get-user-information.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('my-self')
  async updateMySelf(@Body() dto: UpdateUserDto, @UserEmail() email: string) {
    return await this.userService.updateMySelf(mapFromDtoToEntity(dto), email);
  }

  @Get('my-self')
  async getMySelf(@UserEmail() email: string): Promise<GetUserInformationDto> {
    return mapFromEntity(await this.userService.getMySelf(email));
  }
}
