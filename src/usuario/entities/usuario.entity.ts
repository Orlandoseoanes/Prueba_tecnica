export type FormDocument = Usuario & Document;
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateDireccionDto } from '../dto/interfaces/direccion.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@Schema({ versionKey: false })
export class Usuario {

    @Prop({ required: true, default: null })
    nombre:string;

    @Prop({ required: true, default: null, unique: true })
    email:string;

    @Prop({ required: false, default: null })
    edad:number;

    @Prop({ required: true, default: null })
    fecha_creacion:Date;
    
    @Prop({ type: [{ calle: String, ciudad: String, pais: String, codigoPostal: String }], default: [] })
    @ValidateNested({ each: true })
    @Type(() => CreateDireccionDto)
    direcciones?: CreateDireccionDto[];
    
}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
