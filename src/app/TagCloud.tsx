import Link from 'next/link';

export function TagCloud({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">标签云</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="tag hover:bg-blue-100 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}