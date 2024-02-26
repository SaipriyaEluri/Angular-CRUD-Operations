import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ServiceService } from '../../service/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  TaskForm!: FormGroup;

constructor(private fb:FormBuilder, private service:ServiceService, private dialogRef: MatDialogRef<FormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar
  ){
  this.TaskForm = this.fb.group({
    // id:[null],
    taskNo: ['',[Validators.required]],
    taskName : ['',[Validators.required]],
    description: ['',[Validators.required]],
    dueDate: ['',[Validators.required]],
    priority: ['',[Validators.required]],
    completionPercentage: ['',[Validators.required]],
    status:['',[Validators.required]]
  });

  console.log(data,'hhhhhhhhhhh');
  if(this.data.action !== 'ADD' && this.data.data){
    this.TaskForm.patchValue(this.data.data);
  }
}

ngOnInit(){

}

onSubmit(){
  if(this.TaskForm.invalid){
    this.openSnackBar("Please fill all required fields","Ok")
  }
 if(this.TaskForm.valid){

  if(this.data.data && this.data.data.id){
    console.log(this.data.data.id,'id===========')
    this.service.updateTaskList(this.data.data.id,this.TaskForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
        this.openSnackBar("Task Updated Successfully","Ok")
      }
    })
  }
  else{
    this.service.saveTaskList(this.TaskForm.value).subscribe({
      next: (res) => {
        console.log(res,'ppppppppppp');
        this.dialogRef.close(true);
        this.openSnackBar("Task Added Successfully",'Ok');
      }
    })
   }
  }
 }
 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {duration: 3000});
}
}
