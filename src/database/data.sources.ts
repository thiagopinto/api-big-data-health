import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(`${process.env.DATABASE_PORT}`),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  //logging: process.env.NODE_ENV === 'development' ? true : false,
  logging: true,
  entities: [`dist/**/entities/**.entity{.ts,.js}`],
  migrations: [`dist/database/migrations/*{.ts,.js}`],
  synchronize: `${process.env.DATABASE_SYNCHRONIZE}` === 'true' ? true : false,
  //migrations: [`${__dirname}/migrations/**/*.ts`],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export default dataSource;
