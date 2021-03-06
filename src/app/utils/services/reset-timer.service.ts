import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Subject, interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetTimerService {
  private midnightUTC: moment.Moment | null = null;
  private weeklyMidnightUTC: moment.Moment | null = null;

  private $remainingTime = new BehaviorSubject<string | null>(null);
  private $remainingWeeklyDays = new BehaviorSubject<string | null>(null);

  private $onReset = new Subject<void>();
  private $onWeeklyReset = new Subject<void>();

  datetimeFormat = 'MM/DD/YYYY HH: mm: ss';
  thursdayEnum = 4;

  remainingTime = this.$remainingTime.asObservable();
  remainingWeeklyDays = this.$remainingWeeklyDays.asObservable();

  onReset = this.$onReset.asObservable();
  onWeeklyReset = this.$onWeeklyReset.asObservable();

  constructor() {
    this.midnightUTC = this.setMidnightUTC();
    this.weeklyMidnightUTC = this.setWeeklyMidnightUTC();

    interval(1000).subscribe(this.calculateRemainingTime);
    interval(1000).subscribe(this.calculateRemainingWeeklyDays);
  }

  getCurrentMidnightUtc() {
    return this.midnightUTC ?? moment().utc();
  }

  getCurrentWeeklyMidnightUtc() {
    return this.weeklyMidnightUTC ?? moment().utc();
  }

  private setMidnightUTC = () => {
    return moment().utc().endOf('day').add(1, 'second');
  };

  private setWeeklyMidnightUTC = () => {
    const todayEnum = moment().utc().isoWeekday();
    const wednesdayEnum = this.thursdayEnum - 1;

    if (todayEnum <= this.thursdayEnum) {
      return moment().utc().isoWeekday(wednesdayEnum).endOf('day').add(1, 'second');
    } else {
      return moment().utc().add(1, 'weeks').isoWeekday(wednesdayEnum).endOf('day').add(1, 'second');
    }
  };

  private calculateRemainingTime = (_: number) => {
    const difference = moment.utc(moment(this.midnightUTC, this.datetimeFormat).diff(moment(moment().utc(), this.datetimeFormat)));
    const secondsUntilReset = difference.unix();

    if (secondsUntilReset === 0) {
      this.midnightUTC = this.setMidnightUTC();
      this.$remainingTime.next(null);
      this.$onReset.next();
    } else {
      const hoursRemaining = difference.get('hour');
      const minutesRemaining = difference.get('minutes');
      const secondsRemaining = difference.get('seconds');
      const seconds = secondsRemaining !== 1 ? 'seconds' : 'second';

      this.$remainingTime.next(`${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} ${seconds}`);
    }
  };

  private calculateRemainingWeeklyDays = (_: number) => {
    const difference = moment.utc(moment(this.weeklyMidnightUTC, this.datetimeFormat).diff(moment(moment().utc(), this.datetimeFormat)));
    const secondsUntilReset = difference.unix();

    if (secondsUntilReset === 0) {
      this.weeklyMidnightUTC = this.setWeeklyMidnightUTC();
      this.$remainingWeeklyDays.next(null);
      this.$onWeeklyReset.next();
    } else {
      const daysRemaining = difference.get('days');
      const days = daysRemaining !== 1 ? 'days' : 'day';

      this.$remainingWeeklyDays.next(`${daysRemaining} ${days}`);
    }
  };
}
