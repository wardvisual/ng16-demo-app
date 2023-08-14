import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconUser,
  IconLogout,
  IconPlus,
  IconNotebook,
  IconCalendar,
  IconX,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconTrash,
  IconEdit,
} from 'angular-tabler-icons/icons';

const icons = {
  IconUser,
  IconLogout,
  IconPlus,
  IconNotebook,
  IconCalendar,
  IconX,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconTrash,
  IconEdit,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
