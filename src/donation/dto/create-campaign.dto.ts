import { IsNotEmpty, IsNumberString } from "class-validator"

export class createDonationDTO{
      @IsNotEmpty()
      amount: number

      @IsNotEmpty()
      campaignId: number

      @IsNotEmpty()
      userId: number
}