import css from './Footer.module.css';

function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <div className={css.content}>
          <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
          <div className={css.wrap}>
            <p>Developer: Serhii K</p>
            <p>
              Contact us:
              <a href="mailto:wagenrex@gmail.com">wagenrex@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
