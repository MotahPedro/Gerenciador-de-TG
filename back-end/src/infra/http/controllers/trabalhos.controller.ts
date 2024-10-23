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
  import { TrabalhoRequestDto } from '../dtos/TrabalhoRequestDto';
  import { TrabalhoResponseDto } from '../dtos/TrabalhoResponseDto';
  import { createTrabalhoResponseExample } from '../dtos/examples/CreateTrabalhoResponseExample';
  import { CreateTrabalhoUseCase } from '@application/useCases/Trabalhos/CreateTrabalho.usecase';
  import { GetTrabalhoUseCase } from '@application/useCases/Trabalhos/GetTrabalho.usecase';
  import { DeleteTrabalhoUseCase } from '@application/useCases/Trabalhos/DeleteTrabalho.usecase';
  // mais 4 dtos a fazer
  // JwtAuth
  
  @Controller('gerenciadorDeTG/v1')
  export class ProfessorOrientadorController extends BaseController {
      constructor(
      private readonly createOrientadorUseCase: CreateTrabalhoUseCase,
      private readonly getOrientadorUseCase: GetTrabalhoUseCase,
      private readonly deleteOrientadorUseCase: DeleteTrabalhoUseCase,
  
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
            CreateOrientadorResponse: {
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
      @Body() orientador: TrabalhoRequestDto,
      @Res() res: Response,
    ) {
      const response = await this.createOrientadorUseCase.execute(orientador);
  
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
    async findByCpf(
      @Param('id') id: number,
      @Res() res: Response,
    ) {
      console.log('Id recebido:', id);
      const response = await this.getOrientadorUseCase.execute(id);
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
      const response = await this.deleteOrientadorUseCase.execute(id);
  
      this.ok(res, response);
    }
  
  }
  