import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/user-profile';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { any } from 'sequelize/types/lib/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public userProfile: UserProfile={
    userName: '',
    userPic: undefined!,
    age: 0,
    program: '',
    tag1: '',
    tag2: '',
    tag3: '',
    tag4: '',
    tag5: '',
    tag6: '',
    userBio: ''
  }
   editMode: boolean = false;
   defImg: boolean = true;
   tags: any[] = [];
   public warning: string = "";
   url: any;
   selectedTags: any[];
   dropdownSet = {};
   dropdownSettings:IDropdownSettings;
   userTags: any[6];
   i: any;

  constructor() { }

  ngOnInit(): void {

    this.tags = [
      { item_id: 1, item_text: 'Dancing' },
      { item_id: 2, item_text: 'Dating' },
      { item_id: 3, item_text: 'InCafe' },
      { item_id: 4, item_text: 'International' },
      { item_id: 5, item_text: 'Hiking' },
      { item_id: 6, item_text: 'Traveling' },
      { item_id: 7, item_text: 'InGym' },
      { item_id: 8, item_text: 'Gaming' }];

      this.selectedTags = [];

      
      

       this.dropdownSettings ={
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
        
      }
  }

  

  public onItemSelect(item: any) {
    console.log(item);

    for(this.i =0;this.i<item.length; this.i++){
      this.userTags = item;
    }

    
  }
  public onSelectAll(items: any) {
    console.log(items);
  }

  public onEditMode(result : boolean){
    this.editMode = result;
  }

  public defualtImgOn(result : boolean){

    if(!this.userProfile.userPic){
      this.defImg = result;
    }
    else{
      this.defImg =false;
    }
  }
 

  onSubmit(f: NgForm): void{
    if(this.userProfile.userName !="" && this.userProfile.age >=17 && this.userProfile.program !=""){
      console.log("form submitted");
    }
  }

  selectFile(event: any){
    
    if(!event.target.files[0] || event.target.files[0].length == 0){
      this.warning = 'You must select an image';
      return;
    }
    let mimeType = event.target.files[0].type;

    if(mimeType.match(/image\/*/) == null){
      this.warning = "Only images are supported";
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) =>{
      this.warning ="";
      this.url = reader.result;
    }

  }
}
