import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Comentario } from '../comentarios/comentario.entity';
import { usuarios } from '../usuarios/usuarios.entity';

@Entity() //decorador agregando detalles
export class Noticia { //propiedad que va a tener la noticia
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column() //decorador
	titulo: string;

	@Column()
	contenido: string;

	@CreateDateColumn()
	create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

	@OneToMany(() => Comentario, (c) => c.noticia)
	comentarios: Comentario[];
//sino lo tengo no podria tener los comentarios 
    
    //@OneToMany(() => usuario, (c) => c.usuarios)
	//usuarios: usuario[];


}