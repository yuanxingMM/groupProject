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
                <form action="/" method="GET">
                  <div className="d-flex flex-column p-3 mt-3 h-100">
                    <div className="mt-2">
                      <input className="d-block w-100" type="text" id="username" name="username" data-id="123" placeholder="電話號碼/登入名稱/Email"/>
                    </div>
                    <div className="mt-2">
                      <input className="d-block w-100" type="password" id="password" name="password" placeholder="密碼"/>
                    </div>
                    <div className="mt-3">
                      <div className="d-flex flex-row justify-content-between">
                        <button type="submit" className="btn btn-danger">登入</button>
                        <a className="btn btn-primary" href="reset-passwd">忘記密碼</a>
                        <a className="btn btn-warning" href="registration">新會員註册</a>
                      </div>
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

