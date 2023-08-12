import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import { IconUser, IconLogout, IconPlus } from 'angular-tabler-icons/icons';

const icons = {
  IconUser,
  IconLogout,
  IconPlus,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
