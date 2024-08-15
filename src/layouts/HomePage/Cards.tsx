export const Cards = () => {
    return (
        <div className="container">
        <div className="row">
            <div>
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/patient-care.png")} className="card-img-top img-fluid" alt="patient care" />
                                <h2 className="card-title">Patient-Centered Care</h2>
                                <p className="card-text">We prioritize your well-being and strive to deliver personalized care tailored to your unique health needs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/team.png")} className="card-img-top img-fluid" alt="team" />
                                <h2 className="card-title">Expert Team</h2>
                                <p className="card-text">Our team of experienced physicians and healthcare professionals is committed to delivering the highest standard of medical care.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/community-engagement.png")} className="card-img-top img-fluid" alt="Community Engagement" />
                                <h2 className="card-title">Community Engagement</h2>
                                <p className="card-text">Proudly serving Port Hupree and surrounding areas, we are an integral part of the community.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 my-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/technology.png")} className="card-img-top img-fluid" alt="Technology" />
                                <h2 className="card-title">Advanced Technology</h2>
                                <p className="card-text">Utilizing state-of-the-art technology and innovative treatments to ensure the best possible outcomes for our patients.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/patient-appointment.png")} className="card-img-top img-fluid" alt="Patient Appointment" />
                                <h2 className="card-title">Appointment Convenience</h2>
                                <p className="card-text">Schedule your appointment easily online or by phone, and let us take care of the rest.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-4">
                        <div className="card">
                            <div className="card-body">
                                <img src={require("../../Images/PublicImages/quality.png")} className="card-img-top img-fluid" alt="Quality Control" />
                                <h2 className="card-title">Commitment to Quality</h2>
                                <p className="card-text">We adhere to rigorous quality standards to ensure your safety and satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}