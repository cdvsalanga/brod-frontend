import React from "react";
import "../styles/JobAd.css";
import { Heart, MapPin, Star } from "lucide-react";
import CardImage from "../assets/images/card-image.png";
import HeroImage from "../assets/images/hero-image.png";
import Services from "../assets/images/services-header-background.png";

const JobAdDetails = () => {
  return (
    <div className="job-details">
      <div className="job-ad-mb-40">
        <div className="job-ad-mb-24">
          <div className="flex-between job-ad-mb-12">
            <div className="job-type">Painting</div>
            <div className="flex-center">
              <Heart className="job-heart" />
              <span className="job-fav">Favorite</span>
            </div>
          </div>
          <h1 className="job-h1 job-ad-mb-24">All-Around Painting Services</h1>
        </div>
        <div>
          <div className="job-ad-mb-24">
            Transform your home with the touch of a dedicated and skilled
            painter. I’m Yves, a professional painter with 7 years of
            experience, offering personalized house painting services tailored
            to your unique needs. Whether you're looking to refresh a single
            room or update the entire exterior, I bring a meticulous approach to
            every project.
          </div>
          <div className="job-ad-mb-24">My Services Include:</div>
          <ul className="job-ad-mb-24 job-ad-ul">
            <li className="job-ad-mb-8">
              Interior Painting: I provide clean, detailed interior painting
              services, using high-quality paints to create the perfect
              atmosphere in your home.
            </li>
            <li className="job-ad-mb-8">
              Exterior Painting: Protect and enhance your home’s curb appeal
              with durable exterior painting that stands up to the elements.
            </li>
            <li className="job-ad-mb-8">
              Color Consultation: Not sure what color to choose? I’ll help you
              select the perfect shades that complement your style and space.
            </li>
            <li className="job-ad-mb-8">
              Surface Preparation: From repairing small cracks to sanding and
              priming, I handle all prep work to ensure a smooth, long-lasting
              finish.
            </li>
            <li>
              Attention to Detail: Every brushstroke is carefully applied,
              ensuring a flawless finish that reflects my commitment to quality.
            </li>
          </ul>
          <div className="job-ad-mb-24">Why Choose Me?</div>
          <ul className="job-ad-mb-24 job-ad-ul">
            <li className="job-ad-mb-8">
              One-on-One Service: As a solo painter, I provide personalized
              attention to every project, ensuring that your vision is realized.
            </li>
            <li className="job-ad-mb-8">
              Reliable and On-Time: I value your time and work efficiently to
              complete projects on schedule, without compromising quality.
            </li>
            <li>
              Customer Satisfaction: Your happiness is my priority. I work
              closely with you from start to finish to ensure you’re delighted
              with the results.
            </li>
          </ul>
          <div>
            Bring your home to life with a fresh coat of paint. Contact me today
            for a free consultation, and let’s make your home a place you love
            even more.
          </div>
        </div>
      </div>
      <div className="job-ad-mb-40 job-line" />
      <div className="job-ad-mb-40">
        <h1 className="job-h1 job-ad-mb-24">Project Gallery</h1>
        <img src={CardImage} className="job-big-img job-ad-mb-24" />
        <div className="job-sm-images">
          <img src={CardImage} className="job-sm-img" />
          <img src={HeroImage} className="job-sm-img" />
          <img src={Services} className="job-sm-img" />
        </div>
      </div>
      <div className="job-ad-mb-40 job-line" />
      <div className="job-ad-mb-24">
        <h1 className="job-h1 job-ad-mb-24">Reviews</h1>
        <div className="job-review">
          <div className="flex-between job-ad-mb-8">
            <div className="flex-center">
              <div className="job-review-avatar">SC</div>
              <div className="job-review-name">Sean C.</div>
            </div>
            <div className="job-review-stars">
              <Star color="#1F1F23" fill="#1F1F23" />
              <Star color="#1F1F23" fill="#1F1F23" />
              <Star color="#1F1F23" fill="#1F1F23" />
              <Star color="#1F1F23" fill="#1F1F23" />
              <Star color="#1F1F23" fill="#1F1F23" />
            </div>
          </div>
          <div>
            <div className="job-review-type job-ad-mb-8">
              All-Around Painting Services
            </div>
            <div className="flex-center job-review-location job-ad-mb-12">
              <MapPin width={20} height={20} color="#8C8C8C" />
              Sydney, NSW 2000
            </div>
            <div className="job-review-text">
              Yves did an incredible job painting our home! The attention to
              detail was impeccable, and the entire process was smooth and
              professional from start to finish. Yves helped us choose the
              perfect colors, and the final result exceeded our expectations.
              Our home looks brand new! I highly recommend Yves for anyone
              needing top-quality painting services. Thank you, Yves, for
              transforming our space!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAdDetails;
