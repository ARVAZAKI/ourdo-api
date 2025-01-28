import { Controller, HttpException, HttpStatus, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { DonationService } from './donation.service';
import { createDonationDTO } from './dto/create-campaign.dto';

@Controller('api/donation')
export class DonationController {
      constructor(private service: DonationService){}

      @Get()
      async getDonations() {
            try {
                  const donation = await this.service.getDonations()
                  return {
                        message: "get donations successfully",
                        data: donation
                  }
            } catch (error) {
                  if (error instanceof HttpException) {
                        throw error;
                  }
            }
      }

      @Post()
      async createDonation(@Body() data: createDonationDTO){
            try{
                  const donation = await this.service.createDonation(data)
                  return {
                        message: "create donation successfully",
                        data: donation
                  }
            }catch(error){
                  if(error instanceof BadRequestException){
                        throw error
                  }
                  throw new HttpException({
                        message: "create donation failed",
                        error: error
                  }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
      }
}
