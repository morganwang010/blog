import type { NextApiRequest, NextApiResponse } from 'next';

// Vercel Webhook 事件类型（简化版）
type VercelDeploymentEvent = {
  type: 'deployment.ready' | 'deployment.error';
  deployment: {
    id: string;
    name: string;
    branch: string;
    commit?: string;
    readyState: 'READY' | 'ERROR';
    url: string;
  };
  team?: {
    slug: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // 读取飞书 Webhook 地址
    const FEISHU_WEBHOOK = process.env.FEISHU_WEBHOOK;
    if (!FEISHU_WEBHOOK) {
      return res.status(500).send('FEISHU_WEBHOOK 未配置');
    }

    const payload = req.body as VercelDeploymentEvent;

    // 只处理部署事件
    if (!payload.type.startsWith('deployment.')) {
      return res.status(200).send('ignore');
    }

    const { deployment } = payload;
    const isSuccess = payload.type === 'deployment.ready';
    const statusText = isSuccess ? '✅ 部署成功' : '❌ 部署失败';

    // 飞书消息内容
    const message = {
      msg_type: 'text',
      content: {
        text: `
${statusText}
项目：${deployment.name}
分支：${deployment.branch}
Commit：${deployment.commit?.slice(0, 8) || '无'}
访问链接：https://${deployment.url}
控制台：https://vercel.com/${payload.team?.slug}/${deployment.name}/deployments/${deployment.id}
        `.trim(),
      },
    };

    // 发送到飞书
    await fetch(FEISHU_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return res.status(200).send('ok');
  } catch (err) {
    console.error('通知失败:', err);
    return res.status(500).send('error');
  }
}

// 关闭 bodyParser，Vercel 会自动解析
export const config = {
  api: {
    bodyParser: true,
  },
};