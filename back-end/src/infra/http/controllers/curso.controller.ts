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
    Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
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
import { JwtUtils } from '@helpers/utils/jwtUtils';
import { JwtAuthGuard } from '../auth/JwtAuth.guard';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
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
    @UseGuards(JwtAuthGuard)
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
        @Req() req: Request,
    ) {

        JwtUtils.requireRole('Administrador')(req, res, async () => {
            const response = await this.createCurso.execute(curso);

            this.ok(res, response);
        });
    }

    @Get('curso/:id')
    @UseGuards(JwtAuthGuard)
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
        @Req() req: Request,
    ) {
        console.log('Id recebido:', id);

        const constant = getConstants()

        const roles: string[] = ['Administrador', 'Aluno', 'Orientador'];
        if (!roles.includes(req.user?.role)) {
            throw new AppError(constant.AUTH.NÃO_AUTORIZADO, HttpStatus.FORBIDDEN.toString());
        }
        const response = await this.getCurso.byId(Number(id));
        this.ok(res, response);
    }

    @Get('curso/orientador/:cpf')
    @UseGuards(JwtAuthGuard)
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
    async findByOrientadorCpf(
        @Param('cpf') cpf: string,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        console.log('Ra recebido:', cpf);
        const constant = getConstants()

        const roles: string[] = ['Administrador', 'Aluno', 'Orientador'];
        if (!roles.includes(req.user?.role)) {
            throw new AppError(constant.AUTH.NÃO_AUTORIZADO, HttpStatus.FORBIDDEN.toString());
        }
        const response = await this.getCurso.byOrientadorCpf(cpf);
        this.ok(res, response);
    }

    @Delete('curso/delete/:id')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
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
        @Req() req: Request,
    ) {

        JwtUtils.requireRole('Administrador')(req, res, async () => {
            const response = await this.updateCurso.fullUpdate(id, curso);

            this.ok(res, response);
        });
    }

    @Patch('curso/add/orientador/:id')
    @UseGuards(JwtAuthGuard)
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
        @Req() req: Request,
    ) {
        const constant = getConstants()

        const roles: string[] = ['Administrador', 'Orientador'];
        if (!roles.includes(req.user?.role as string)) {
            throw new AppError(constant.AUTH.NÃO_AUTORIZADO, HttpStatus.FORBIDDEN.toString());
        }
        const response = await this.updateCurso.addOrientadorCpf(id, cpf);
        this.ok(res, response);
    }

    @Patch('curso/add/aluno/:id')
    @UseGuards(JwtAuthGuard)
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
    async addAlunoMatricula(
        @Param('id') id: number,
        @Body() ra: string,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const constant = getConstants()

        const roles: string[] = ['Administrador', 'Orientador'];
        if (!roles.includes(req.user?.role as string)) {
            throw new AppError(constant.AUTH.NÃO_AUTORIZADO, HttpStatus.FORBIDDEN.toString());
        }
        const response = await this.updateCurso.addAlunoMatricula(id, ra);
        this.ok(res, response);
    }

    @Get('cursos/')
    @ApiExcludeEndpoint()
    @UseGuards(JwtAuthGuard)
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
        @Req() req: Request,
    ) {
        const constant = getConstants()

        const roles: string[] = ['Administrador', 'Aluno', 'Orientador'];
        if (!roles.includes(req.user?.role as string)) {
            throw new AppError(constant.AUTH.NÃO_AUTORIZADO, HttpStatus.FORBIDDEN.toString());
        }

        const response = await this.getTodosCursos.execute();
        this.ok(res, response);
    }


}
