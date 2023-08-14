import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-listing',
  templateUrl: './notes-listing.component.html',
  styleUrls: ['./notes-listing.component.scss'],
})
export class NotestListingComponent implements OnInit {
  @Input() notes;
}
