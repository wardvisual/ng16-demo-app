import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconUser,
  IconLogout,
  IconPlus,
  IconNotebook,
  IconCalendar,
  IconX,
} from 'angular-tabler-icons/icons';

const icons = {
  IconUser,
  IconLogout,
  IconPlus,
  IconNotebook,
  IconCalendar,
  IconX,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
