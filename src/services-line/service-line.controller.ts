import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateServiceLineDto } from "./dto/create-service-line.dto";
import { UpdateServiceLineDto } from "./dto/update-service-line.dto";
import { ServiceLine } from "./service-line.entity";
import { ServiceLineService } from "./service-line.service";

@ApiTags('Services-line')
@ApiBearerAuth()
@Controller('service-line')
export class ServiceLineController {
  constructor(private readonly serviceLineService: ServiceLineService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createServiceLine(@Body() createServiceLineDto:CreateServiceLineDto){
    return await this.serviceLineService.createServiceLine(createServiceLineDto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateAwards(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateServiceLineDto: UpdateServiceLineDto,
  ) {
    return await this.serviceLineService.updateServiceLine(id, updateServiceLineDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteAwards(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return await this.serviceLineService.deleteServiceLine(id);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getAwardsById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.serviceLineService.getServiceLineById(id);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  async getAllServiceLine() : Promise<ServiceLine[]> {
    return await this.serviceLineService.getAllServiceLine();
  }
}