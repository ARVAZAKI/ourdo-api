import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CampaignModule } from './campaign/campaign.module';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [PrismaModule, CampaignModule, PrismaModule, DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
