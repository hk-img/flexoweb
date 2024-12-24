import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MemberService } from '../services/member.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;
declare var grecaptcha: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public name;
  public email;
  public mobile;
  loadAPI: Promise<any>;
  public message;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public snackBar: MatSnackBar,
    private _memberService: MemberService,
  ) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  public loadScript() {
  if (isPlatformBrowser(this.platformId)) {
    $(document).on('submit', '#contactform', function () {
      if (grecaptcha.getResponse()) {
        var a = 'https://devapis.flexospaces.com/api/v1/queries/add';
        $("#message").slideUp(750, function () {
          $("#message").hide();
          $("#submit").attr("disabled", "disabled");
          $.post(a, {
            name: $("#name").val(),
            email: $("#email").val(),
            mobile: $("#mobile").val(),
            message: $("#comments").val()
          }, function (res) {
            document.getElementById("message").innerHTML = res.message || 'Thank you for reaching out to us. We will get back to you shortly.';
            $("#message").slideDown("slow");
            $("#submit").removeAttr("disabled");
            if (res.success) {
              $("#contactform").slideDown("slow");
              document.querySelector('form').reset();
            }
          });
        });
      } else {
        alert('Please check the box to verify you are not a BOT');
      }
      return false;
    });
  }
  }

  openSnackBar(message: string, action: string) {
    // this.loaderService.displayLoader(false);
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  submit() {
    this._memberService.addQuery({ name: this.name, email: this.email, mobile: this.mobile, message: this.message })
      .then(res => {
        if (res && res.success) {
          this.openSnackBar(res.message, 'Dismiss');
        }
      })
      .catch(error => {
        throw error;
      })
  }
}
