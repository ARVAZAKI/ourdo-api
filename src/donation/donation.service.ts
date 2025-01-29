import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDonationDTO } from './dto/create-campaign.dto';

@Injectable()
export class DonationService {
      constructor(private prismaService: PrismaService){}

      async getDonations(){
            try {
                  const donation = await this.prismaService.donation.findMany({
                        include: {
                              campaign: {
                                    select:{
                                          name: true
                                    }
                              },
                              user:{
                                    select:{
                                          name: true
                                    }
                              }
                        }
                  })
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

      async getCampaignDonation(id: number){
            try {
                  const campaign = await this.prismaService.campaign.findUnique({
                        where:{
                              id: id
                        },
                        include: {
                              Donation: {
                                    select:{
                                          amount: true,
                                          user:{
                                                select:{
                                                      name: true
                                                }
                                          }
                                    }
                              }
                             
                        }
                  })
                  if(!campaign){
                        throw new BadRequestException("Campaign not found")
                  }
                  const totalDonation = campaign.Donation.reduce((total, donation) => total + donation.amount, 0)
                  return {
                        message: "get campaign donation successfully",
                        data: {
                              id: campaign.id,
                              name: campaign.name,
                              description: campaign.description,
                              image: campaign.image,
                              donation_target: campaign.donation_target,
                              totalDonation: totalDonation, 
                              donations: campaign.Donation
                        }
                  }
            } catch (error) {
                  throw new HttpException({
                        message: "Get campaign donation failed",
                        error: error.message
                    }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
      }
}
