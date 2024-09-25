import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, mapFromDtoToEntity } from './dto/create-customer.dto';
import { UpdateCustomerDto, mapFromDtoUpdateToEntity } from './dto/update-customer.dto';
import { UserEmail } from 'src/user/user-email.decorator';
import { GetCustomerDto, mapFromEntityToDto } from './dto/get-customer.dto';
import { DeleteResult } from 'typeorm';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto, @UserEmail() email: string): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.create(mapFromDtoToEntity(dto), email));
  }

  @Get()
  async findAll(@UserEmail() email: string): Promise<GetCustomerDto[]> {
    return this.customerService.findAll(email).then((customers) => customers.map(mapFromEntityToDto));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.update(+id, mapFromDtoUpdateToEntity(dto)));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.customerService.remove(+id);
  }
}
