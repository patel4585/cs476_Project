import { Component, ChangeDetectionStrategy,signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormGroupDirective, NgForm, Validators,ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DatePipe } from '@angular/common';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'create.post',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './create.post.component.html',
  styleUrl: './create.post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})



export class CreatePostComponent{
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  today = new Date();


}
