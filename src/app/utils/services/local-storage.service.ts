import { Injectable, Inject } from '@angular/core';
import { StorageService } from './storage.service';

// Courtsey of https://stackoverflow.com/a/58690387.
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  constructor() {
    super(window.localStorage);
  }
}
