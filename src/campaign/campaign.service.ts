import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampaignService {
      constructor(private prismaService: PrismaService) {}

      //get campaign
      getCampaigns() {
            return this.prismaService.campaign.findMany();
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

      //edit campaign

      //delete campaign
      deleteCampaign(id: number){
            return this.prismaService.campaign.delete({
                  where:{
                        id: id
                  }
            })
      }
}
