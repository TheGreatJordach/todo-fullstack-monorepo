import { Module} from '@nestjs/common';
import { AppConfiguration } from '../config/app.configuration.module';
import { AuthModule } from '@todo-fullstack-monorepo/auth';
import { UsersModule } from '@todo-fullstack-monorepo/users';

@Module({
  imports: [AppConfiguration,AuthModule,UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
