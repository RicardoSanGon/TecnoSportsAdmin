/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { User } from 'src/api/users/entities/user.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const { email, password, name } = createUser;

    const { data: authData, error: authError } = await this.supabaseService
      .getClient()
      .auth.signUp({
        email,
        password,
      });

    if (authError) {
      throw new Error(authError.message);
    }

    if (authData.user) {
      try {
        const newUser = this.userRepository.create({
          authUserId: authData.user.id, // Conectar con Supabase Auth
          email,
          name,
        });

        // TypeORM usará tu conexión directa a PostgreSQL, no Supabase
        const savedUser = await this.userRepository.save(newUser);

        return {
          auth: authData,
          profile: savedUser,
        };
      } catch (dbError) {
        // Si falla crear en la BD, eliminar el usuario de auth
        await this.supabaseService
          .getClient()
          .auth.admin.deleteUser(authData.user.id);
        throw new Error(`Error creating user profile: ${dbError.message}`);
      }
    }

    return authData;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signOut() {
    const { error } = await this.supabaseService.getClient().auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Logged out successfully' };
  }

  async getUserProfile(authUserId: string) {
    // Usar TypeORM para consultar, no Supabase
    const user = await this.userRepository.findOne({
      where: { authUserId },
    });

    if (!user) {
      throw new Error('User profile not found');
    }

    return user;
  }
}
