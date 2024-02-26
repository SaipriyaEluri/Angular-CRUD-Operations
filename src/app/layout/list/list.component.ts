import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  
})
export class ListComponent {

  dialogRef:any;
  itemId : any;
  toDoList : any = [];
  action:string = '';
  displayedColumns : string[] = ['taskNo','taskName','description','dueDate','priority','completionPercentage','status','Action']

  constructor(private route: ActivatedRoute,private service:ServiceService, private dialog:MatDialog, private cdref: ChangeDetectorRef,
    private _snackBar: MatSnackBar){ }

  ngOnInit(){   
    this.getList();
  }

  getList(){
      this.service.getTaskList().subscribe({
        next: (res:any) => {
          this.toDoList = res;
          console.log(res,'oooooooooooooo');   
          this.cdref.detectChanges();
        },
        error(err) {
          console.log(err)
        },
      })
  }
 
  deleteTask(id:any){
    this.service.deleteTaskList(id).subscribe({
      next:(res:any) => {
        this.openSnackBar('Task was Deleted Successfully', 'Ok');
        this.getList();
      }
    })
  }
  updateTask(action:any,data?:any){
    this.action = action;
    this.dialogRef = this.dialog.open(FormComponent, { height: '80vh', width: '700px',autoFocus: action != 'VIEW',  data: {action, data} });
    this.dialogRef.afterClosed().subscribe({
      next: (val :any) => {
        if (val){
          this.getList();
        }
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }


  
}
