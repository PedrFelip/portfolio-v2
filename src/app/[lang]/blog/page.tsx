import { BlogList } from "@/components/blog/BlogList";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getAllPosts } from "@/lib/blog-data";
import { blogContent } from "@/lib/content/blog-content";

interface BlogPageProps {
  params: Promise<{
    lang: "en" | "pt";
  }>;
}

/**
 * BlogPage component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Consistent container: matches Navigation and Section components
 */
export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = blogContent[lang].blog;
  const allPosts = getAllPosts();
  const postsPerPage = 6;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.title} description={t.subtitle} />

        <BlogList
          initialPosts={allPosts.slice(0, postsPerPage)}
          allPosts={allPosts}
          postsPerPage={postsPerPage}
          translations={{
            noPosts: t.noPosts,
            noPostsDesc: t.noPostsDesc,
            page: t.page,
            of: t.of,
            previous: t.previous,
            next: t.next,
          }}
        />
      </div>
    </section>
  );
}
