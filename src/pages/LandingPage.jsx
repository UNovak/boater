import React from "react";

// Define an array of articles
const articles = [
  {
    id: Math.random(),
    title: "Article Title",
    authorName: "Author Name",
    imageUrl: "https://picsum.photos/600/400/?random",
    authorImage: "https://picsum.photos/32/32/?random",
  },
  {
    id: Math.random(),
    title: "Article Title",
    authorName: "Author Name",
    imageUrl: "https://picsum.photos/600/400/?random",
    authorImage: "https://picsum.photos/32/32/?random",
  },
  {
    id: Math.random(),
    title: "Article Title",
    authorName: "Author Name",
    imageUrl: "https://picsum.photos/600/400/?random",
    authorImage: "https://picsum.photos/32/32/?random",
  },
  {
    id: Math.random(),
    title: "Article Title",
    authorName: "Author Name",
    imageUrl: "https://picsum.photos/600/400/?random",
    authorImage: "https://picsum.photos/32/32/?random",
  },
];

const LandingPage = () => {
  return (
    <div className="container mx-auto my-12 px-4 md:px-12">
      <div className="-mx-1 flex flex-wrap lg:-mx-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4"
          >
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src={article.imageUrl}
                />
              </a>

              <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                <h1 className="text-lg">
                  <a
                    className="text-black no-underline hover:underline"
                    href="#"
                  >
                    {article.title}
                  </a>
                </h1>
                <p className="text-grey-darker text-sm">{article.date}</p>
              </header>

              <footer className="flex items-center justify-between p-2 leading-none md:p-4">
                <a
                  className="flex items-center text-black no-underline hover:underline"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src={article.authorImage}
                  />
                  <p className="ml-2 text-sm">{article.authorName}</p>
                </a>
                <a
                  className="text-grey-darker hover:text-red-dark no-underline"
                  href="#"
                >
                  <span className="hidden">Like</span>
                  <i className="fa fa-heart"></i>
                </a>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
