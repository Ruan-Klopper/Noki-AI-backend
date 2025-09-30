import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  async integrateWithGoogleClassroom() {
    return { message: 'Google Classroom integration' };
  }
}
