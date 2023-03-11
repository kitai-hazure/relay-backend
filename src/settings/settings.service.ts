import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateLanguage(userId: string, language: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { language },
    });
    return 'Successfully updated language';
  }
}
