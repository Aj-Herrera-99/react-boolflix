import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <section className="m-8">
              <h1 className="my-8 text-6xl font-light tracking-wide">
                  Oops . . . Page Not Found!
              </h1>
              <Link to={"/"} className="inline-block p-1 px-3 text-4xl scale-90 border rounded-md hover:text-red-600 hover:border-red-600 hover:scale-100">Go Back</Link>
            </section>
        </>
    );
}

export default NotFound;
