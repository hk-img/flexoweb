import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../services/member.service';
import { SpaceService } from '../services/space.service';
// import { LoaderService } from '../services/loader.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { LoginDialog } from '../login/login-dialog.component';
import { AppGlobals } from '../services/app-globals';
@Component({
  selector: 'app-shortlisted-spaces',
  templateUrl: './shortlisted-spaces.component.html',
  styleUrls: ['./shortlisted-spaces.component.css'],
})
export class ShortlistedSpacesComponent implements OnInit {
  public logged_in;
  public shortlisted_space_ids;
  public shortlist_spaces = [];
  constructor(
    private route: ActivatedRoute,
    public login_dialogRef: MatDialogRef<any>,
    private spaceService: SpaceService,
    // private loaderService: LoaderService,
    public snackBar: MatSnackBar,
    public login_viewContainerRef: ViewContainerRef,
    public viewContainerRef: ViewContainerRef,
    public login_dialog: MatDialog,
    private _memberService: MemberService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private _appGlobals: AppGlobals
  ) {}

  ngOnInit() {
    this._appGlobals.userDetails.subscribe((user_details) => {
      if (user_details && user_details.is_logged_in != null) {
        this.logged_in = user_details.is_logged_in;
        this.shortlisted_space_ids = user_details.shortlists;
        if (this.logged_in) {
          this.getShortlistedSpaces();
        } else {
          this.openLoginDialog();
        }
      }
    });
  }

  getShortlistedSpaces() {
    if (this.shortlisted_space_ids && this.shortlisted_space_ids.length) {
      this.spaceService
        .getShortlistedSpaces(this.shortlisted_space_ids)
        .then((res) => {
          this.shortlist_spaces = Object.assign([], res.data);
        })
        .catch((error) => {});
    }
  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    config.minWidth = '380px';
    config.disableClose = true;

    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.flag = 2;
    // this.login_dialogRef.componentInstance.selected_teamcabin = teamcabin_obj;
    // this.login_dialogRef.componentInstance.action_type = action_type;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.login_dialogRef = null;
    });
  }

  basicInfo() {
    this._memberService
      .getBasicInfo()
      .then((res) => {
        if (res && res.success) {
          let user_details = Object.assign({}, res.data);
          user_details.is_logged_in = true;
          this._appGlobals.setUserDetails(user_details);
          this.getShortlistedSpaces();
        }
      })
      .catch((err) => {
        // this.openSnackBar('Not Logged In', 'Dismiss');
      });
  }

  shortList(obj) {
    // if (this.logged_in) {
      this._memberService.addShortlists(obj.id).then(() => {
        // obj.is_shortlisted = !!!obj.is_shortlisted;
      });
    // } else {
      // this.openLoginDialog();
    // }
  }
}
