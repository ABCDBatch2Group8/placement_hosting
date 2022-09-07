import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { StudAuthService } from '../stud-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-shortlist',
  templateUrl: './job-shortlist.component.html',
  styleUrls: ['./job-shortlist.component.css']
})
export class JobShortlistComponent implements OnInit {

  Passout: Number = 0;
  skillsReq: any = 0;
  courseInICT: String = " ";

  skilsList: Array<any> = [];
  skils: Array<any> = [];
  // skilstore: Array<Object> = [{item_num: 0,item_text:''}]
  // skil1 = {item_num: Number,item_text:String};
  skilstore = [{item_num: Number,item_text:String}];


  constructor(private jobService: JobService, private auth: StudAuthService, private router: Router) { }

  // *********************query1


  // params = new HttpParams()
  // .set ('jobId'," ")
  // .set ( 'yop', 0)
  //******************* Query1

  // ************************query2
  //  readonly params = new HttpParams()

  //  .set('jobId','6310e2fca086dd21ce2f2a0e')
  //  .set('course','Cyber Security Analyst')
  // ************************query2

  // ************************query3
  // sel_skills = JSON.stringify(['express','react','mongodb'])
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')

  // ************************query3

  // ************************query4
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)
  // .set('course','Cyber Security Analyst')

  // ************************query4
  // ************************query5
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)

  // ************************query5

  // ************************query6
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set('course','Cyber Security Analyst')

  // ************************query6

  // ************************query7
  // readonly params = new HttpParams()
  // .set('jobId','6310e2fca086dd21ce2f2a0e')
  // .set ( 'yop', 2017)
  // .set('course','Cyber Security Analyst')


  // ************************query7
  Course = [{
    course: '',
    category: ''
  }]

  shortlistData = [{
    ICTAKscore : 0,
    YearOfPassout: 0,
    careerBreak: '',
    courseInICTAK: '',
    employmentStatus: '',
    qualification: '',
    skills:Array<any>,
    stream:''

  }]
  shortlistData1 = {
    ICTAKscore : 0,
    YearOfPassout: 0,
    careerBreak: '',
    courseInICTAK: '',
    employmentStatus: '',
    qualification: '',
    skills:Array<Object>,
    stream:''
  }
  // courseInICT: String = '';

  ngOnInit(): void {
    this.auth.course().subscribe((data: any) => {
      this.Course = JSON.parse(JSON.stringify(data));
      console.log(data)
    })
  }

  public onOptionsSelected1(event: any) {
    const value1 = event.target.value;

    this.Passout = value1;
    console.log("value1 is", value1);
  }
  public onOptionsSelected2(event: any) {
    const value2 = event.target.value;
    this.courseInICT = value2;
    console.log("value2 is", value2);
  }

  public onOptionsSelected3(event: any) {
    const value3 = event.target.value;
    this.skillsReq = value3;
    console.log("value3 is", value3);
  }

  checkOptions() {
    var jobid = localStorage.getItem("JobId");
    var passout = this.Passout.toString();
    var course = this.courseInICT
    console.log("passout is", this.Passout)
    console.log("course is", this.courseInICT)
    console.log("skill is", this.skillsReq)

    switch (this.Passout) {
      case 0:
        console.log("here")
        switch (true) {
          case (this.courseInICT === " "):
            console.log("hello")
            if (this.skillsReq == 1) {
              console.log("Only skill")
              this.query3(jobid);
            }
            break;
          default:
            // case (this.courseInICT != " "):
            if (this.skillsReq == 0) {
              console.log(" Only course")
              this.query2(jobid,course);
            }
            if (this.skillsReq == 1) {
              console.log("Course and skill")
              this.query6(jobid,course);
            }
            break;
        }

        break;
      default:
        switch (true) {
          case (this.courseInICT === " "):
            console.log("hello")
            if (this.skillsReq == 0) {
              console.log("Only Passout")
              this.query1(jobid,passout);
            }
            if (this.skillsReq == 1) {
              console.log("Passout and  skill")
              this.query5(jobid,passout);
            }
            break;
          default:
            // case (this.courseInICT != " "):
            if (this.skillsReq == 0) {
              console.log(" Passout and course")
              this.query4(jobid,passout,course);
            }
            if (this.skillsReq == 1) {
              console.log("Passout,Course and skill")
              this.query7(jobid,passout,course);
            }
            break;
        }

        break
    }
  }

query1(jobid:any,passout:any){
  let params = new HttpParams()
  .set ("jobId", jobid)
  .set ( "yop", passout)
      console.log("params is ",params)
      this.jobService.year_shortlist(params)
      .subscribe((data:any)=>{
        this.shortlistData = JSON.parse(JSON.stringify(data));
        console.log("shortlisted", this.shortlistData)
        for (let i=0;i<this.shortlistData.length;i++){
             console.log("data1",this.shortlistData[i].skills) 
          for (let j=0;j<this.shortlistData[i].skills.length;j++){
            this.skils.push(this.shortlistData[i].skills[j].item_text)
          }
          console.log("skils",this.skils);
          this.skilsList[i] = this.skils.join()
          console.log("skilList",this.skilsList)
          this.skils=[]
        }
        })

}

//     //*********************query2 */
    query2(jobid:any,course:any){
        let params = new HttpParams()
        .set("jobId", jobid)
        .set("course", course)
      console.log("params is",params)
      this.jobService.course_shortlist(params).subscribe((data:any)=>{
      this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
      })
    }
//     //*********************query2 */

//     //*********************query3 */
        query3(jobid: any){
            let params = new HttpParams()
            .set("jobId", jobid)
      console.log("params is",params)
      this.jobService.skill_shortlist(params).subscribe((data:any)=>{
        this.shortlistData = JSON.parse(JSON.stringify(data));
        console.log("shortlisted", this.shortlistData)
      })
      }

//     //*********************query3 */

//     //*********************query4 */
    query4(jobid:any,passout:any,course:any){
      let params = new HttpParams()
      .set ("jobId", jobid)
      .set ( "yop", passout)
      .set ("course", course)
      console.log("params is",params)
      this.jobService.cy_shortlist(params).subscribe((data:any)=>{
      console.log("shortlisted", data)
      this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
      })
    }

//     //*********************query4 */

//     //*********************query5 */
    query5(jobid:any,passout:any){
      let params = new HttpParams()
      .set ("jobId", jobid)
      .set ( "yop", passout)
    console.log("params is",params)
    this.jobService.ys_shortlist(params).subscribe((data:any)=>{
    console.log("shortlisted", data)
    this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
      this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
    })
  }
//     //*********************query5 */

//     //*********************query6 */
    query6(jobid:any,course:any){
      let params = new HttpParams()
        .set ("jobId", jobid)
        .set ( "course", course)
      console.log("params is",params)
      this.jobService.sc_shortlist(params).subscribe((data:any)=>{
      console.log("shortlisted", data)
      this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
      this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
      })
    }

//     //*********************query6 */

//     //*********************query7 */
    query7(jobid:any,passout:any,course:any){
      let params = new HttpParams()
      .set ("jobId", jobid)
      .set ( "yop", passout)
      .set( "course", course)
    console.log("params is",params)
    this.jobService.ysc_shortlist(params).subscribe((data:any)=>{
    console.log("shortlisted", data)
    this.shortlistData = JSON.parse(JSON.stringify(data));
      console.log("shortlisted", this.shortlistData)
    })
    }

//     //*********************query7 */

}
