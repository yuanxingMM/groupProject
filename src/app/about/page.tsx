import './aboutStyle.css';
import Image from 'next/image';
const About = () => {

    return (
        <div className='con'>
            <section className="about">
                <h1>About Us</h1>
                <h2>Our Mission : Healthy lifestyle and convenience makes life easier</h2>
                <div className="about-info">
                    <div className="about-img">
                        <Image src="/images/logo.jpg" alt=""
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div>
                        <p><strong>小崗村生活雜貨</strong></p>
                        <p>Our online Glocery provides you with a wide range of quality goods sourced from all over the world.
                            Here is a platform for your goods selection anywhere and anytime at a very competitive price.
                            Delivery will be made within 2 days after order being placed. Free delivery for every purchase over
                            HK$300. There are also 30 grocery stores located in Hong Kong Island, Kowloon and the New
                            Territories for your selection of wine, food, snacks, hair care products and so on. The glocery
                            stores generally open for 12 hours a day from 10am to 10pm every day.</p>
                        <button className='_button'>Order here</button>
                    </div>
                </div>
            </section>

            <section className="team">
                <h1>Our Products</h1>
                <div className="team-cards">


                    <div className="card">
                        <div className="card-img">
                            <Image src="/images/wine_1.jpg" alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">酒類</h2>
                            <p className="card-role">對酒當歌，人生幾何？</p>
                            <p><button className="_button">For More</button></p>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-img">
                            <Image src="/images/cookies_1.jpg" alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">曲奇餅</h2>
                            <p className="card-role">超過150款曲奇供你享用</p>
                            <p><button className="_button">For More</button></p>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-img">
                            <Image
                                src="/images/shampoo_1.jpg"
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">洗髮護髮產品</h2>
                            <p className="card-role">適當洗髮護髮產品，呵護你的頭髮</p>
                            <p><button className="_button">For More</button></p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-img">
                            <Image src="/images/pasta_1.jpg" alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className="card-info">
                            <h2 className="card-name">義大利粉</h2>
                            <p className="card-role">美味意粉，人生滿足</p>
                            <p><button className="_button">For More</button></p>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default About;