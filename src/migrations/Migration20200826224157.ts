import { Migration } from '@mikro-orm/migrations';

export class Migration20200826224157 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` modify `created_at` datetime not null, modify `updated_at` datetime not null, modify `title` text not null;');
  }

}
