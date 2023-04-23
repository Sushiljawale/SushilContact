import { Component, OnInit } from '@angular/core';
import { Icontact } from 'src/app/model/icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit{
 public loading:boolean=false;
 public contacts:Icontact[]=[];
 public errorMessage:string|null=null;
 searchQuery: string = '';

 constructor(private contactservice:ContactService){}

  // ngOnInit(): void {
  //   this.loading=true;
  //   this.contactservice.getAllContacts().subscribe((data:Icontact[])=>{
  //     this.contacts=data;
  //     this.loading=false;
  //   }, (error:string) => { 
  //     this.errorMessage = error;
  //     this.loading = false;

  //   });

  //}

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }



  public getAllContactsFromServer(){
    this.loading=true;
    this.contactservice.getAllContacts().subscribe((data:Icontact[])=>{
      this.contacts=data;
      this.loading=false;
    }, (error:string) => { 
      this.errorMessage = error;
      this.loading = false;
    });

  }
  public clickDeleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactservice.deleteContact(contactId).subscribe(
        (data: {}) => {
          this.getAllContactsFromServer();
        },
        (error: any) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }

  
  
  searchContacts(): void {
    if (this.searchQuery) {
      this.loading = true;
      this.contactservice.searchContacts(this.searchQuery).subscribe(
        (data: Icontact[]) => {
          this.contacts = data;
          this.loading = false;
        },
        (error: string) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    } else {
      console.log("No contacts to search.");
    }
    
  }
  
  

}

  



