import './localstyles.css'

export default function Home() {
  return (
    <>
      <main className="container h-100 ps-0 pt-0 pe-0 pb-0">
        <div className="row h-100 p-0">
          <header className="col-12 order-first align-content-center">
            <div className="d-flex flex-row justify-content-between ps-2 pe-2">
              <div className="d-flex flex-row justify-content-start">
                <span id="blink1">小崗村生活雜貨 </span><span id="blink2">生</span><span id="blink3">活</span><span id="blink4">美</span><span id="blink5">好</span>
              </div>
              <div >
                <a id="back-to-main" href="/" className="btn bg-info  me-1" role="button">返回主頁</a>
                <a id="help" href="help" className="btn bg-info-subtle" role="button">協助</a>  
              </div>
            </div>
          </header>
          <div id="stuff" className="col-12">
            <div className="d-flex flex-row justify-content-center h-100 p-0">
              <article className="col-sm-6">
                <form action="sign-in" method="GET">
                  <div className="d-flex flex-column justify-content-center p-3 mt-3 h-100 bg-primary">
                    <div className="row justify-content-center mt-2">
                      <label>新會員註冊</label>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="text" id="user_surname" name="user_surname" placeholder="請輸入姓氏"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="text" id="user_givenname" name="user_givenname" placeholder="請輸入名字"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="text" id="username" name="username" placeholder="請設定登入名稱"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="text" id="email" name="email" placeholder="請輸入電郵"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="text" id="cellphone" name="cellphone" placeholder="請輸入手機號碼"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="password" id="password" name="password" placeholder="請輸入密碼"/>
                    </div>
                    <div className="row mt-2">
                      <input className="d-block w-100" type="password" id="password_too" name="password_too" placeholder="請再次輸入以上密碼"/>
                    </div>
                    <div className="row mt-3">
                      <button type="submit" className="col-12 btn btn-danger">註冊</button>
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

