import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity() //decorador agregando detalles
export class Noticia { //propiedad que va a tener la noticia
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column() //decorador
	titulo: string;

	@Column()
	contenido: string;

    @UpdateDateColumn()
    update_at: Date;
}