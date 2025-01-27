import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateCampaignDTO{
      @IsNotEmpty()
      @IsString()
      name: string

      @IsNotEmpty()
      @IsString()
      description: string

      @IsNotEmpty()
      @IsString()
      image: string

      @IsNotEmpty()
      donation_target: number

      @IsNotEmpty()
      @IsString()
      category: string

      @IsNotEmpty()
      @IsString()
      status: string

      @IsNotEmpty()
      @IsDateString()
      start_date: Date

      @IsNotEmpty()
      @IsDateString()
      end_date: Date
      
}