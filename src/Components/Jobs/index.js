// import React, {Component} from 'react'
// import Loader from 'react-loader-spinner'
// import Cookies from 'js-cookie'
// import {BsSearch} from 'react-icons/bs'
// import Header from '../Header'
// import JobItem from '../JobItem'

// import './index.css'

// const employmentTypesList = [
//   {
//     label: 'Full Time',
//     employmentTypeId: 'FULLTIME',
//   },
//   {
//     label: 'Part Time',
//     employmentTypeId: 'PARTTIME',
//   },
//   {
//     label: 'Freelance',
//     employmentTypeId: 'FREELANCE',
//   },
//   {
//     label: 'Internship',
//     employmentTypeId: 'INTERNSHIP',
//   },
// ]

// const salaryRangesList = [
//   {
//     salaryRangeId: '1000000',
//     label: '10 LPA and above',
//   },
//   {
//     salaryRangeId: '2000000',
//     label: '20 LPA and above',
//   },
//   {
//     salaryRangeId: '3000000',
//     label: '30 LPA and above',
//   },
//   {
//     salaryRangeId: '4000000',
//     label: '40 LPA and above',
//   },
// ]
// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }
// const profileStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// export class Jobs extends Component {
//   state = {
//     jobListArray: [],
//     profileDetails: [],
//     isLoadingProfile: false,
//     apiStatus: apiStatusConstants.initial,
//     profileStatus: profileStatusConstants.initial,
//     salary: '',
//     employmentType: [],
//     searchInput: '',
//   }

//   componentDidMount() {
//     this.getProfileDetails()
//     this.getJobListArray()
//   }

//   getJobListArray = async () => {
//     this.setState({
//       apiStatus: apiStatusConstants.inProgress,
//     })
//     const {searchInput, salary, employmentType} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salary}&search=${searchInput}`
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }
//     const data = await fetch(url, options)
//     console.log(data)
//     if (data.ok === true) {
//       const response = await data.json()
//       const fetchedData = response.jobs.map(eachItem => ({
//         companyLogoUrl: eachItem.company_logo_url,
//         id: eachItem.id,
//         employmentType: eachItem.employment_type,
//         jobDescription: eachItem.job_description,
//         location: eachItem.location,
//         packagePerAnnum: eachItem.package_per_annum,
//         rating: eachItem.rating,
//         title: eachItem.title,
//       }))
//       this.setState({
//         jobListArray: fetchedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({
//         apiStatus: apiStatusConstants.failure,
//       })
//     }
//   }

//   getProfileDetails = async () => {
//     this.setState({profileStatus: profileStatusConstants.inProgress})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = 'https://apis.ccbp.in/profile'
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }
//     const data = await fetch(url, options)
//     if (data.ok === true) {
//       const response = await data.json()
//       const fetchedData = response.profile_details
//       const updatedData = {
//         profileImageUrl: fetchedData.profile_image_url,
//         name: fetchedData.name,
//         shortBio: fetchedData.short_bio,
//       }
//       this.setState({
//         profileDetails: updatedData,
//         profileStatus: profileStatusConstants.success,
//       })
//     } else {
//       this.setState({
//         profileStatus: profileStatusConstants.failure,
//       })
//     }
//   }

//   onChangeSalary = event => {
//     this.setState({salary: event.target.value}, this.getJobListArray)
//   }

//   onClickSearch = () => {
//     this.getJobListArray()
//   }

//   onRenderProfile = () => {
//     this.getProfileDetails()
//   }

//   onChangeSearch = event => {
//     this.setState({searchInput: event.target.value})
//   }

//   onChangeEmploymentType = event => {
//     const {employmentType} = this.state
//     const inputNotInList = employmentType.filter(
//       eachItem => eachItem === event.target.id,
//     )
//     if (inputNotInList.length === 0) {
//       this.setState(
//         prevState => ({
//           employmentType: [...prevState.employmentType, event.target.id],
//         }),
//         this.getJobListArray,
//       )
//     } else {
//       const filteredData = employmentType.filter(
//         eachItem => eachItem !== event.target.id,
//       )
//       this.setState(
//         prevState => ({
//           employmentType: filteredData,
//         }),
//         this.getJobListArray,
//       )
//     }
//   }

