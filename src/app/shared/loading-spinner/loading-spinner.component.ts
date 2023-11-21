import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})

export class LoadingSpinnerComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
