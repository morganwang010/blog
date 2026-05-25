import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

// 服务端读取并解析 YAML（不会泄露到前端）
async function getQuarkLinks() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data/quarkLinks.yml');
  const raw = await fs.readFile(filePath, 'utf8');
  return yaml.load(raw) || [];
}

export default async function Home() {
  const links = await getQuarkLinks();

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">夸克网盘资源列表</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(links as any[]).map((item: any, index: number) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col"
          >
            <h2 className="text-base font-semibold line-clamp-2">{item.title}</h2>
            <p className="text-gray-500 text-sm line-clamp-2 mt-2 flex-1">{item.desc}</p>

            <div className="mt-3 text-xs text-gray-600 flex flex-wrap gap-2">
              <span>{item.date}</span>
              <span>{item.size}</span>
              <span>{item.files}个文件</span>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
            >
              打开夸克网盘 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}