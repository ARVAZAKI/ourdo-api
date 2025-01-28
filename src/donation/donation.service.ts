import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDonationDTO } from './dto/create-campaign.dto';

@Injectable()
export class DonationService {
      constructor(private prismaService: PrismaService){}

      async getDonations(){
            try {
                  const donation = await this.prismaService.donation.findMany()
                  return donation;
            } catch (error) {
                  throw new HttpException({
                        message: "get donations failed",
                        error: error
                  }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
      }

      async createDonation(data: createDonationDTO){
                  const campaign = await this.prismaService.campaign.findUnique({
                        where:{
                              id: data.campaignId
                        }
                  })
                  if(!campaign){
                        throw new BadRequestException("Campaign not found")     
                  }
                  const donation = await this.prismaService.donation.create({
                        data:{
                              amount: data.amount,
                              campaignId: data.campaignId,
                              userId: data.userId
                        }
                  })
                  return donation
      }
}
