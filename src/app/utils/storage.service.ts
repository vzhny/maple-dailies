import { BehaviorSubject, Observable } from 'rxjs';

// Courtsey of https://stackoverflow.com/a/58690387.
export class StorageService {
  private storage: Storage;
  private subjects: Map<string, BehaviorSubject<any>>;

  constructor(storage: Storage) {
    this.storage = storage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }

  watch(key: string): Observable<any> {
    let behaviorSubject: BehaviorSubject<any>;
    let item: any = null;

    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(null));
    } else {
      item = this.storage.getItem(key);

      if (item !== null) {
        item = JSON.parse(item);
      }
    }

    behaviorSubject = this.subjects.get(key) as BehaviorSubject<any>;
    behaviorSubject.next(item);

    return behaviorSubject.asObservable();
  }

  get(key: string): any {
    return JSON.parse(this.storage.getItem(key) ?? '');
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));

    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(value));
    } else {
      this.subjects.get(key)?.next(value);
    }
  }

  remove(key: string) {
    if (this.subjects.has(key)) {
      this.subjects.get(key)?.complete();
      this.subjects.delete(key);
    }
    this.storage.removeItem(key);
  }

  clear() {
    this.subjects.clear();
    this.storage.clear();
  }
}
