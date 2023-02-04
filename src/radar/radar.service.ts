import { Person } from 'src/graphql.types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RadarService {
  constructor(private prismaService: PrismaService) {}

  async findPeople(userId: string) {
    // TODO: Implement in a better fashion
    const user = await this.prismaService.chatUser.findUnique({
      where: {
        userId,
      },
    });
    const { latitude, longitude } = user;
    const users = await this.prismaService.chatUser.findMany();
    const result: Person[] = [];
    for (const user of users) {
      if (user.id === userId) continue;
      const distance = this.getDistanceFromLatLonInMetres(
        user.latitude,
        user.longitude,
        latitude,
        longitude,
      );
      if (distance < 1000) {
        result.push({ user, distance });
      }
    }
    result.sort((a, b) => a.distance - b.distance);
    return result;
  }

  getDistanceFromLatLonInMetres(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
