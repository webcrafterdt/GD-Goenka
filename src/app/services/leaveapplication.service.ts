import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LeaveapplicationService {

  constructor(private http: HttpClient) { }

  POSTDATA: any = [];
  fromt_date: any;
  applied_leaves(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('tid', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/applied_leaves.php`, POSTDATA)

  }


  leave_types_val(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('tid', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/leave_types.php`, POSTDATA)

  }

  get_all_leave_balance(): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('iEmployeeId', localStorage.getItem('tid'));
    POSTDATA.append('all_leaves', 'Y');
    return this.http.post(`${environment.baseUrl}/teacher_api/show_emp_leave_status.php`, POSTDATA);
  }

  get_leave_balance(leaveId: string): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('iEmployeeId', localStorage.getItem('tid'));
    POSTDATA.append('iLeaveId', leaveId);
    POSTDATA.append('bGetRemainingLeave', '1');
    return this.http.post(`${environment.baseUrl}/teacher_api/show_emp_leave_status.php`, POSTDATA);
  }

  memberleaves_hr(fromdate: string = '', todate: string = '') {
    // const tid = this.authService.getUserId(); // ya jaise baki calls mein use hota hai
    // return this.http.post(
    //   this.baseUrl + 'member_leaves.php',
    //   { fromdate, todate },
    //   { headers: this.headers }
    // );
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();

    POSTDATA.append('fromdate', fromdate);
    POSTDATA.append('todate', todate);

    return this.http.post(`${environment.baseUrl}/teacher_api/member_leaves.php`, POSTDATA)
  }


  updaterecord_respond(Leave_Status: string, id: string, remarks: string = '') {
    let POSTDATA = new FormData();
    POSTDATA.append('Update_Status', 'Y');
    POSTDATA.append('Leave_Status', Leave_Status);
    POSTDATA.append('id', id);
    POSTDATA.append('response_by', localStorage.getItem('tid'));
    POSTDATA.append('remarks', remarks);

    return this.http.post(`${environment.baseUrl}/teacher_api/member_leaves.php`, POSTDATA);
  }

  memberleaves(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('tid', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/member_leaves.php`, POSTDATA)

  }

  updaterecord(leavestatus, id,): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('id', id);
    POSTDATA.append('response_by', localStorage.getItem('tid'));
    POSTDATA.append('Leave_Status', leavestatus);
    POSTDATA.append('Update_Status', 'Y');


    return this.http.post(`${environment.baseUrl}/teacher_api/member_leaves.php`, POSTDATA)
  }












  changeDateFormat_to(date: string) {

    this.fromt_date = date.substring(0, 10).split("-");
    this.fromt_date = this.fromt_date[2] + '-' + this.fromt_date[1] + '-' + this.fromt_date[0];
    console.log('this.fromt_date ==>', this.fromt_date);
    return this.fromt_date;
  }

  //   apply_leave(title,reason,dateParts,dateParts_to)
  //   {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type':  'application/json'
  //       })};
  //     console.log('forrrrr=>',this.changeDateFormat_to(dateParts));

  // this.POSTDATA=
  // {
  //   COMMON_INPUT: {
  //     REQUEST_TIME_STAMP: 1444838717,
  //     DEVICE_SIGNATURE: {
  //       ID: '5dd92df00a90ed065dd92df00a90ed06',
  //       NAME: 'iPhone 5',
  //       OS_VERSION: '10.1',
  //       PLATFORM: 'iOS'
  //     },
  //     APP_VERSION: '1.0.1',
  //     AUTH_KEY: '7c4a8d09ca3762af61e59520943dc987abc654',
  //     API_NAME: 'GET_LEAVES'
  //   },
  //   REQUEST: {
  //     student_master_id: localStorage.getItem('student_master_id'),
  //     title: title,
  //     reason: reason,
  //     from_date: this.changeDateFormat_to(dateParts),
  //     to_date: this.changeDateFormat_to(dateParts_to)
  //   }
  // }

  // console.log('post_circular ==>',this.POSTDATA);

  //     return this.http.post(`${environment.baseUrl}api_leaveapplication/submit`,this.POSTDATA,httpOptions)

  //   }


  apply_leave(title, reason, fromdate, todate): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("fromdate ===>xxxx", fromdate);
    console.log("todate ===>aaaaa", todate);
    let POSTDATA = new FormData();

    POSTDATA.append('title', title);
    POSTDATA.append('reason', reason);
    POSTDATA.append('fromdate', this.changeDateFormat_to(fromdate));
    POSTDATA.append('todate', this.changeDateFormat_to(todate));
    POSTDATA.append('tid', localStorage.getItem('tid'));




    return this.http.post(`${environment.baseUrl}/teacher_api/apply_leave.php`, POSTDATA)
  }

  // ─── leaveapplication.service.ts mein apply_leave() ke baad ye method add karo ───

  edit_leave_hr(leaveAppId: any, reason: string, fromdate: string, todate: string, leaveid: any, leaveDayType: number = 0): Observable<any> {
    console.log("edit fromdate ===>", fromdate);
    console.log("edit todate ===>", todate);

    let POSTDATA = new FormData();

    POSTDATA.append('leave_app_id', leaveAppId);
    POSTDATA.append('leaveid', leaveid);
    POSTDATA.append('reason', reason);
    POSTDATA.append('fromdate', this.changeDateFormat_to(fromdate));
    POSTDATA.append('todate', this.changeDateFormat_to(todate));
    POSTDATA.append('tid', localStorage.getItem('tid'));
    POSTDATA.append('leave_day_type', leaveDayType.toString());

    return this.http.post(`${environment.baseUrl}/teacher_api/edit_leave.php`, POSTDATA);
  }
  apply_leave_hr(title, reason, fromdate, todate, leaveid, leaveDayType: number = 0): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("fromdate ===>xxxx", fromdate);
    console.log("todate ===>aaaaa", todate);
    let POSTDATA = new FormData();

    POSTDATA.append('title', title);
    POSTDATA.append('reason', reason);
    POSTDATA.append('fromdate', this.changeDateFormat_to(fromdate));
    POSTDATA.append('todate', this.changeDateFormat_to(todate));
    POSTDATA.append('tid', localStorage.getItem('tid'));
    POSTDATA.append('leaveid', leaveid);
    POSTDATA.append('leave_day_type', leaveDayType.toString());



    return this.http.post(`${environment.baseUrl}/teacher_api/apply_leave.php`, POSTDATA)
  }
}