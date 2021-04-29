import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      // Remove HTML tags and "&nbsp;".
      return value.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ')
    }
  }
}
