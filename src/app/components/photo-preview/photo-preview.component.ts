import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
  id: string;
  photo: Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params["id"]);
      this.id = params["id"];
      this.photoService.getPhoto(this.id)
        .subscribe({
          next: res => {
            this.photo = res;
            console.log(this.photo);

          },
          error: err => console.error(err)
        })
    })
  }

  deletePhoto(id: string) {
     this.photoService.deletePhoto(id)
      .subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(["/photos"])
        },
        error: err => console.error(err)
      })
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService.updatePhoto(this.id, title.value, description.value)
      .subscribe({
        next: res => {
          console.log(res),
          this.router.navigate(["/photos"])
        },
        error: err => console.error(err)
      })
    return false
  }

}
