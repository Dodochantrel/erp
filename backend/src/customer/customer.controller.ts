import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, mapFromDtoToEntity } from './dto/create-customer.dto';
import { UpdateCustomerDto, mapFromDtoUpdateToEntity } from './dto/update-customer.dto';
import { UserEmail } from 'src/user/user-email.decorator';
import { GetCustomerDto, mapFromEntitiesPaginatedToDto, mapFromEntityToDto } from './dto/get-customer.dto';
import { DeleteResult } from 'typeorm';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import { PageQuery } from 'src/pagination/page-query';
import { GetCustomersNamesDto, mapFromEntitiesToDto } from './dto/get-names.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto, @UserEmail() email: string): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.create(mapFromDtoToEntity(dto), email));
  }

  @Get('search/:search')
  async findAll(
    @UserEmail() email: string,
    @Query() pageQuery: PageQuery,
    @Param('search') search: string,
  ): Promise<PaginatedResponse<GetCustomerDto>> {
    return this.customerService
      .findAll(email, +pageQuery.page, +pageQuery.limit, search)
      .then((response) => mapFromEntitiesPaginatedToDto(response, pageQuery));
  }

  @Get('one/:id')
  async findOne(@Param('id') id: string, @UserEmail() email: string): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.findOne(+id, email));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @UserEmail() email: string,
  ): Promise<GetCustomerDto> {
    return mapFromEntityToDto(await this.customerService.update(+id, mapFromDtoUpdateToEntity(dto), email));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UserEmail() email: string): Promise<DeleteResult> {
    return this.customerService.remove(+id, email);
  }

  @Get('names')
  async findNames(@UserEmail() email: string): Promise<GetCustomersNamesDto[]> {
    return mapFromEntitiesToDto(await this.customerService.findNames(email));
  }
}
