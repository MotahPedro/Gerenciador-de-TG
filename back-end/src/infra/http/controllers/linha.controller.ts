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
//   import { GetLinhaUseCase } from '@application/useCases/Linhas/GetLinha.usecase';
//   import { DeleteLinhaUseCase } from '@application/useCases/Linhas/DeleteLinha.usecase';
//   import { UpdateLinhaUseCase } from '@application/useCases/Linhas/UpdateLinha.usecase';
//   import { GetTodasLinhasUseCase } from '@application/useCases/Linhas/GetTodosLinhas';

@Controller('gerenciadorDeTG/v1')
export class LinhaController extends BaseController {
    constructor(
        private readonly createLinhaUsecase: CreateLinhaUseCase,
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

}