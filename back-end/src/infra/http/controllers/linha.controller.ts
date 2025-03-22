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
import { GatewayTimeout } from '../dtos/errors/gatewayTimeout.dto';
import { ServiceUnavailable } from '../dtos/errors/serviceUnavailable.dto';
import { Unauthorized } from '../dtos/errors/unauthorized.dto';
import { BadRequest } from '../dtos/errors/badRequest.dto';
import { MethodNotAllowed } from '../dtos/errors/methodNotAllowed.dto';
import { Conflict } from '../dtos/errors/conflict.dto';
import { InternalServerError } from '../dtos/errors/internalServerError.dto';
import { Forbidden } from '../dtos/errors/forbidden.dto';
import { NotFound } from '../dtos/errors/notFound.dto';
import { LinhaRequestDto } from '../dtos/Requests/LinhaRequestDto';
import { LinhaResponsetDto } from '../dtos/Responses/LinhaResponseDto';
import { createLinhaResponseExample } from '../dtos/examples/CreateLinhaResponseExample';
import { CreateLinhaUseCase } from '@application/useCases/LinhaOrientacao/CreateLinha.usecase';
import { GetLinhaUseCase } from '@application/useCases/LinhaOrientacao/GetLinha.usecase';
import { GetTodasLinhasUseCase } from '@application/useCases/LinhaOrientacao/GetTodasLinhas.usecase';
import { UpdateLinhaUseCase } from '@application/useCases/LinhaOrientacao/UpdateLinha.usecase';
import { DeleteLinhaUseCase } from '@application/useCases/LinhaOrientacao/deleteLinha.usecase';
//   import { DeleteLinhaUseCase } from '@application/useCases/Linhas/DeleteLinha.usecase';
//   import { UpdateLinhaUseCase } from '@application/useCases/Linhas/UpdateLinha.usecase';
//   import { GetTodasLinhasUseCase } from '@application/useCases/Linhas/GetTodosLinhas';

@Controller('gerenciadorDeTG/v1')
export class LinhaController extends BaseController {
  constructor(
    private readonly createLinhaUsecase: CreateLinhaUseCase,
    private readonly getLinhaUseCase: GetLinhaUseCase,
    private readonly getTodasLinhasUseCase: GetTodasLinhasUseCase,
    private readonly updateLinhaUseCase: UpdateLinhaUseCase,
    private readonly deleteLinhaUseCase: DeleteLinhaUseCase,
  ) {
    super();
  }

  @Post('linha')
  @ApiBody({ type: LinhaRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    content: {
      'application/json': {
        examples: {
          CreateLinhaResponse: {
            summary: 'Create Linha Response',
            value: createLinhaResponseExample,
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
    @Body() linha: LinhaRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.createLinhaUsecase.execute(linha);

    this.ok(res, response);
  }

  @Get('linha/orientador/:cpf')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'cpf', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
  async findByOrientadorCpf(
    @Param('cpf') cpf: string,
    @Res() res: Response,
  ) {
    console.log('Ra recebido:', cpf);
    const response = await this.getLinhaUseCase.byOrientadorCpf(cpf);
    this.ok(res, response);
  }

  @Get('linha/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
  async findById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    console.log('Id recebido:', id);
    const response = await this.getLinhaUseCase.byId(Number(id));
    this.ok(res, response);
  }

  @Get('linha/')
  @ApiExcludeEndpoint()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
  async findAll(
    @Res() res: Response,
  ) {
    const response = await this.getTodasLinhasUseCase.execute();
    this.ok(res, response);
  }

  @Patch('linha/update/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
  async update(
    @Param('id') id: number,
    @Body() linha: LinhaRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.updateLinhaUseCase.fullUpdate(id, linha);

    this.ok(res, response);
  }

  @Patch('linha/add/orientador/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
  async addOrientadorCpf(
    @Param('id') id: number,
    @Body() cpf: string,
    @Res() res: Response,
  ) {
    const response = await this.updateLinhaUseCase.addOrientadorCpf(id, cpf);

    this.ok(res, response);
  }


  @Delete('linha/delete/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LinhaResponsetDto,
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
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const response = await this.deleteLinhaUseCase.execute(id);

    this.ok(res, response);
  }
}