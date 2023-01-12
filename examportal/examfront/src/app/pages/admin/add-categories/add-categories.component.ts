import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category:any = {
    title:'',
    description: '',
  }
  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  // add category
  public addCategory() {

    if(this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Requiered !! ', '', {
        duration: 3000,
      });
      return;
    }
    this._category.addCategory(this.category).subscribe((data)=> {
      // console.log(this.category);
      this.category = data;
      this.category.title = '';
      this.category.description = '';
      Swal.fire("SuccessFully Added to DB", 'Category Added', 'success');
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error in Adding Category to DB", 'error');
      
    })
  }

}
