export const Intro = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9">
                    <section className="main">
                        <h2>Welcome to Port Hupree Medical Center</h2>
                        <p>At Port Hupree Medical Center, we are dedicated to providing exceptional medical care with compassion and expertise.</p>
                        <p>Explore our comprehensive range of medical services designed to meet your healthcare needs.</p>
                    </section>
                </div>
                <div className="col-lg-3">
                    <aside className="bg-light p-3">
                        <h2>Latest News</h2>
                        <ul className="list-unstyled">
                            <li><a href="#">New Research Findings</a></li>
                            <li><a href="#">Upcoming Health Seminars</a></li>
                            <li><a href="#">Community Health Fair</a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    )
}