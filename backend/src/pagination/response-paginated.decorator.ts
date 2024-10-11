import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponse } from './paginated-response';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponse, model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                title: 'List of items',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
