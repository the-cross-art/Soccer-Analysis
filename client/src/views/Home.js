import React from "react";
import {
  Jumbotron,
  NewArrivals,
  BestSellers,
  CategoryList,
  SubcategoryList,
  Feature,
  Testimonial,
  Banner,
  Footer,
  BannerF
} from "../components";
import TeamSelection from "../components/home/TeamSelection";
import './Home.css';

const Home = () => {
  return (
    <>
      <div id="home" className="hero-section img-bg">
      <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content-wrapper">
                            <h1 className="wow fadeInDown" data-wow-delay=".4s" data-wow-duration="1.3s">Focus More on Work & become a smarter in scouting!</h1>
                            <p className="wow fadeInLeft" data-wow-delay=".6s" data-wow-duration="1.3s">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
                            <a href="#features" class="theme-btn wow fadeInUp" data-wow-delay=".8s" data-wow-duration="1.3s">Explore Features</a>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="hero-img">
                            <img  className="wow fadeInRight" data-wow-delay=".4s" data-wow-duration="1.3s" src="assets/img/hero/hero-img.png" alt="" />
                            <img src="assets/img/hero/hero-shape.svg" alt="" class="shape" />
                        </div>
                    </div>
                </div>
            </div>
      </div>

      
      <Feature />
      <br/>
      <Banner />
      <br />
      <Testimonial />
      <br />
      <br />
      <BannerF />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Home;
