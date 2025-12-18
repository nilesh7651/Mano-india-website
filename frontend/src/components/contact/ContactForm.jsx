import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Form */}
        <div className={styles.form}>
          <h2>Say Hello!</h2>

          <label>Full Name</label>
          <input type="text" placeholder="Enter Name" />

          <label>Contact Number</label>
          <input type="text" placeholder="Contact Number" />

          <label>Email Address</label>
          <input type="email" placeholder="Email Address" />

          <label>Message</label>
          <textarea placeholder="Enter Your Message" />

          <button>Submit</button>
        </div>

        {/* Right Info */}
        <div className={styles.info}>
          <div>
            <h3>Vendors</h3>
            <p>
              If you are a registered vendor or a business looking to promote
              your brand on our portal, please send in your queries at{" "}
              <span>vendors@company.com</span>
            </p>
          </div>

          <div>
            <h3>Marketing Collaborations</h3>
            <p>
              For brand collaborations – sponsored content, social media
              activations etc., please write into{" "}
              <span>partnerships@company.com</span>
            </p>
          </div>

          <div>
            <h3>Wedding Submissions</h3>
            <p>
              &lt;Company Name&gt; features wedding across cultures, styles and
              budgets. To submit your wedding, kindly email us 15–20 photos at{" "}
              <span>submissions@company.com</span>
            </p>
          </div>

          <div>
            <h3>Careers</h3>
            <p>
              We are a team of passionate young minds looking to reinvent the
              wedding space. Please check our careers page for current openings
              and email us at <span>hr@company.com</span>
            </p>
          </div>

          <div>
            <h3>Customers</h3>
            <p>
              We love to hear from our precious users. For any feedback or
              queries simply write in to <span>info@company.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
