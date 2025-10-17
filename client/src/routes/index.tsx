import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Route = createFileRoute("/")({
  loader: async () => {
    const res = await fetch(
      "http://localhost:1337/api/articles?populate=category"
    );
    const data = await res.json();
    return { articles: data.data };
  },
  component: IndexPage,
});

function IndexPage() {
  const { articles } = Route.useLoaderData();

  return (
    <div className=" p-40 w-full h-screen flex flex-col items-center justify-start">
      <h1 className="text-center text-4xl font-bold mb-6 text-red-400">
        Articles
      </h1>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4">
        {articles.map((a: any) => (
          <li
            key={a.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <Link
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className=" prose no-underline hover:underline text-blue-600"
            >
              <div className="p-4">
                <h2 className="text-3xl font-bold text-blue-900">{a.title}</h2>
              </div>
            </Link>

            {/* <BlocksRenderer content={a.content} /> */}

            {a.category && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600">{a.category.name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
