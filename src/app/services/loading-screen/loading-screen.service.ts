import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingScreenService {
  private _loading = false;
  loadingStatus: Subject<boolean> = new Subject();

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
}
