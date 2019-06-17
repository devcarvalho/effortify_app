import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {
  @ViewChild('file') file: ElementRef;
  @Input() displayImg: string;

  @Output() newImage = new EventEmitter();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  newImgShow = false;
  showCropper = false;
  defaultImg =
    // tslint:disable-next-line: max-line-length
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAAAAAAZai4+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjBhAMMyasIXgaAAAD4ElEQVR42u3ca1PaQBQG4P7/X9Rhs5cQbMVLVbygqFiVjsVrFeUisNtshJCE0IRwNmY653xygNk8vGfZbALjF1XI+vLZAGQhC1nIQhayClLIWo01/oSSiaxOdT3vqq41ElhSPdPci5VqySzBBc+3hHWQzMrZpFlkH1nIQtZClvH1KguLOe272ztzdftYt0QGVkUZrl8kE2uopMEaq6tsrJHRrKS6RhaykIUsZCErBevjOlNKtXrBpjXqDeSUVwyWa2nXKra93ngtUFpSDfcsizFGibguDkuNNkvCG0jw0s+V+wjEkqpesqe7b04fV3XBsKTqBC9WrJ10h75ayIdiNUnwnol4S6N6s47NspTaswIsQX+n6eIOWXtfaIZh/QixSCuRpQ9sL3ydmbSsmySW20KbCWvbaFpSnYXmFu8kN3FHvxH2FP9CKNYzC4a1KIToYQU5Nslynzry1y3O6UNCWF4LvXGcgcEmujXcIP4q30zZwsUfDrhz4mCX6HMiI/wyZQu9fm+ZTct9zze7jm1/q3fmnph76aSF3kixkx52vzXs9sZp9lu7/nIiSN00K3Z3OmrNv6wVWE2Y01dxQxndy7uEryfRh7rl4GpCrmL7bJIlVd/hJOIKtNA7f27mnpZUh+6yEXKFW+itcjHbG6Msqe6pN3Ij8FCohd6zRzmz1LhKRcSl9iJhcVbu5drE2ebQd0n/Vm0wrsu5uAyypHoVs0OffjzUi7TQm/QbhpsYGT7wkZu4VI3EfCE5f2oHTksG/7wJ71jPdAutGJUgh0ZZ/Zfg8O9rNHzw07gWeqPZXXNNlOqcz1xSnUT7RZr7cS3Uh45e8EKmNahY5efpmVE9zQdDY7PSk75qrIl6ObBp+c/0fW/NT6PFX7/T+3BcgGkNKsx937bnkv53NqlKkANDrMnaKZj9pPc23TJLr3IrMunh0tJh6WGYeFRjtb9MWPrgF6G44Pby/omGiQd1ay2lcifX+thIWpOw9EDUbm/QJVnCuguvxUDXiYFbNoLR5Uze0Wvh8WDSmoWVtcRbIC4z97eyqEgTnAUQFqffRwqWBRCWnvTtWVwwaQGE5bJqwUOtzgIJSwteA/sPgLQgwtKAc0iWVBcwYbHZpIdIq1+2GMyvE/1brhCsXhvoBz/tF9hPInjBrFtQBcsqaFrIQhYkq6A/wjMallutTCz7uHFisk63KV+exTkxW6XpVcqSLGG6srHyKmQhC1nIQhaykIUsZCELWchCFrKQhSxk/ZuV93+DSPn/IFjuxUvJab04Zaecbzn8KIHlwkb513CcyCpGIQtZyCpCIQtZyCpCIes/YP0FcIs3frB+LY8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDYtMTZUMTI6NTE6MzgrMDA6MDBDX25+AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA2LTE2VDEyOjUxOjM4KzAwOjAwMgLWwgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=';

  constructor() {}

  ngOnInit() {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.newImage.emit(event.base64);
  }

  clearInput() {
    this.file.nativeElement.value = '';
    this.showCropper = false;
  }
}
