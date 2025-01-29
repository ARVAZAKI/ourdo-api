import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator"

export class createDonationDTO{
      @IsNotEmpty()
      @IsNumber()
      amount: number

      @IsNumber()
      @IsNotEmpty()
      campaignId: number

      @IsNumber()
      @IsNotEmpty()
      userId: number
}