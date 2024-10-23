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
  
  import { CreateAlunoUseCase } from '@application/useCases/Aluno/CreateAluno.usecase';
  import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';
  import { DeleteAlunoUseCase } from '@application/useCases/Aluno/DeleteAluno.usecase';
  import { AlunosRequestDto } from '../dtos/AlunosRequestDto';
  import { AlunosResponseDto } from '../dtos/AlunosResponseDto';
  import { createAlunoResponseExample } from '../dtos/examples/CreateAlunoREsponseExample';
  // mais 4 dtos a fazer
  // JwtAuth
  
  @Controller('gerenciadorDeTG/v1')
  export class AlunoOrientadoController extends BaseController {
      constructor(
      private readonly createAlunoUseCase: CreateAlunoUseCase,
      private readonly getAlunoUseCase: GetAlunoUseCase,
      private readonly deleteAlunoUseCase: DeleteAlunoUseCase,
  
    ) {
      super();
    }
  
    @Post('aluno')
    @ApiBody({ type: AlunosRequestDto })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Success', 
      content: {
        'application/json': {
          examples: {
            CreateAlunoResponse: {
              summary: 'Create Aluno Response',
              value: createAlunoResponseExample,
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
      @Body() aluno: AlunosRequestDto,
      @Res() res: Response,
    ) {
      const response = await this.createAlunoUseCase.execute(aluno);
  
      this.ok(res, response);
    }

    @Get('trabalho/:ra')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'ra', type: String })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: AlunosResponseDto,
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
      @Param('ra') ra: string,
      @Res() res: Response,
    ) {
      console.log('Id recebido:', ra);
      const response = await this.getAlunoUseCase.execute(ra);
      this.ok(res, response);
    }
  
    @Delete('trabalho/delete/:ra')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'ra', type: String })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: AlunosResponseDto,
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
      @Param('ra') ra: string,
      @Res() res: Response,
    ) {
      const response = await this.deleteAlunoUseCase.execute(ra);
  
      this.ok(res, response);
    }
}