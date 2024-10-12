import './localstyles.css'

export default function Home() {
  return (
    <>
      <main className="container h-100 ps-2 pt-0 pe-0 pb-0">
        <div className="row h-100 p-0">
          <header className="col-12 order-first fs-1 align-content-center">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span id="blink1">小崗村生活雜貨 </span><span id="blink2">生</span><span id="blink3">活</span><span id="blink4">美</span><span id="blink5">好</span>
              <a id="go-home" href="/" className="btn btn-info fs-5" role="button">返回主頁</a>
            </div>
          </header>
          <div id="stuff" className="col-12">
            <div className="row h-100 p-0">
              <section className="col-sm-6 align-content-center">
                <img src="images/小崗村.jpg" className="d-block w-100" alt="中國台灣"/>
              </section>  
              <article className="col-sm-6 fs-4">
                <form action="/validate" method="GET">
                  <div className="d-flex flex-column p-3 mt-3 h-100">
                    <div className="mt-2">
                      <label htmlFor="username">電話號碼/使用者名稱/Email:</label>
                    </div>
                    <div className="mt-2">
                      <input className="d-block w-100" type="text" id="username" name="username" data-id="123" placeholder="電話號碼/使用者名稱/Email"/>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="password">密碼:</label>
                    </div>
                    <div className="mt-2">
                      <input className="d-block w-100" type="password" id="password" name="password" placeholder="密碼"/>
                    </div>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-danger fs-5">登入</button>
                    </div>
                  </div>
                </form>
              </article>
            </div>
          </div>
          <footer className="col-12 order-last align-content-center p-0">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span>我是footer</span>
            </div>
          </footer>
        </div>
      </main>
      <script src="scripts/bootstrap.js"></script>
    </>
  )
}

