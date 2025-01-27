import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCampaignDTO } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
      constructor(private prismaService: PrismaService) {}

      //get campaign
      async getCampaigns() {
            return await this.prismaService.campaign.findMany();
      }

      //get by id
      getCampaignById(id: number){
            return this.prismaService.campaign.findUnique(
                  {
                        where: {
                              id: id
                        }
                  }
            );
      }
      //create campaign
      createCampaign(createCampaignDTO: CreateCampaignDTO){
            return this.prismaService.campaign.create({
                  data: {
                      name: createCampaignDTO.name,
                      description: createCampaignDTO.description,
                      image: createCampaignDTO.image,
                      category: createCampaignDTO.category,
                      donation_target: createCampaignDTO.donation_target,
                      status: "running",
                      start_date: createCampaignDTO.start_date,
                      end_date: createCampaignDTO.end_date
                  }
            })
      }
      //edit campaign
      async editCampaign(id: number, createCampaignDTO: Partial<CreateCampaignDTO>){
            const campaign = await this.prismaService.campaign.findUnique({
                  where:{
                        id: id
                  }
            })
            if(!campaign){
                  throw new NotFoundException("Campaign not found")
            }
            return this.prismaService.campaign.update({
             where:{
                   id: id
             }, 
             data:{
                   name: createCampaignDTO.name,
                   description: createCampaignDTO.description,
                   image: createCampaignDTO.image,
                   category: createCampaignDTO.category,
                   donation_target: createCampaignDTO.donation_target,
                   status: "running",
                   start_date: createCampaignDTO.start_date,
                   end_date: createCampaignDTO.end_date
             }
            })
      }
      //delete campaign
      async deleteCampaign(id: number){
            const campaign = await this.prismaService.campaign.findUnique({
                  where: {
                        id: id
                  }
            })
            if(!campaign){
                  throw new NotFoundException("Campaign not found")
            }
            return this.prismaService.campaign.delete({
                  where:{
                        id: id
                  }
            })
      }
}
