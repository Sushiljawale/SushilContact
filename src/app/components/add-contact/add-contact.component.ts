import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icontact } from 'src/app/model/icontact';
import { Igroup } from 'src/app/model/igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading : boolean=false;
  public contact: Icontact= {} as Icontact;
  public errorMessage:string | null=null;
  public groups : Igroup[] = [] as Igroup[];


  constructor(private contactservice:ContactService, private router:Router){}

  ngOnInit(): void {
    this.contactservice.getAllGroups().subscribe((data:Igroup[])=>{
      this.groups=data;

    }, (error)=>{
      this.errorMessage=error;

    });
  }

  public createSubmit(){
    this.contactservice.createContact(this.contact).subscribe((data:Icontact)=>{
    this.router.navigate(['/']).then();
    }, (error:string)=>{
      this.errorMessage=error;
      this.router.navigate(['/contacts/add']).then()
    });
  }

}
