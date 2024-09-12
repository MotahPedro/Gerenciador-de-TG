import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from '../../../helpers/infra/controller/BaseController';
import { CreateOrientadorUseCase } from '@application/useCases/Orientador/CreateOrientador.usecase';
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { GatewayTimeout } from '../dtos/errors/gatewayTimeout.dto';
import { ServiceUnavailable } from '../dtos/errors/serviceUnavailable.dto';
import { Unauthorized } from '../dtos/errors/unauthorized.dto';
import { BadRequest } from '../dtos/errors/badRequest.dto';
import { MethodNotAllowed } from '../dtos/errors/methodNotAllowed.dto';
import { Conflict } from '../dtos/errors/conflict.dto';
import { InternalServerError } from '../dtos/errors/internalServerError.dto';
import { Forbidden } from '../dtos/errors/forbidden.dto';
import { NotFound } from '../dtos/errors/notFound.dto';
import { OrientadorRequestDto } from '../dtos/OrientadorRequestDto';
import { createOrientadorResponseExample } from '../dtos/examples/CreateOrientadorResponseExample';
import { OrientadorResponseDto } from '../dtos/OrientadorResponseDto';
import { DeleteOrientadorUseCase } from '@application/useCases/Orientador/DeleteOrientador.usecase';
// mais 4 dtos a fazer
// JwtAuth

@Controller('gerenciadorDeTG/v1')
export class ProfessorOrientadorController extends BaseController {
    constructor(
    private readonly createOrientadorUseCase: CreateOrientadorUseCase,
    private readonly getOrientadorUseCase: GetOrientadorUseCase,
    private readonly deleteOrientadorUseCase: DeleteOrientadorUseCase,

  ) {
    super();
  }

  @Post('orientador')
  @ApiBody({ type: OrientadorRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    content: {
      'application/json': {
        examples: {
          CreateOrientadorResponse: {
            summary: 'Create Orientador Response',
            value: createOrientadorResponseExample,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequest,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Forbidden,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @ApiResponse({
    status: 405,
    description: 'Method Not allowed',
    type: MethodNotAllowed,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: Conflict,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable',
    type: ServiceUnavailable,
  })
  @ApiResponse({
    status: 504,
    description: 'Gateway Timeout',
    type: GatewayTimeout,
  })
  async create(
    @Body() orientador: OrientadorRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.createOrientadorUseCase.execute(orientador);

    this.ok(res, response);
  }

  @Get('orientador/:cpf')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'cpf', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: OrientadorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequest,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Forbidden,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @ApiResponse({
    status: 405,
    description: 'Method Not allowed',
    type: MethodNotAllowed,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: Conflict,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable',
    type: ServiceUnavailable,
  })
  @ApiResponse({
    status: 504,
    description: 'Gateway Timeout',
    type: GatewayTimeout,
  })
  async findByCpf(
    @Param('cpf') cpf: string,
    @Res() res: Response,
  ) {
    console.log('CPF recebido:', cpf);
    const response = await this.getOrientadorUseCase.execute(cpf);
    this.ok(res, response);
  }

  @Delete('orientador/delete/:cpf')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'cpf', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: OrientadorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequest,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Forbidden,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @ApiResponse({
    status: 405,
    description: 'Method Not allowed',
    type: MethodNotAllowed,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
    type: Conflict,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: InternalServerError,
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable',
    type: ServiceUnavailable,
  })
  @ApiResponse({
    status: 504,
    description: 'Gateway Timeout',
    type: GatewayTimeout,
  })
  async delete(
    @Param('cpf') cpf: string,
    @Res() res: Response,
  ) {
    const response = await this.deleteOrientadorUseCase.execute(cpf);

    this.ok(res, response);
  }

}
