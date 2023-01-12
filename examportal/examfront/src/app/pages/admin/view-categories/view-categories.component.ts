import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = [
    {
      id: 23,
      title: "Programming",
      description: "Hello world, this line is for test of programming"
    },
    {
      id: 24,
      title: "GK",
      description: "Hello world, this line is for test of GK"
    },
    {
      id: 23,
      title: "Aptitude",
      description: "Hello world, this line is for test of Aptitude"
    },
    
  ]
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      console.log(this.categories);
      this.categories = data;
      
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error", "Error in Loading Categories", 'error');
      
    })
  }

}
