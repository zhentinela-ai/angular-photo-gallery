import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos = [];

  constructor(private photoServices: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.photoServices.getPhotos()
      .subscribe({
        next: res => {
          this.photos = res;
        },
        error: e => console.error(e),
        complete: () => console.info("Complete")
      })
  }

  selectedCard(id: string) {
    this.router.navigate(["/photos/", id])
  }

}
