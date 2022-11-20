import React from "react";

class JobBoard extends React.Component {
  constructor() {
    super();
    this.JobIdList = [];
    this.jobIdsApi = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    this.jobDetailApi = "https://hacker-news.firebaseio.com/v0/item/";
    this.fetchMoreOffset = 9;
    this.fetchMoreLimit = 6;
    this.lastFilled = null;
  }

  // functionality

  componentDidMount() {
      this.fetchAllJobIdsSetFirst9Jobs();
  }

  getApiFromJobId(jobId) {
    const thisApi = this.jobDetailApi + jobId + '.json'
    console.log(thisApi);
    return thisApi;
  }

  // fetching

  fetchMoreJobIds() {
    this.fetchSetTopNJobDetails(this.fetchMoreOffset, this.fetchMoreLimit);
  }

  fetchAllJobIdsSetFirst9Jobs() {
    this.fetchJobIdList();
  }

  fetchJobIdList() {
    fetch(this.jobIdsApi)
      .then(r => r.json())
      .then(r => {
        console.log("JobIds: ", r);
        this.JobIdList = r.map(i => i);
        this.fetchSetTopNJobDetails(0, 9);
      })
      .catch(e => { console.log(e) });
  }

  fetchSetTopNJobDetails(offset, limit) {
    let top9JobIds = [];
    for (let i = offset; i < offset + limit; i++) {
      top9JobIds.push(this.JobIdList[i]);
    }
    console.log(top9JobIds);
    Promise.all(top9JobIds.map(jId => {
      return fetch(this.getApiFromJobId(jId));
    }))
      .then(responses => {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      })
      .then(function (data) {
        let id=offset;
        const elems = document.getElementsByClassName("jb_list");
        const elem = elems[0];
        console.log(elem);
        if(this.lastFilled===id){
          return
        }
        let batch = document.createElement("div");
        batch.setAttribute('class', 'jb_batch');
        batch.setAttribute('key', id);
        for (let i = 0; i < data.length; i++) {
          const job = data[i];
          let jobCard = document.createElement('div');
          jobCard.setAttribute('className', "jb_card")
          jobCard.setAttribute('key', job.id)
          jobCard.innerHTML = `${job.by}`
          batch.appendChild(jobCard);
        }
        elem.appendChild(batch);
        
        return 
      }).then(()=>{
        this.lastFilled=id;
        this.fetchMoreOffset = offset + limit;
      });
  }

  //setting

  //rendering

  jobCard(job) {
    if (job && job.id) {
      return (<div className="jb_card" key={job.id}>JobDetails
        <div className="jb_card_title">{job.by}</div>
        <div className="jb_card_description">{job.title}</div>
      </div>);
    }
    return (
      <div claissName="jb_card">
        Job Not Found
      </div>
    );
  }

  render() {
    return (
      <div className="job_board">
        <div className="jb_title">HN Jobs</div>
        <div className="jb_list"></div>
      </div>
    );
  }
}

export { JobBoard };
