import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import * as moment from 'moment-timezone';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly Usermodel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const fechaActualColombia = moment().tz('America/Bogota').toISOString();
      const user = new this.Usermodel({
        ...createUsuarioDto,
        fecha_creacion: fechaActualColombia,
      });

      const nuevoUsuario = await user.save();

      return nuevoUsuario;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'El correo ya está registrado. Usa otro correo.',
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<Usuario[]> {
    try {
      const Userfinder = await this.Usermodel.find().exec();
      return Userfinder;
    } catch (error) {
      throw new Error(`Error obteniendo a los usuarios: ${error.message}`);
    }
  }

  async findAllWithPagination(
    limit = 10,
    offset = 0,
    edad?: number,
    calle?: string,
    pais?: string,
    ciudad?: string,
  ): Promise<{
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
    Usuarios: Usuario[];
  }> {
    const filters: Record<string, any> = {};
    if (edad) {
      filters.edad = edad;
    }
    if (calle || pais || ciudad) {
      filters['direcciones'] = {
        $elemMatch: {
          ...(calle && { calle }),
          ...(pais && { pais }),
          ...(ciudad && { ciudad }),
        },
      };
    }

    const total = await this.Usermodel.countDocuments(filters).exec();
    const Usuarios = await this.Usermodel.find(filters)
      .skip(offset)
      .limit(limit)

      .exec();

    const page = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      totalPages,
      page,
      pageSize: limit,
      Usuarios,
    };
  }

  async getById(id: string): Promise<Usuario> {
    try {
      const Userfinder = await this.Usermodel.findById(id).exec();
      if (!Userfinder) {
        throw new NotFoundException(`Usuario con ID ${id} not found`);
      }
      return Userfinder;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Error  obteniendo usuarios con ID ${id}: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Error inesperado obteniendo usuarios',
      );
    }
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<{ usuario: Usuario }> {
    const updatedUser = await this.Usermodel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true },
    ).exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return { usuario: updatedUser as Usuario };
  }

  async remove(id: string): Promise<Usuario> {
    try {
      const user = await this.Usermodel.findById(id);
      if (!user) {
        throw new NotFoundException(`Convocatoria with ID ${id} not found`);
      }
      await user.deleteOne();
      return user;
    } catch (error) {
      throw new Error(
        `Error while deleting convocatoria with ID ${id}: ${error.message}`,
      );
    }
  }

  async getByCiudad(ciudad: string): Promise<Usuario[]> {
    try {
      const finduser = await this.Usermodel.find({
        'direcciones.ciudad': ciudad,
      }).exec();

      if (!finduser || finduser.length === 0) {
        throw new NotFoundException(
          `Usuarios en la ciudad: "${ciudad}" no existen`,
        );
      }

      return finduser;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Error encontrando  "${ciudad}": ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        `error inesperado encontrando usuarios en la ciudad:${ciudad}`,
      );
    }
  }
}
