import { sdk } from "./sdk";

interface StrapiLoaderResponse<T = unknown> {
  data: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IArticleDetail {
  readonly documentId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  title: string | null;
  publishedAt: string | null;
  slug: string | null;
  content: string | null | undefined;
}

export async function getArticleBySlug(slug: string) {
  const response = await sdk.collection("articles").find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  return response as StrapiLoaderResponse<IArticleDetail[]>;
}
