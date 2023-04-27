import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

export class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          <div className="home-sub-container">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button className="home-button">Find Jobs</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
