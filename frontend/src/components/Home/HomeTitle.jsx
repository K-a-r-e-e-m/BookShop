import { Link } from "react-router-dom";

// HomeTitle Component
const HomeTitle = () => (
    <div className="home__data">
      <h1 className="home__title">
        Browse &amp; <br />
        Select E-Books
      </h1>
      <p className="home__description">
        Find the best e-books from your favorite writers, explore hundreds of
        books with all possible categories, take advantage of the 50% discount
        and much more.
      </p>
      <Link to='shop' className="button">
        Explore Now
      </Link>
    </div>
  );
export default HomeTitle;