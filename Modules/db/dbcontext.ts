import { DataSource } from 'typeorm';

export const dbcontext = new DataSource({
	type: 'sqlite',
	logging: false,
	synchronize: true,
	database: './blog.db',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	 //el .entity lo reconosco como una entidad. Lo lee y lo representa en la base de datos
});