import { createFileRoute } from "@tanstack/react-router";
import { getArticleBySlug, IArticleDetail } from "../libs/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Route = createFileRoute("/articles_/$slug")({
  loader: async ({ params }) => {
    const response = await getArticleBySlug(params.slug);
    const article = response.data?.[0];

    if (!article) {
      throw new Response("Article not found", { status: 404 });
    }

    return { article };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { article } = Route.useLoaderData() as { article: IArticleDetail };

  return (
    <div className="w-3/4 max-w-2xl min-h-[50%] flex flex-col items-center justify-center mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-green-700 mb-4 text-center">
        {article.title}
      </h1>
      {article.content ? (
        <div className="prose">
          <BlocksRenderer content={article.content} />
        </div>
      ) : (
        <p className="text-gray-600 text-center">No content available.</p>
      )}
    </div>
  );
}
