import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

async function getGithubRepos() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data/githubLinks.yml');
  const raw = await fs.readFile(filePath, 'utf8');
  return yaml.load(raw) || [];
}

export default async function GithubPage() {
  const repos = await getGithubRepos();

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">GitHub 仓库列表</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(repos as any[]).map((item: any) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col"
          >
            <h2 className="text-base font-semibold line-clamp-2">{item.title}</h2>
            <p className="text-gray-500 text-sm line-clamp-2 mt-2 flex-1">{item.desc}</p>

            <div className="mt-3 text-xs text-gray-600 flex flex-wrap gap-2">
              <span>⭐ {item.stars}</span>
              <span>🍴 {item.forks}</span>
              <span>{item.language}</span>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              {item.repo}
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
            >
              查看仓库 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}