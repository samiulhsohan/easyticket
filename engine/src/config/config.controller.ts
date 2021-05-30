import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  @Get()
  getConfig(): any {
    return {
      app: {
        version: {
          current: '1.0.0',
          minimum: '1.0.0',
        },
        appLink:
          'https://play.google.com/store/apps/details?id=dev.sohan.easyticket',
      },
      br: {
        apiRequestInterval: 500,
        ticketingTime: {
          starts: 6,
          ends: 23,
        },
        maxSeats: 4,
        advanceTicketDays: 5,
      },
    };
  }
}