//   renderPrimeDealsFailureView = () => (
//     <div>
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
//         alt="failure view"
//         className="failure-view"
//       />
//       <h1>Oops! Something Went Wrong</h1>
//       <p>We cannot seem to find the page you are looking for</p>
//       <button type="button" onClick={this.onClickSearch}>
//         Retry
//       </button>
//     </div>
//   )

//   renderLoadingView = () => (
//     <div className="products-loader-container" data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </div>
//   )

//   renderJobsList = jobListArray => (
//     <div>
//       <ul style={{listStyleType: 'none', padding: 0}}>
//         {jobListArray.map(eachItem => (
//           <JobItem job={eachItem} key={eachItem.id} />
//         ))}
//       </ul>
//     </div>
//   )

//   renderProfileDetails = profileDetails => (
//     <div className="profile-container">
//       <img
//         src={profileDetails.profileImageUrl}
//         alt="profile"
//         className="profile-image"
//       />
//       <h1 className="profile-name">{profileDetails.name}</h1>
//       <p className="profile-description">{profileDetails.shortBio}</p>
//     </div>
//   )

//   renderProfileFailureView = () => (
//     <div>
//       <button type="button" onClick={this.onRenderProfile}>
//         Retry
//       </button>
//     </div>
//   )

//   renderJob = () => {
//     const {apiStatus, jobListArray} = this.state
//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderJobsList(jobListArray)
//       case apiStatusConstants.failure:
//         return this.renderJobsFailureView()
//       case apiStatusConstants.inProgress:
//         return this.renderLoadingView()
//       default:
//         return null
//     }
//   }

//   renderProfile = () => {
//     const {apiStatus, profileDetails} = this.state
//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderProfileDetails(profileDetails)
//       case apiStatusConstants.failure:
//         return this.renderProfileFailureView()
//       case apiStatusConstants.inProgress:
//         return this.renderLoadingView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Header />
//         <div className="job-container">
//           <div className="job-sidebar">
//             {this.renderProfile()}
//             <hr style={{width: '100%'}} />
//             <div className="filter-container">
//               <h1 className="filter-heading">Type of Employment</h1>
//               <ul className="filter-ul">
//                 {employmentTypesList.map(eachItem => (
//                   <li className="filter-li" key={eachItem.employmentTypeId}>
//                     <input
//                       value={eachItem.employmentTypeId}
//                       type="checkbox"
//                       onChange={this.onChangeEmploymentType}
//                       id={eachItem.employmentTypeId}
//                     />
//                     <label
//                       className="filter-label"
//                       htmlFor={eachItem.employmentTypeId}
//                     >
//                       {eachItem.label}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <hr style={{width: '100%'}} />
//             <div className="filter-container">
//               <h1 className="filter-heading">Salary Range</h1>
//               <ul className="filter-ul" onChange={this.onChangeSalary}>
//                 {salaryRangesList.map(eachItem => (
//                   <li className="filter-li" key={eachItem.salaryRangeId}>
//                     <input
//                       name="salary"
//                       value={eachItem.salaryRangeId}
//                       type="radio"
//                       id={eachItem.salaryRangeId}
//                     />
//                     <label
//                       className="filter-label"
//                       htmlFor={eachItem.salaryRangeId}
//                     >
//                       {eachItem.label}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="job-list">
//             <div className="search-container">
//               <input
//                 type="search"
//                 className="search-input"
//                 placeholder="Search"
//                 onChange={this.onChangeSearch}
//               />
//               <button
//                 className="search-button"
//                 type="button"
//                 data-testid="searchButton"
//                 onClick={this.onClickSearch}
//               >
//                 <BsSearch className="search-icon" color="white" />
//               </button>
//             </div>
//             {this.renderJob()}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Jobs
import Header from '../Header'
import JobProfileSection from '../JobProfileSection'
import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="job-profile-container">
      <JobProfileSection />
    </div>
  </>
)

export default Jobs
