export default function NewsTabs() {
  return (
    <>
      <div
        className="post-newsletter post-newsletter-3-style mt-30"
        style={{ height: "30%" }}
      >
        <div></div>
        <p>
          Your email address will not be this published. Required fields are
          News Today.
        </p>
      </div>

      <div
        className="post-newsletter post-newsletter-3-style mt-10 "
        style={{ height: "63%" }}
      >
        <h3 className="title">Newsletter</h3>
        <p>
          Your email address will not be this published. Required fields are
          News Today.
        </p>
        <button>getscore</button>
        <form action="#">
          <div className="input-box">
            <input type="text" placeholder="Your email address" />
            <button type="button">SIGN UP</button>
          </div>
        </form>
      </div>
    </>
  );
}
