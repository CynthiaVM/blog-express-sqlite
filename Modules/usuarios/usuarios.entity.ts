import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { Noticia } from '../noticias/noticia.entity';
import { before } from 'node:test';

@Entity() //decorador agregando detalles
export class usuarios { //propiedad que va a tener 
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column({unique:true}) //unico
	email: string;

	@Column()
	pass: string;

    @Column()
	nombre: string;

    @Column()
	apellido: string;

	@CreateDateColumn()
	create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

	@BeforeInsert() 
	async hashPassword() {
		this.pass = await bcrypt.hash(this.pass, 10)
	}
	@BeforeInsert()
	normalizar(){
		this.email= this.email.toLowerCase();
	}
	
	//al ponerlo aca y no en usuario, siempre lo va a ejecutar
    
	//@OneToMany(() => usuario, (c) => c.usuarios)
	//usuarios: usuario[];
    //sino lo tengo no podria tener los comentarios 


}