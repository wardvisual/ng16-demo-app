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
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
