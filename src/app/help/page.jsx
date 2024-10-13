import './localstyles.css'

export default function Home() {
  return (
    <>
      <main className="container h-100 ps-0 pt-0 pe-0 pb-0">
        <div className="row h-100 p-0">
          <header className="col-12 order-first fs-1 align-content-center">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span id="blink1">小崗村生活雜貨 </span><span id="blink2">生</span><span id="blink3">活</span><span id="blink4">美</span><span id="blink5">好</span>
              <a id="go-home" href="/" className="btn btn-info fs-5" role="button">返回主頁</a>
            </div>
          </header>
          <div id="stuff" className="col-12">
            <div className="d-flex flex-row justify-content-center h-100 p-0">
              <article className="col-sm-8 fs-4">
                <form action="sign-in" method="GET">
                  <div className="d-flex flex-column justify-content-center p-3 mt-3 h-100 bg-primary">
                    <div className="row m-3">
                      <input className= "col-10" type="text" id="user_surname" name="user_surname" placeholder="請輸入關鍵字"/>
                      <a href="" className="col-2 btn btn-info fs-5" role="button">尋找</a>
                    </div>
                    <div className="row justify-content-between">
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/emoji-wink.svg" width="40" height="40"/>
                          <span>新手上路</span>
                        </div>
                      </div>
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/truck.svg" width="40" height="40"/>
                          <span>訂單與物流</span>
                        </div>
                      </div>
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/arrow-counterclockwise.svg" width="40" height="40"/>
                          <span>退貨與退款</span>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/house-lock.svg" width="40" height="40"/>
                          <span>購物安全</span>
                        </div>
                      </div>
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/cash-coin.svg" width="40" height="40"/>
                          <span>付款或賬務</span>
                        </div>
                      </div>
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/rocket-takeoff.svg" width="40" height="40"/>
                          <span>優惠與促銷</span>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className='col-sm-4 d-inline-block ps-2 pe-2'>
                        <div className='d-flex flex-row justify-content-between mb-3 p-2 bg-success-subtle rounded'>
                          <img src="icons/ticket-detailed.svg" width="40" height="40"/>
                          <span>電子票券與繳費</span>
                        </div>
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

