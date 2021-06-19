import { BehaviorSubject, Observable } from 'rxjs';

// Courtsey of https://stackoverflow.com/a/58690387.
export class StorageService {
  private storage: Storage;
  private subjects: Map<string, BehaviorSubject<any>>;

  constructor(storage: Storage) {
    this.storage = storage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }

  watch<T>(key: string): Observable<T | null> {
    let behaviorSubject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
    const itemString: string | null = this.storage.getItem(key);
    let itemObj: T | null = null;

    if (itemString !== null) {
      itemObj = JSON.parse(itemString) as T;
    }

    if (!this.subjects.has(key)) {
      this.subjects.set(key, behaviorSubject);
    }

    behaviorSubject = this.subjects.get(key) as BehaviorSubject<T | null>;
    behaviorSubject.next(itemObj);

    return behaviorSubject.asObservable();
  }

  get<T>(key: string): T | null {
    const item = this.storage.getItem(key);

    if (item !== null) {
      return JSON.parse(item) as T;
    } else {
      return null;
    }
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
