import { Controller, Get, Put, Param, Delete, Post, Body, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDTO } from './dto/create-campaign.dto';

@Controller('api/campaign')
export class CampaignController {
      constructor(private service: CampaignService){}

      @Get()
      async getCampaigns(){
            try {
                  var data = await this.service.getCampaigns()
            return {
                  message: "get campaigns successfully",
                  data: data
            }
            } catch (error) {
                  throw new HttpException({
                        message: "get campaigns failed",
                        error: error
                  }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
      }

      @Post()
      async createCampaign(@Body() createCampaignDTO: CreateCampaignDTO){
            try{
                  console.log(createCampaignDTO)
                  var data = await this.service.createCampaign(createCampaignDTO)
                  return{
                        message: "create campaign successfully",
                        data: data
                  }
            }catch(error){
                 throw new HttpException({
                       message: "create campaign failed",
                       error: error
                 }, HttpStatus.INTERNAL_SERVER_ERROR);  
            }
      }

      @Put(':id')
      async editCampaign(@Param('id') id: string, @Body() createCampaignDTO: Partial<CreateCampaignDTO>){
            try {
                 const data = await this.service.editCampaign(Number(id), createCampaignDTO)
                  return{
                       message: "edit campaign successfully",
                       data: data
                 }
            } catch (error) {
                 if(error instanceof NotFoundException){
                  throw new HttpException({
                        message: "edit campaign failed",
                        error: error.message
                  }, HttpStatus.NOT_FOUND);
                 }
                 throw new HttpException({
                  message: "edit campaign failed",
                  error: error.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
      }
      @Delete(":id")
      async deleteCampaign(@Param('id') id: string){
            try {
                  const data = await this.service.deleteCampaign(Number(id))
                  return{
                        message: "delete campaign successfully",
                        data: data
                  }
            } catch (error) {
                  if(error instanceof NotFoundException){
                        throw new HttpException({
                              message: "delete campaign failed",
                              error: error.message
                        }, HttpStatus.NOT_FOUND);
                  }else{
                        throw new HttpException({
                        message: "delete campaign failed",
                        error: error.message
                  }, HttpStatus.INTERNAL_SERVER_ERROR);
                  }
            }    
      }

}
