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
import { CursoRequestDto } from '../dtos/Requests/CursoRequestDto';
import { CursoResponsetDto } from '../dtos/Responses/CursoResponseDto';
import { createCursoResponseExample } from '../dtos/examples/CreateCursoRespondeDto';
import { CreateCursoUseCase } from '@application/useCases/CursoAtuacao/CreateCurso.usecase';
import { GetCursoUseCase } from '@application/useCases/CursoAtuacao/GetCurso.usecase';
import { DeleteCursoUseCase } from '@application/useCases/CursoAtuacao/DeleteCurso.usecase';
import { UpdateCursoUseCase } from '@application/useCases/CursoAtuacao/UpdateCurso.usecase';
import { GetTodosCursosUseCase } from '@application/useCases/CursoAtuacao/GetTodosCursos';
// mais 4 dtos a fazer
// JwtAuth

@Controller('gerenciadorDeTG/v1')
export class CursoController extends BaseController {
    constructor(
        private readonly createCurso: CreateCursoUseCase,
        private readonly getCurso: GetCursoUseCase,
        private readonly deleteCurso: DeleteCursoUseCase,
        private readonly updateCurso: UpdateCursoUseCase,
        private readonly getTodosCursos: GetTodosCursosUseCase,

    ) {
        super();
    }

    @Post('curso')
    @ApiBody({ type: CursoRequestDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        content: {
            'application/json': {
                examples: {
                    CreateTrabalhoResponse: {
                        summary: 'Create Trabalho Response',
                        value: createCursoResponseExample,
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
        @Body() curso: CursoRequestDto,
        @Res() res: Response,
    ) {
        const response = await this.createCurso.execute(curso);

        this.ok(res, response);
    }

    @Get('curso/:id')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        const response = await this.getCurso.byId(Number(id));
        this.ok(res, response);
    }

    @Get('curso/aluno/:cpf')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'cpf', type: String })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        @Param('cpf') cpf: string,
        @Res() res: Response,
    ) {
        console.log('Ra recebido:', cpf);
        const response = await this.getCurso.byOrientadorCpf(cpf);
        this.ok(res, response);
    }

    @Delete('curso/delete/:id')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        const response = await this.deleteCurso.execute(id);

        this.ok(res, response);
    }

    @Patch('curso/update/:id')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        @Body() curso: CursoRequestDto,
        @Res() res: Response,
    ) {
        const response = await this.updateCurso.fullUpdate(id, curso);

        this.ok(res, response);
    }

    @Patch('curso/add/orientador/:id')
    @ApiExcludeEndpoint()
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        const response = await this.updateCurso.addOrientadorCpf(id, cpf);

        this.ok(res, response);
    }

    @Get('curso/')
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: CursoResponsetDto,
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
        const response = await this.getTodosCursos.execute();
        this.ok(res, response);
    }


}
