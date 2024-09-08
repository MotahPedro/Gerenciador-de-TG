import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrientadorResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({ type: OrientadorResponseDto })
    @ValidateNested()
    @Type(() => OrientadorResponseDto)
    data: OrientadorResponseDto;
}