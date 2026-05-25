import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// 读取yaml配置文件
export function getNavYamlData() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'navs.yml');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(raw) as {
    categories: Array<{name:string; key:string}>
    websites: Array<{
      id: number
      name: string
      url: string
      desc: string
      category: string
      logo?: string
    }>
  };
  return data;
}