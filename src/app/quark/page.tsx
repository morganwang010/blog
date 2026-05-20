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
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">夸克网盘资源列表</h1>

      <div className="grid gap-4">
        {(links as any[]).map((item: any, index: number) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.desc}</p>

            <div className="mt-2 text-sm text-gray-600 flex gap-3">
              <span>大小：{item.size}</span>
              <span>文件数：{item.files}</span>
              {/* <span>分享者：{item.shareUser}</span> */}
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              打开夸克网盘 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}