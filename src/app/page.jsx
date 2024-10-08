import Image from "next/image";
import './localstyles.css'

export default function Home() {
  return (
    <>
      <main className="container h-100 ps-2 pt-0 pe-0 pb-0">
        <div className="row h-100 p-0">
          <header className="col-12 order-first fs-1 align-content-center">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span id="blink1">小崗村生活雜貨 </span><span id="blink2">生</span><span id="blink3">活</span><span id="blink4">美</span><span id="blink5">好</span>
              <a id="sign-in" href="china_taiwan" className="btn btn-info fs-5" role="button">會員登入/登記</a>
            </div>
          </header>
          <div id="stuff" className="col-12">
            <div className="row h-100 p-0">
              <section className="col-sm-9 align-content-center">
                <div id="carouselCategories" className="carousel slide carousel-fade"  data-bs-ride="carousel">
                  <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselCategories" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselCategories" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselCategories" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      <button type="button" data-bs-target="#carouselCategories" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  </div>
                  <div className="carousel-inner">
                    <div id="wine" className="carousel-item active">
                      <img src="images/wine_1.jpg" className="carouselImage d-block w-100" alt="酒類"/>
                      <div className="carousel-caption d-none d-md-block">
                          <h1 className="fs-1"><strong>酒類</strong></h1>
                      </div>
                    </div>
                    <div id="cookies" className="carousel-item">
                      <img  src="images/cookies_1.jpg" className="carouselImage d-block w-100" alt="曲奇餅"/>
                      <div className="carousel-caption d-none d-md-block">
                          <h1 className="fs-1"><strong>曲奇餅</strong></h1>
                      </div>
                    </div>
                    <div id="shampoo" className="carousel-item">
                      <img src="images/shampoo_1.jpg" className="carouselImage d-block w-100" alt="洗髮護髮產品"/>
                      <div className="carousel-caption d-none d-md-block">
                          <h1 className="fs-1"><strong>洗髮護髮產品</strong></h1>
                      </div>
                    </div>
                    <div id="pasta" className="carousel-item">
                      <img src="images/pasta_1.jpg" className="carouselImage d-block w-100" alt="義大利粉"/>
                      <div className="carousel-caption d-none d-md-block">
                          <h1 className="fs-1"><strong>義大利粉</strong></h1>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselCategories" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselCategories" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>    
              </section>  
              <article className="col-sm-3 fs-4">
                <div id="product-discription">
                  對酒當歌，人生幾何？
                </div>
              </article>
            </div>
          </div>
          <footer className="col-12 order-last align-content-center p-0">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span>我是footer</span>
              <audio controls autoPlay loop>
                <source src="audio/background.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
              </audio>
            </div>
          </footer>
        </div>
      </main>
      <script src="scripts/bootstrap.js"></script>
      <script src="scripts/home.js"></script>
    </>
  )
}
