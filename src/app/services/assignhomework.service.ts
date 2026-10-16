import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignhomeworkService {
  POSTDATA: any = [];
  constructor(private http: HttpClient) { }



  HomeworkClasses(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/homework.php`, POSTDATA)

  }


  DeleteHomework(homeworkid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('homeworkid', homeworkid);


    return this.http.post(`${environment.baseUrl}/teacher_api/deletehomework.php`, POSTDATA)

  }



  AuthoreList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let POSTDATA = new FormData();
    POSTDATA.append('userid', '');

    return this.http.post(`${environment.baseUrl}/teacher_api/auther_list.php`, POSTDATA)

  }

  AuthorizeArticle(articleid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('articleid', articleid);


    return this.http.post(`${environment.baseUrl}/teacher_api/article_authorize.php`, POSTDATA)

  }


  getSessionList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();

    POSTDATA.append('articleid', '');


    return this.http.post(`${environment.baseUrl}/teacher_api/session_list.php`, POSTDATA)

  }
  getCategoriesBySession(sessid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();

    POSTDATA.append('sessid', sessid);


    return this.http.post(`${environment.baseUrl}/teacher_api/category_list.php`, POSTDATA)

  }

  Deletearticle(articleid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('articleid', articleid);


    return this.http.post(`${environment.baseUrl}/teacher_api/article_attachment.php`, POSTDATA)

  }

  AddComment(articleid, author, commentText): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('articleid', articleid);
    POSTDATA.append('bywhom', author);
    POSTDATA.append('comment', commentText);



    return this.http.post(`${environment.baseUrl}/teacher_api/article_comment_save.php`, POSTDATA)

  }


  ArticleAttachment(articleid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('articleid', articleid);


    return this.http.post(`${environment.baseUrl}/teacher_api/article_attachment.php`, POSTDATA)

  }


  ImageViews(imagecatid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('imagecatid', imagecatid);


    return this.http.post(`${environment.baseUrl}/teacher_api/image_list_for_user.php`, POSTDATA)

  }

  HomeworkSubjects(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/homeworksubjects.php`, POSTDATA)

  }




  HomeworkList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/homeworklist.php`, POSTDATA)

  }



  // offset/limit made optional with defaults, so any existing place in
  // the codebase that still calls NewsList() with no arguments keeps
  // compiling and working exactly as before (offset=0, limit=5 sent).
  // New pagination call site (newsmanager.page.ts) passes both explicitly.
  NewsList(offset: number = 0, limit: number = 5): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));
    POSTDATA.append('offset', offset.toString());
    POSTDATA.append('limit', limit.toString());


    return this.http.post(`${environment.baseUrl}/teacher_api/news_list.php`, POSTDATA)

  }


  // ArticleList(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };

  //   let POSTDATA = new FormData();


  //   POSTDATA.append('teacher_id', localStorage.getItem('tid'));


  //   return this.http.post(`${environment.baseUrl}/teacher_api/article_list.php`, POSTDATA)

  // }
  // service.ts
  ArticleList_Manager(asubid: any = '', searchFilters: any = null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json' // Note: FormData use karte waqt header auto-set hota hai, ise hata sakte hain
      })
    };

    let POSTDATA = new FormData();

    // Common Parameters
    POSTDATA.append('teacher_id', localStorage.getItem('tid') || '');

    // Agar modal se advanced filters aaye hain
    if (searchFilters) {
      POSTDATA.append('text', searchFilters.text || '');
      POSTDATA.append('findIn', searchFilters.findIn || 'title');
      POSTDATA.append('asubid', searchFilters.subjectId === 'all' ? '' : searchFilters.subjectId);
      POSTDATA.append('applyDate', searchFilters.applyDate ? '1' : '0');
      POSTDATA.append('startDate', searchFilters.startDate || '');
      POSTDATA.append('endDate', searchFilters.endDate || '');
      // Agar authorid bhi hai
      POSTDATA.append('authorid', searchFilters.authorid || '');
    } else {
      // Normal Flow (Existing)
      POSTDATA.append('asubid', asubid ? asubid : '');
    }

    return this.http.post(
      `${environment.baseUrl}/teacher_api/article_list_for_manager.php`,
      POSTDATA
    );
  }
  ArticleList(asubid: any = '', searchFilters: any = null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json' // Note: FormData use karte waqt header auto-set hota hai, ise hata sakte hain
      })
    };

    let POSTDATA = new FormData();

    // Common Parameters
    POSTDATA.append('teacher_id', localStorage.getItem('tid') || '');

    // Agar modal se advanced filters aaye hain
    if (searchFilters) {
      POSTDATA.append('text', searchFilters.text || '');
      POSTDATA.append('findIn', searchFilters.findIn || 'title');
      POSTDATA.append('asubid', searchFilters.subjectId === 'all' ? '' : searchFilters.subjectId);
      POSTDATA.append('applyDate', searchFilters.applyDate ? '1' : '0');
      POSTDATA.append('startDate', searchFilters.startDate || '');
      POSTDATA.append('endDate', searchFilters.endDate || '');
      // Agar authorid bhi hai
      POSTDATA.append('authorid', searchFilters.authorid || '');
    } else {
      // Normal Flow (Existing)
      POSTDATA.append('asubid', asubid ? asubid : '');
    }

    return this.http.post(
      `${environment.baseUrl}/teacher_api/article_list.php`,
      POSTDATA
    );
  }
  ArticleList_Old(asubid: any = ''): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();

    POSTDATA.append('teacher_id', localStorage.getItem('tid') || '');

    // agar asubid hai to pass karo warna blank
    POSTDATA.append('asubid', asubid ? asubid : '');

    return this.http.post(
      `${environment.baseUrl}/teacher_api/article_list.php`,
      POSTDATA
    );

  }

  ArticleSubjects(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/article_subject_list.php`, POSTDATA)

  }
  // sessid aur catid default blank rahenge agar nahi bheje gaye
  ImageCategoryList(sessid: any = '', catid: any = ''): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // FormData ke liye content-type set karne ki zaroorat nahi hoti, browser automatically handle karta hai
      })
    };

    let POSTDATA = new FormData();

    // Teacher ID hamesha jayegi
    POSTDATA.append('teacher_id', localStorage.getItem('tid') || '');

    // Agar dropdown se session select hua hai toh bhejien
    if (sessid) {
      POSTDATA.append('sessid', sessid);
    }

    // Agar category select hui hai toh bhejien
    if (catid) {
      POSTDATA.append('catid', catid);
    }

    return this.http.post(`${environment.baseUrl}/teacher_api/category_list.php`, POSTDATA);
  }

  ImageCategoryList_Old(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();

    POSTDATA.append('teacher_id', localStorage.getItem('tid'));


    return this.http.post(`${environment.baseUrl}/teacher_api/category_list.php`, POSTDATA)

  }

  ImageSubCategoryForUser(imagecatid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('imagecatid', imagecatid);



    //return this.http.post(`${environment.baseUrl}/teacher_api/image_category_list.php`, POSTDATA)
    return this.http.post(`${environment.baseUrl}/teacher_api/sub_category.php`, POSTDATA)

  }


  StaffHomeworkAssignedList(apply_date, tid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('apply_date', apply_date);
    POSTDATA.append('tid', tid);


    return this.http.post(`${environment.baseUrl}/teacher_api/staffhomework_data_list.php`, POSTDATA)

  }
  HomeworkData(homeworkid): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let POSTDATA = new FormData();


    POSTDATA.append('homeworkid', homeworkid);


    return this.http.post(`${environment.baseUrl}/teacher_api/homework_data.php`, POSTDATA)

  }


  NewsDropdowns(): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('stuid', '');

    return this.http.post(`${environment.baseUrl}/teacher_api/news_manger_dropdowns.php`, POSTDATA)

  }

  ArticleDropdowns(): Observable<any> {
    let POSTDATA = new FormData();
    //POSTDATA.append('stuid','');
    POSTDATA.append('teacher_id', localStorage.getItem('tid'));

    return this.http.post(`${environment.baseUrl}/teacher_api/article_dropdowns.php`, POSTDATA)

  }

  getsubcategory(imagecatid): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('ImgCat', imagecatid);

    return this.http.post(`${environment.baseUrl}/teacher_api/news_manger_dropdowns.php`, POSTDATA)

  }



  getImagesubcategory(imagecatid): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('image_cat_id', imagecatid);

    return this.http.post(`${environment.baseUrl}/teacher_api/image_sub_category.php`, POSTDATA)

  }



  savenews(title, newstype, imgcatid, ImgSubCat, newsContent, datepost, base64DataArray, descriptions, orientations): Observable<any> {

    let POSTDATA = new FormData();
    POSTDATA.append('subject', title);
    POSTDATA.append('newstype', newstype);
    POSTDATA.append('imgcatid', imgcatid);
    POSTDATA.append('ImgSubCat', ImgSubCat);
    POSTDATA.append('newsContent', newsContent);
    POSTDATA.append('datepost', datepost);
    POSTDATA.append('authorid', localStorage.getItem('tid'));
    POSTDATA.append('loginid', localStorage.getItem('loginid'));
    POSTDATA.append('usertype', localStorage.getItem('utype'));


    POSTDATA.append('base64DataArray', JSON.stringify(base64DataArray));
    POSTDATA.append('descriptions', JSON.stringify(descriptions));
    POSTDATA.append('orientations', JSON.stringify(orientations));


    console.log("subject -->", title);
    console.log("newstype -->", newstype);
    console.log("imgcatid -->", imgcatid);
    console.log("ImgSubCat -->", ImgSubCat);
    console.log("newsContent -->", newsContent);


    return this.http.post(`${environment.baseUrl}/teacher_api/news_manger_save.php`, POSTDATA)

  }

  Image_Save(title1, imagesubcatid, datepost, des, orientations, base64DataArray, isAutoAdjust): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('title', title1);
    POSTDATA.append('imagesubcatid', imagesubcatid);
    POSTDATA.append('imgdate', datepost);
    POSTDATA.append('des', des);
    POSTDATA.append('landscape', orientations);
    if (isAutoAdjust == true) {
      POSTDATA.append('isAutoAdjust', 'Y');
    }
    else {
      POSTDATA.append('isAutoAdjust', 'N');
    }


    POSTDATA.append('attached_file', JSON.stringify(base64DataArray));

    if (localStorage.getItem('utype') == 'TL') {
      POSTDATA.append('utype', 'L');
    }
    else {
      POSTDATA.append('utype', localStorage.getItem('utype'));
    }

    return this.http.post(`${environment.baseUrl}/teacher_api/image_save.php`, POSTDATA)
  }

  //this.title,this.asubid,this.article_send_to,this.public_checked,this.articleContent, 
  //      this.base64DataArray,this.descriptions,this.orientations
  image_manager_cat_save(category): Observable<any> {
    console.log("xcxcxcxcxc", category);
    console.log("loginid -->", localStorage.getItem('loginid'));
    let POSTDATA = new FormData();
    POSTDATA.append('cat_name', category);
    if (localStorage.getItem('utype') == 'TL') {
      POSTDATA.append('utype', 'L');
    }
    else {
      POSTDATA.append('utype', localStorage.getItem('utype'));
    }
    POSTDATA.append('loginid', localStorage.getItem('tid'));

    return this.http.post(`${environment.baseUrl}/teacher_api/image_manager_category_save.php`, POSTDATA)
  }

  get_categories(): Observable<any> {
    let POSTDATA = new FormData();
    POSTDATA.append('sub_cat_name', '');
    return this.http.post(`${environment.baseUrl}/teacher_api/image_category.php`, POSTDATA)
  }

  //
  image_manager_sub_cat_save(subcategory, imagecatid): Observable<any> {
    console.log("subcategory", subcategory);
    console.log("loginid -->", localStorage.getItem('loginid'));
    let POSTDATA = new FormData();
    POSTDATA.append('sub_cat_name', subcategory);
    if (localStorage.getItem('utype') == 'TL') {
      POSTDATA.append('utype', 'L');
    }
    else {
      POSTDATA.append('utype', localStorage.getItem('utype'));
    }
    POSTDATA.append('loginid', localStorage.getItem('tid'));

    POSTDATA.append('imagecatid', imagecatid);


    return this.http.post(`${environment.baseUrl}/teacher_api/image_manager_sub_category_save.php`, POSTDATA)
  }

  article_manager_save(title, asubid, article_send_to, public_checked_display, articleContent, base64DataArray, descriptions, orientations): Observable<any> {

    console.log('here is tidss -->', localStorage.getItem('tid'));

    let POSTDATA = new FormData();
    POSTDATA.append('title', title);
    POSTDATA.append('asubid', asubid);
    POSTDATA.append('article_send_to', article_send_to);

    POSTDATA.append('public', public_checked_display);
    POSTDATA.append('matter', articleContent);

    POSTDATA.append('authorid', localStorage.getItem('tid'));
    POSTDATA.append('loginid', localStorage.getItem('loginid'));
    POSTDATA.append('name', localStorage.getItem('name'));
    if (localStorage.getItem('utype') == 'TL') {
      POSTDATA.append('utype', 'L');
    }
    else {
      POSTDATA.append('utype', localStorage.getItem('utype'));
    }
    POSTDATA.append('base64DataArray', JSON.stringify(base64DataArray));
    POSTDATA.append('descriptions', JSON.stringify(descriptions));
    POSTDATA.append('orientations', JSON.stringify(orientations));


    console.log("subject -->", title);
    return this.http.post(`${environment.baseUrl}/teacher_api/article_manager_save.php`, POSTDATA)

  }
  //   AssignHomework(transid,subid,title,detail,completiondata,base64image,selectedFileNames,homeworkid): Observable<any>
  //   {
  //       const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type':  'application/json'
  //       })};

  //  let POSTDATA = new FormData();


  //  POSTDATA.append('teacher_id',localStorage.getItem('tid'));
  //  POSTDATA.append('transid',transid);
  //  POSTDATA.append('subid',subid);
  //  POSTDATA.append('title',title);
  //  POSTDATA.append('detail',detail);
  //  POSTDATA.append('completiondate',completiondata);
  //  POSTDATA.append('attached_file',JSON.stringify(base64image));
  //  POSTDATA.append('selectedFileNames',selectedFileNames);
  //  POSTDATA.append('homeworkid',homeworkid);

  //  console.log("teacher_id Here ==>",localStorage.getItem('tid'));
  //  console.log("transid Here ==>",transid);

  //  console.log("subid Here ==>",subid);
  //  console.log("title Here ==>",title);
  //  console.log("detail Here ==>",detail);
  //  console.log("completiondate Here ==>",completiondata);
  //  console.log("base64image Here ==>",base64image);
  //  console.log("selectedFileNames Here ==>",selectedFileNames);



  //      return this.http.post(`${environment.baseUrl}/teacher_api/homeworksave.php`,POSTDATA)

  //    }



  AssignHomework(transid, subid, title, detail, completiondata, base64image, selectedFileNames, homeworkid): Observable<any> {
    //   const httpOptions = {
    // headers: new HttpHeaders({
    //   'Content-Type':  'application/json'
    // })};

    let POSTDATA = new FormData();


    POSTDATA.append('teacher_id', localStorage.getItem('tid'));
    POSTDATA.append('transid', transid);
    POSTDATA.append('subid', subid);
    POSTDATA.append('title', title);
    POSTDATA.append('detail', detail);
    POSTDATA.append('completiondate', completiondata);
    POSTDATA.append('attached_file', JSON.stringify(base64image));
    POSTDATA.append('selectedFileNames', selectedFileNames);
    POSTDATA.append('homeworkid', homeworkid);


    console.log("teacher_id Here ==>", localStorage.getItem('tid'));
    console.log("transid Here ==>", transid);

    console.log("subid Here ==>", subid);
    console.log("title Here ==>", title);
    console.log("detail Here ==>", detail);
    console.log("completiondate Here ==>", completiondata);
    console.log("base64image Here ==>", base64image);
    console.log("selectedFileNames Here ==>", selectedFileNames);



    //return this.http.post(`${environment.baseUrl}/teacher_api/homeworksave.php`,POSTDATA)
    //  return this.http.post(`http://192.168.2.4/development/school/vps/homeworksave.php`,POSTDATA)
    return this.http.post(`${environment.baseUrl}/teacher_api/homeworksave.php`, POSTDATA)

    // return this.http.post(`https://shantiniketan.literom.com/homeworksave.php`,POSTDATA)
  }
}