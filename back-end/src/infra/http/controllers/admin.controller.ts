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

import { CreateAdminUseCase } from '@application/useCases/Admin/CreateAdmin.usecase';
// import { GetAdminUseCase } from '@application/useCases/Admin/GetAdmin.usecase';
// import { DeleteAdminUseCase } from '@application/useCases/Admin/DeleteAdmin.usecase';
// import { UpdateAdminUsecase } from '@application/useCases/Admin/UpdateAdmin.usecase';
// import { GetTodosAdminUseCase } from '@application/useCases/Admin/GetTodosAdmins.usecase';
import { LoginLogoutUseCase } from '@application/useCases/Admin/Login-Logout.usecase';
import { AdminsRequestDto } from '../dtos/Requests/AdminRequestDto';
import { AdminsResponseDto } from '../dtos/Responses/AdminRespondeDto';
import { CreateAdminResponseExample } from '../dtos/examples/CreateAdminResponseExample';
import { AdminProps } from '@domain/entities/Admin';
// mais 4 dtos a fazer
// JwtAuth

@Controller('gerenciadorDeTG/v1')
export class AdminController extends BaseController {
    constructor(
        private readonly createAdminUseCase: CreateAdminUseCase,
        // private readonly getAdminUseCase: GetAdminUseCase,
        // private readonly getTodosAdminsUsecase: GetTodosAdminUseCase,
        // private readonly deleteAdminUseCase: DeleteAdminUseCase,
        // private readonly updateAdminUseCase: UpdateAdminUsecase,
        private readonly loginLogoutUseCase: LoginLogoutUseCase,
    ) {
        super();
    }

    @Post('admin')
    @ApiBody({ type: AdminsRequestDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        content: {
            'application/json': {
                examples: {
                    CreateAlunoResponse: {
                        summary: 'Create Aluno Response',
                        value: CreateAdminResponseExample,
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
        @Body() admin: AdminsRequestDto,
        @Res() res: Response,
    ) {

        const response = await this.createAdminUseCase.execute(admin);

        this.ok(res, response);
    }

    @Post('admin/login')
    async login(@Body() body: any, @Res() res: any) {
        return this.loginLogoutUseCase.login(body, res);
    }

    @Post('admin/logout')
    async logout(@Res() res: any) {
        return this.loginLogoutUseCase.logout(res);
    }
}
