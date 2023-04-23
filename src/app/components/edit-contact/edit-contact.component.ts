import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Icontact } from 'src/app/model/icontact';
import { Igroup } from 'src/app/model/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent  implements OnInit{

  public loading : boolean=false;
  public contactId:string | null=null;
  public contact: Icontact= {} as Icontact;
  public errorMessage:string | null=null;
  public groups : Igroup[] = [] as Igroup[];
 

  constructor ( private activatedRoute:ActivatedRoute , 
          private contactservice:ContactService,
          private router:Router){}

  ngOnInit(): void {
    this.loading=true;
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
     this.contactId=param.get('contactId');
    });

    if(this.contactId){
      this.contactservice.getContact(this.contactId).subscribe((data:Icontact)=>{
        this.contact=data;
        this.loading=false;
      },(error)=>{
        this.errorMessage=error;
        this.loading=false;
      });

     }
   
  }

  public submitUpdate() {
    if (this.contactId) {
      this.contactservice.updateContact( this.contactId, 
              this.contact).subscribe((data:Icontact) => {
        this.router.navigate(['/']).then();
      }, (error: any) => {
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      });
    }
  }  

}
