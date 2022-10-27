import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
 Name:any;
 Mail:any;
 Number:any;
 password:any;
 Conformpassword:any;
 passworderror:any;
 captchatext: any;
 myCanvas: any;
 context: any;
 random: any;
 captchaerror:any;
 Dropdown:any;
 employee:any = [
   {id:"1", employee:"Developer"},
   {id:"2", employee:"Tester"},
   {id:"3", employee:"Admin"},
   {id:"4", employee:"HR"},
   {id:"5", employee:"Maneger"},
]

header=["Sno","Name","Mail","PhoneNumber"];
rows:any[]=[];
  isSubmiutted: boolean=false;
constructor(private fb: FormBuilder,public http: HttpClient) { }
 profiles = this.fb.group({
        Name: ['',[Validators.required,Validators.minLength(4) ]],
        Mail: ['',[Validators.required,Validators.minLength(12),Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        Number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[6-9]{3}-[0-9]{2}-[0-9]{3}') ]],
        password:['',[Validators.required,Validators.minLength (8)]],
        Conformpassword:['',[Validators.required , Validators.minLength(8)]],
        captcha:['',[Validators.required]],
        Dropdown:['',[Validators.required]],
      })
ngOnInit(): void {
    this.captcha();
    }
    
reGenCaptcha(){
      this.captcha();
    }
captcha(){
      setTimeout(()=>{
         this.random = Math.floor(100000 + Math.random() * 900000);
         var canvas = <HTMLCanvasElement>document.getElementById('random');
         var context = canvas.getContext('2d');
         context?.clearRect(0,0,canvas.width,canvas.height);
         context!.font ='30px Arial, Helvetica, sans-serif';
         context?.fillText(this.random, 10, 35);
       },200);
    }

changepassword(event:any){
        this.profiles.value.password
        let password = this.profiles.value.password
        if(event.target.value==password){
          this.passworderror = false;
        }
        else{
          this.passworderror = true;
        }
      }
captchamatch(event:any){
        this.profiles.value.captcha
        let random= this.profiles.value.captcha
        if(event.target.value == this.random){
          this.captchaerror = false;
        }
      else{
        this.captchaerror = true;
      }
    }
    onSubmit(){
      console.warn(this.profiles.value);
    }
register(){
  // debugger
    this.isSubmiutted = true;
    if(this.profiles.valid){
        let data={
          Name:this.profiles.value.Name,
          Mail:this.profiles.value.Mail,
          Number:this.profiles.value.Number,
        }
        //  let Name=this.profiles.value.Name
        //  let Mail=this.profiles.value.Mail
        //  let Number=this.profiles.value.Number
        //  let Dropdown=this.profiles.value.Dropdown
        //  }
        // this.rows.push({'Name':Name,'Mail':Mail,'Number':Number})
        this.rows.push(data)
    // this.isSubmiutted = false;

      }
    }
}

