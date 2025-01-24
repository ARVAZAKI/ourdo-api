import { Controller, Get, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CampaignService } from './campaign.service';

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
      @Delete(":id")
      async deleteCampaign(@Param('id') id: string){
            try {
                  var campaign = await this.service.getCampaignById(Number(id))
            if(!campaign){
                  throw new HttpException({
                        message: "campaign not found",
                  },
            HttpStatus.NOT_FOUND);
            }else{
                  var data = await this.service.deleteCampaign(Number(id))
                  return{
                        message: "delete campaign successfully",
                        data: data
                  }
            }
            } catch (error) {
                  var errMessage = error.message
                  if (error instanceof HttpException) {
                        throw error;
                    }
                  throw new HttpException({
                        message: "delete campaign failed",
                        error: errMessage
                  },HttpStatus.INTERNAL_SERVER_ERROR,
            );
            }    
      }

}
