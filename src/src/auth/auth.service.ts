import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
  async validateUser(username: string, password: string): Promise<any> {

    if (username === 'usuario' && password === 'senha') {
      return { id: 1, username: 'usuario' };
    }
    return null;
  }
}