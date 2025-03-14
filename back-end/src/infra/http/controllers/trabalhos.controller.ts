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
import { TrabalhoRequestDto } from '../dtos/Requests/TrabalhoRequestDto';
import { TrabalhoResponseDto } from '../dtos/Responses/TrabalhoResponseDto';
import { createTrabalhoResponseExample } from '../dtos/examples/CreateTrabalhoResponseExample';
import { CreateTrabalhoUseCase } from '@application/useCases/Trabalhos/CreateTrabalho.usecase';
import { GetTrabalhoUseCase } from '@application/useCases/Trabalhos/GetTrabalho.usecase';
import { DeleteTrabalhoUseCase } from '@application/useCases/Trabalhos/DeleteTrabalho.usecase';
import { UpdateTrabalhoUseCase } from '@application/useCases/Trabalhos/UpdateTrabalho.usecase';
import { GetTodosTrabalhosUseCase } from '@application/useCases/Trabalhos/GetTodosTrabalhos';
// mais 4 dtos a fazer
// JwtAuth

@Controller('gerenciadorDeTG/v1')
export class TrabalhoController extends BaseController {
  constructor(
    private readonly createTrabalhoUseCase: CreateTrabalhoUseCase,
    private readonly getTrabalhoUseCase: GetTrabalhoUseCase,
    private readonly getTodosTrabalhosUsecase: GetTodosTrabalhosUseCase,
    private readonly deleteTrabalhoUseCase: DeleteTrabalhoUseCase,
    private readonly updateTrabalhoUseCase: UpdateTrabalhoUseCase,
  ) {
    super();
  }

  @Post('trabalho')
  @ApiBody({ type: TrabalhoRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    content: {
      'application/json': {
        examples: {
          CreateTrabalhoResponse: {
            summary: 'Create Trabalho Response',
            value: createTrabalhoResponseExample,
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
    @Body() trabalho: TrabalhoRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.createTrabalhoUseCase.execute(trabalho);

    this.ok(res, response);
  }

  @Get('trabalho/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TrabalhoResponseDto,
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
    const response = await this.getTrabalhoUseCase.byId(Number(id));
    this.ok(res, response);
  }

  @Get('trabalho/aluno/:ra')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'ra', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TrabalhoResponseDto,
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
  async findByAlunoRa(
    @Param('ra') ra: string,
    @Res() res: Response,
  ) {
    console.log('Ra recebido:', ra);
    const response = await this.getTrabalhoUseCase.byAlunoOrientado(ra);
    this.ok(res, response);
  }

  @Delete('trabalho/delete/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TrabalhoResponseDto,
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
    const response = await this.deleteTrabalhoUseCase.execute(id);

    this.ok(res, response);
  }

  @Patch('trabalho/update/:id')
  @ApiExcludeEndpoint()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TrabalhoResponseDto,
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
    @Body() trabalho: TrabalhoRequestDto,
    @Res() res: Response,
  ) {
    const response = await this.updateTrabalhoUseCase.execute(id, trabalho);

    this.ok(res, response);
  }

  @Get('trabalho/')
  @ApiExcludeEndpoint()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TrabalhoResponseDto,
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
    const response = await this.getTodosTrabalhosUsecase.execute();
    this.ok(res, response);
  }


}
