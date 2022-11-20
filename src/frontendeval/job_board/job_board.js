import React from "react";

class JobBoard extends React.Component {
  constructor() {
    super();
    this.JobIdList = [];
    this.jobIdsApi = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    this.jobDetailApi = "https://hacker-news.firebaseio.com/v0/item/";
    this.fetchMoreOffset = 0;
    this.fetchMoreLimit = 6;
    this.fetchMoreJobIds = this.fetchMoreJobIds.bind(this);
    this.state = {
      showLoadMoreBtn: false
    }
  }

  // functionality

  componentDidMount() {
    this.fetchAllJobIdsSetFirst9Jobs();
  }

  getApiFromJobId(jobId) {
    const thisApi = this.jobDetailApi + jobId + '.json'
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
        this.JobIdList = r.map(i => i);
        this.fetchSetTopNJobDetails(0, 9);
      })
      .catch(e => { console.log(e) });
  }

  fetchSetTopNJobDetails(offset, limit) {
    const updateOffset = () => { this.fetchMoreOffset = offset + limit }
    const setJobData=(data)=> {this.setJobBatchDetails(data,offset)}
    const updateShowMoreBtn = () => {
      let flag = this.fetchMoreOffset < this.JobIdList.length;
      this.setState({ showLoadMoreBtn: flag })
    }

    

    let top9JobIds = [];
    for (let i = offset; i < offset + limit && i<this.JobIdList.length; i++) {
      top9JobIds.push(this.JobIdList[i]);
    }
    Promise.all(top9JobIds.map(jId => {
      return fetch(this.getApiFromJobId(jId));
    }))
      .then(responses => {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      })
      .then(setJobData)
      .then(updateOffset)
      .then(updateShowMoreBtn);
  }

  //setting

  setJobBatchDetails(data,offset){
    const getJobCardInnerHtml=(job)=>this.jobCard(job);
    let id = offset;
    const elems = document.getElementsByClassName("jb_list");
    const elem = elems[0];
    let batch = document.createElement("div");
    batch.setAttribute('className', 'jb_batch');
    batch.setAttribute('key', id);
    batch.style.gap = '20px';
    batch.style.display='flex';
    batch.style.flexWrap = 'wrap';
    for (let i = 0; i < data.length; i++) {
      const job = data[i];
      let jobCard = document.createElement('div');
      jobCard.setAttribute('className',"jb_card");
      jobCard.setAttribute('key',job.id);
      jobCard.addEventListener('click',()=>{if(job.url) window.open(job.url);})
      jobCard.innerHTML = getJobCardInnerHtml(job);
      jobCard.style.border='1px solid black';
      jobCard.style.width = '200px';
      jobCard.style.height ='100px'
      
      batch.appendChild(jobCard);
    }
    elem.appendChild(batch);
  }

  //rendering

  jobCard(job) {
    const onClickJobCard = ()=>{
      if(job.url) window.open(job.url);
    }

    if (job && job.id) {
      let s=job.title;
      let splitArr;
      if(s.includes("Is")){
        splitArr = s.split("Is")
      }
      else if(s.includes("is")){
        splitArr=s.split("is");
      }
      else{
        splitArr=s.split(")")
      }
      let jobTitle = splitArr[0];
      let jobDesc = "Is"+ splitArr[1];
      return `<div className="jb_card_wrapper">
        <div className="jb_card_title">${jobTitle}</div>
        <div className="jb_card_desc">${jobDesc}</div>
      </div>`;

    }
    return `<div className="jb_card_wrapper">Job Not Found</div>`;
  }

  getLoadMoreButton() {
    if (this.state.showLoadMoreBtn) {
      return (<button onClick={this.fetchMoreJobIds}>Load More</button>);
    }
  }

  render() {
    return (
      <div className="job_board">
        <div className="jb_title">HN Jobs</div>
        <div className="jb_list"></div>
        <div className="jb_load_more">
          {this.getLoadMoreButton()}
        </div>
      </div>
    );
  }
}

export { JobBoard };
