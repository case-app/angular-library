import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { ValidatorFn, Validators } from '@angular/forms'
import { ChangeEvent, CKEditor5 } from '@ckeditor/ckeditor5-angular'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { CaseInput } from '../../../interfaces/case-input.interface'

@Component({
  selector: 'case-rich-text-input',
  templateUrl: './rich-text-input.component.html',
  styleUrls: ['./rich-text-input.component.scss']
})
export class RichTextInputComponent implements CaseInput, OnChanges {
  @Input() label: string
  @Input() initialValue: { value: string }
  @Input() placeholder: string
  @Input() helpText: string
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: string }> = new EventEmitter()

  editor = ClassicEditor
  editorConfig: CKEditor5.Config

  content: string
  required: boolean

  ngOnChanges() {
    this.editorConfig = {
      toolbar: ['bold', 'italic', 'Link'],
      placeholder: this.placeholder
    }

    this.content = (this.initialValue && this.initialValue.value) || ''
    this.required = this.validators.includes(Validators.required)
  }

  onChange(event: ChangeEvent) {
    const value: string = event.editor.getData()
    this.content = value
    this.valueChanged.emit({ value })
  }
}
