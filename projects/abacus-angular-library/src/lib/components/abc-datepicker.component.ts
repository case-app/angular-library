import { Component } from '@angular/core'
import {
  IMyDate,
  IMyDateModel,
  IAngularMyDpOptions
} from 'angular-mydatepicker'

@Component({
  template: 'NO UI TO BE FOUND HERE!'
})
export class AbcDatepickerComponent {
  datePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    selectorWidth: '310px',
    selectorHeight: '45px'
  }

  // Format YYYY-MM-DD to MyDatePicker format (today if date not specified)
  formatStandardDate(
    dateString = new Date().toISOString().substring(0, 10)
  ): { date: IMyDate } {
    // In case of NULL dateString (!! Different than empty), we return null to make datepicker empty
    if (!dateString) {
      return null
    }
    const spiltDateFrom = dateString.split('-')
    return {
      date: {
        year: parseInt(spiltDateFrom[0], 10),
        month: parseInt(spiltDateFrom[1], 10),
        day: parseInt(spiltDateFrom[2], 10)
      }
    }
  }

  // Format MyDatePicker format date to YYYY-MM-DD
  formatMyDatePickerDate(dateObject: IMyDateModel): string {
    return dateObject
      ? `${
          dateObject.singleDate.date.year
        }-${dateObject.singleDate.date.month
          .toString()
          .padStart(
            2,
            '0'
          )}-${dateObject.singleDate.date.day.toString().padStart(2, '0')}`
      : null
  }
}
