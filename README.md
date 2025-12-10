# Web3 Daily News Platform（Web3 每日资讯网站）

<div align="center">
  <h3>🌐 实时更新的 Web3 行业资讯聚合平台</h3>
  <p>一站式追踪 Web3 新闻、名人动态与加密市场趋势</p>
</div>

---

## 📋 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [详细安装步骤](#详细安装步骤)
- [环境变量配置](#环境变量配置)
- [运行方式](#运行方式)
- [API 文档](#api-文档)
- [数据来源说明](#数据来源说明)
- [功能使用说明](#功能使用说明)
- [故障排除](#故障排除)
- [开发指南](#开发指南)
- [部署指南](#部署指南)
- [贡献指南](#贡献指南)
- [许可证](#许可证)
- [联系方式](#联系方式)

---

## 项目简介

**Web3 Daily News Platform** 是一个全自动化的 Web3 行业资讯聚合平台，旨在为加密货币爱好者、投资者和从业者提供实时、全面的行业动态。

### 核心价值

- 🔄 **自动化更新**：每小时自动爬取最新资讯，无需手动刷新
- 📰 **权威新闻源**：聚合 CoinDesk、Cointelegraph、The Block 等顶级媒体
- 👤 **名人动态追踪**：实时关注 CZ、Vitalik、Michael Saylor 等行业领袖
- 📊 **市场数据可视化**：直观展示加密市场价格趋势和排名
- 🔍 **智能分类筛选**：支持按话题、区块链、项目快速筛选信息
- 📱 **响应式设计**：完美适配桌面、平板和手机设备

---

## 功能特性

### 🗞️ 实时新闻聚合

- 自动抓取 CoinDesk、Cointelegraph、The Block 三大权威媒体
- 智能去重和内容清洗
- 支持按发布时间、热度排序
- 新闻分类标签（DeFi、NFT、Layer2、监管等）

### 👥 名人动态追踪

- 追踪行业关键人物：
  - **CZ (赵长鹏)**：Binance 创始人
  - **Vitalik Buterin**：以太坊创始人
  - **Michael Saylor**：MicroStrategy CEO，比特币倡导者
  - **Tom Lee**：Fundstrat 联合创始人，市场分析师
  - **Justin Sun**：TRON 创始人
  - **更多...**
- 聚合 Twitter/X 动态和公开演讲
- 标注影响力指数

### 📈 加密市场数据展示

- 实时价格监控（BTC、ETH、主流币种）
- 市值排名 Top 100
- 24 小时涨跌幅统计
- 历史价格趋势图表（Chart.js 可视化）
- 交易量分析

### 🔗 链上热点与融资信息

- 链上异常活动监测
- 最新融资轮次和金额
- 项目里程碑追踪

### 🎨 现代化用户体验

- 深色/浅色主题切换
- 响应式布局（移动优先）
- 快速搜索和过滤
- 个性化收藏功能（计划中）

### ⏰ 自动化机制

- 每小时定时任务自动执行
- 智能重试机制（失败自动重试）
- 数据缓存优化，降低 API 请求频率

---

## 技术栈

### 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 14.x | React 全栈框架，支持 SSR 和 SSG |
| **React** | 18.x | UI 组件库 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 3.x | 原子化 CSS 框架 |
| **Chart.js** | 4.x | 数据可视化图表 |
| **Axios** | 1.x | HTTP 请求客户端 |

### 后端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **Node.js** | 18.x+ | 运行时环境 |
| **Express** | 4.x | Web 服务器框架 |
| **TypeScript** | 5.x | 类型安全 |
| **Prisma** | 5.x | ORM 数据库工具 |
| **SQLite** | 3.x | 轻量级数据库 |
| **Cheerio** | 1.x | HTML 解析（爬虫） |
| **Puppeteer** | 21.x | 无头浏览器（动态网页） |
| **node-schedule** | 2.x | 定时任务调度 |
| **Axios** | 1.x | HTTP 请求 |

### 开发工具

- **ESLint**：代码规范检查
- **Prettier**：代码格式化
- **Husky**：Git Hooks 管理
- **Nodemon**：热重载开发

---

## 项目结构

```
web3-daily-news/
├── frontend/                      # Next.js 前端应用
│   ├── app/                       # App Router 路由
│   │   ├── page.tsx              # 首页
│   │   ├── news/                 # 新闻页面
│   │   ├── celebrities/          # 名人动态页面
│   │   ├── market/               # 市场趋势页面
│   │   └── layout.tsx            # 根布局
│   ├── components/                # React 组件
│   │   ├── Header.tsx            # 导航栏
│   │   ├── Footer.tsx            # 页脚
│   │   ├── NewsCard.tsx          # 新闻卡片
│   │   ├── CelebrityCard.tsx     # 名人卡片
│   │   ├── MarketChart.tsx       # 市场图表
│   │   └── ...
│   ├── styles/                    # 样式文件
│   │   └── globals.css           # 全局样式
│   ├── lib/                       # 工具函数
│   │   ├── api.ts                # API 请求封装
│   │   └── utils.ts              # 通用工具
│   ├── types/                     # TypeScript 类型定义
│   ├── public/                    # 静态资源
│   ├── next.config.js             # Next.js 配置
│   ├── tailwind.config.js         # Tailwind CSS 配置
│   ├── tsconfig.json              # TypeScript 配置
│   └── package.json               # 前端依赖
│
├── backend/                       # Express 后端服务
│   ├── src/
│   │   ├── index.ts              # 应用入口
│   │   ├── routes/               # API 路由
│   │   │   ├── news.ts           # 新闻相关路由
│   │   │   ├── celebrities.ts    # 名人相关路由
│   │   │   ├── market.ts         # 市场数据路由
│   │   │   └── index.ts          # 路由聚合
│   │   ├── controllers/          # 控制器层
│   │   │   ├── newsController.ts
│   │   │   ├── celebrityController.ts
│   │   │   └── marketController.ts
│   │   ├── services/             # 业务逻辑层
│   │   │   ├── scraperService.ts # 爬虫调度服务
│   │   │   ├── apiService.ts     # 外部 API 调用
│   │   │   └── cacheService.ts   # 缓存服务
│   │   ├── scrapers/             # 爬虫脚本
│   │   │   ├── coindesk.ts       # CoinDesk 爬虫
│   │   │   ├── cointelegraph.ts  # Cointelegraph 爬虫
│   │   │   ├── theblock.ts       # The Block 爬虫
│   │   │   └── twitter.ts        # Twitter 爬虫
│   │   ├── schedulers/           # 定时任务
│   │   │   └── cronJobs.ts       # Cron 任务配置
│   │   ├── middlewares/          # 中间件
│   │   │   ├── errorHandler.ts   # 错误处理
│   │   │   ├── logger.ts         # 日志记录
│   │   │   └── cors.ts           # 跨域配置
│   │   ├── utils/                # 工具函数
│   │   │   ├── logger.ts         # 日志工具
│   │   │   └── helpers.ts        # 辅助函数
│   │   └── types/                # TypeScript 类型
│   ├── tsconfig.json             # TypeScript 配置
│   └── package.json              # 后端依赖
│
├── shared/                        # 前后端共享代码
│   ├── types/                     # 共享类型定义
│   │   ├── news.ts               # 新闻类型
│   │   ├── celebrity.ts          # 名人类型
│   │   └── market.ts             # 市场数据类型
│   └── constants/                 # 共享常量
│
├── prisma/                        # Prisma ORM 配置
│   ├── schema.prisma             # 数据库模型定义
│   ├── migrations/               # 数据库迁移文件
│   └── seed.ts                   # 数据库种子数据
│
├── docs/                          # 项目文档
│   ├── API.md                    # API 详细文档
│   ├── ARCHITECTURE.md           # 架构说明
│   └── DEPLOYMENT.md             # 部署指南
│
├── scripts/                       # 脚本工具
│   ├── init-db.sh                # 数据库初始化
│   └── backup.sh                 # 数据备份
│
├── .env.example                   # 环境变量示例
├── .gitignore                     # Git 忽略文件
├── package.json                   # 根项目配置
├── README.md                      # 项目文档（本文件）
└── LICENSE                        # 许可证文件
```

---

## 快速开始

### 系统要求

- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本（或使用 pnpm 8.x+）
- **Git**: 2.x 或更高版本

### 一键启动（5 分钟）

```bash
# 1. 克隆仓库
git clone https://github.com/yourusername/web3-daily-news.git
cd web3-daily-news

# 2. 安装依赖（前端 + 后端）
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的配置

# 4. 初始化数据库
cd backend
npx prisma migrate dev
npx prisma generate
cd ..

# 5. 启动应用（同时启动前后端）
npm run dev
```

打开浏览器访问：**http://localhost:3000** 🎉

---

## 详细安装步骤

### 第一步：克隆仓库

```bash
git clone https://github.com/yourusername/web3-daily-news.git
cd web3-daily-news
```

### 第二步：安装前端依赖

```bash
cd frontend
npm install
# 或使用 pnpm（推荐，速度更快）
pnpm install
```

**前端主要依赖：**
- next@14.x
- react@18.x
- typescript@5.x
- tailwindcss@3.x
- chart.js@4.x
- axios@1.x

### 第三步：安装后端依赖

```bash
cd ../backend
npm install
```

**后端主要依赖：**
- express@4.x
- @prisma/client@5.x
- typescript@5.x
- cheerio@1.x
- puppeteer@21.x
- node-schedule@2.x

### 第四步：配置环境变量

#### 后端环境变量

复制示例文件并编辑：

```bash
cd backend
cp .env.example .env
```

编辑 `backend/.env` 文件：

```env
# 服务器配置
NODE_ENV=development
PORT=5000

# 数据库配置
DATABASE_URL="file:./dev.db"

# API 密钥（可选）
# CoinGecko 使用免费 API，无需密钥
COINGECKO_API_KEY=

# 日志级别
LOG_LEVEL=info

# CORS 配置
CORS_ORIGIN=http://localhost:3000
```

#### 前端环境变量

```bash
cd ../frontend
cp .env.example .env.local
```

编辑 `frontend/.env.local` 文件：

```env
# API 基础 URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# 其他配置
NEXT_PUBLIC_APP_NAME=Web3 Daily News
```

### 第五步：初始化数据库

```bash
cd ../backend

# 运行数据库迁移
npx prisma migrate dev --name init

# 生成 Prisma Client
npx prisma generate

# （可选）填充种子数据
npx prisma db seed
```

**数据库初始化成功后，你会看到：**
- ✔ 数据库文件创建在 `backend/dev.db`
- ✔ 表结构创建完成（News, Celebrity, MarketData 等）
- ✔ Prisma Client 代码生成完成

### 第六步：启动开发服务器

#### 方式 1：分别启动（推荐用于开发调试）

**终端 1 - 启动后端：**
```bash
cd backend
npm run dev
# 后端运行在 http://localhost:5000
```

**终端 2 - 启动前端：**
```bash
cd frontend
npm run dev
# 前端运行在 http://localhost:3000
```

#### 方式 2：同时启动（使用根目录脚本）

```bash
# 在项目根目录
npm run dev
# 同时启动前端和后端
```

### 第七步：验证安装

访问以下 URL 确认服务正常：

- **前端应用**: http://localhost:3000
- **后端 API**: http://localhost:5000/api/health
- **Prisma Studio**（数据库管理）: 运行 `npx prisma studio`

---

## 环境变量配置

### 后端环境变量详解

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `NODE_ENV` | 否 | development | 运行环境（development/production） |
| `PORT` | 否 | 5000 | 后端服务端口 |
| `DATABASE_URL` | 是 | file:./dev.db | SQLite 数据库路径 |
| `COINGECKO_API_KEY` | 否 | - | CoinGecko API 密钥（免费版可不填） |
| `LOG_LEVEL` | 否 | info | 日志级别（debug/info/warn/error） |
| `CORS_ORIGIN` | 否 | * | 允许的跨域来源 |
| `SCRAPER_INTERVAL` | 否 | 3600000 | 爬虫执行间隔（毫秒，默认 1 小时） |

### 前端环境变量详解

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `NEXT_PUBLIC_API_URL` | 是 | http://localhost:5000/api | 后端 API 地址 |
| `NEXT_PUBLIC_APP_NAME` | 否 | Web3 Daily News | 应用名称 |
| `NEXT_PUBLIC_GA_ID` | 否 | - | Google Analytics ID（可选） |

### 生产环境配置示例

```env
# backend/.env (生产环境)
NODE_ENV=production
PORT=5000
DATABASE_URL="file:/var/data/production.db"
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=warn
```

```env
# frontend/.env.local (生产环境)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

---

## 运行方式

### 开发模式

#### 前端开发服务器

```bash
cd frontend
npm run dev
# 访问 http://localhost:3000
# 支持热重载（Hot Reload）
```

#### 后端开发服务器

```bash
cd backend
npm run dev
# 运行在 http://localhost:5000
# Nodemon 自动监听文件变化
```

#### 同时启动前后端

```bash
# 在项目根目录
npm run dev
# 或使用 concurrently 同时运行
```

### 生产模式

#### 构建前端

```bash
cd frontend
npm run build
npm run start
# 运行优化后的生产版本
```

#### 启动后端生产服务

```bash
cd backend
npm run build
npm run start
# 使用 PM2 管理进程（推荐）
pm2 start dist/index.js --name web3-news-backend
```

### 其他有用的命令

```bash
# 代码格式化
npm run format

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 数据库管理界面
cd backend
npx prisma studio

# 查看数据库迁移历史
npx prisma migrate status

# 运行爬虫测试
npm run test:scraper
```

---

## API 文档

### 基础信息

- **Base URL**: `http://localhost:5000/api`
- **响应格式**: JSON
- **字符编码**: UTF-8

### 主要端点

#### 1. 新闻相关 API

##### 获取新闻列表

```http
GET /api/news
```

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `page` | number | 否 | 页码（默认 1） |
| `limit` | number | 否 | 每页数量（默认 20，最大 100） |
| `source` | string | 否 | 新闻源（coindesk/cointelegraph/theblock） |
| `category` | string | 否 | 分类（defi/nft/layer2/regulation 等） |
| `search` | string | 否 | 搜索关键词 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "news": [
      {
        "id": 1,
        "title": "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
        "summary": "Bitcoin reached a new milestone...",
        "content": "Full article content...",
        "source": "coindesk",
        "sourceUrl": "https://coindesk.com/...",
        "imageUrl": "https://...",
        "category": "market",
        "publishedAt": "2024-12-10T08:30:00Z",
        "createdAt": "2024-12-10T08:35:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

##### 获取单条新闻详情

```http
GET /api/news/:id
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "...",
    "content": "...",
    "relatedNews": [...]
  }
}
```

#### 2. 名人动态 API

##### 获取名人列表

```http
GET /api/celebrities
```

**响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "CZ (Changpeng Zhao)",
      "username": "cz_binance",
      "avatar": "https://...",
      "bio": "Founder of Binance",
      "followerCount": 9500000,
      "verified": true
    }
  ]
}
```

##### 获取名人最新动态

```http
GET /api/celebrities/:id/posts
```

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `limit` | number | 否 | 返回数量（默认 10） |

**响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "celebrityId": 1,
      "content": "Exciting developments in DeFi...",
      "platform": "twitter",
      "postUrl": "https://twitter.com/...",
      "likeCount": 5234,
      "retweetCount": 1203,
      "postedAt": "2024-12-10T10:15:00Z"
    }
  ]
}
```

#### 3. 市场数据 API

##### 获取市场趋势

```http
GET /api/market/trends
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "topGainers": [
      {
        "symbol": "BTC",
        "name": "Bitcoin",
        "price": 50234.56,
        "change24h": 5.67,
        "marketCap": 985000000000,
        "volume24h": 45000000000
      }
    ],
    "topLosers": [...],
    "trending": [...]
  }
}
```

##### 获取币种历史价格

```http
GET /api/market/price-history/:symbol
```

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `days` | number | 否 | 天数（默认 7） |
| `interval` | string | 否 | 间隔（hourly/daily，默认 daily） |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "symbol": "BTC",
    "prices": [
      {
        "timestamp": "2024-12-03T00:00:00Z",
        "price": 48234.56
      },
      {
        "timestamp": "2024-12-04T00:00:00Z",
        "price": 49123.45
      }
    ]
  }
}
```

#### 4. 融资信息 API

```http
GET /api/funding
```

**响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectName": "Example Protocol",
      "amount": 50000000,
      "round": "Series A",
      "investors": ["Sequoia Capital", "a16z"],
      "date": "2024-12-05",
      "category": "DeFi"
    }
  ]
}
```

#### 5. 健康检查

```http
GET /api/health
```

**响应示例：**

```json
{
  "status": "ok",
  "timestamp": "2024-12-10T12:00:00Z",
  "services": {
    "database": "connected",
    "scraper": "running"
  }
}
```

### 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": {}
  }
}
```

**常见错误代码：**

- `400` - Bad Request（请求参数错误）
- `404` - Not Found（资源不存在）
- `429` - Too Many Requests（请求过于频繁）
- `500` - Internal Server Error（服务器内部错误）

---

## 数据来源说明

### 新闻来源

| 媒体 | URL | 更新频率 | 爬取方式 |
|------|-----|----------|----------|
| **CoinDesk** | https://coindesk.com | 每小时 | Cheerio + Axios |
| **Cointelegraph** | https://cointelegraph.com | 每小时 | Cheerio + Axios |
| **The Block** | https://theblock.co | 每小时 | Puppeteer（动态加载） |

**爬取策略：**
- 自动解析 RSS Feed（如果可用）
- HTML 解析提取标题、摘要、内容、图片
- 智能去重（基于标题相似度）
- 失败重试机制（最多 3 次）

### 名人动态来源

| 平台 | 说明 |
|------|------|
| **Twitter/X** | 通过 RSS 聚合器或官方 API 获取 |
| **个人博客** | 定期检查名人官方博客更新 |
| **Medium** | 抓取知名 KOL 的 Medium 文章 |

**追踪的名人列表：**

1. **CZ (赵长鹏)** - @cz_binance
   - Binance 创始人，行业影响力第一
   
2. **Vitalik Buterin** - @VitalikButerin
   - 以太坊创始人，技术领袖
   
3. **Michael Saylor** - @michael_saylor
   - MicroStrategy CEO，比特币最大机构持有者
   
4. **Tom Lee** - @fundstrat
   - Fundstrat 联合创始人，市场分析师
   
5. **Justin Sun** - @justinsuntron
   - TRON 创始人，营销高手
   
6. **Brian Armstrong** - @brian_armstrong
   - Coinbase CEO，合规先锋
   
7. **Andre Cronje** - @AndreCronjeTech
   - DeFi 架构师，YFI 创始人

### 市场数据来源

| 数据源 | API | 费用 | 限制 |
|--------|-----|------|------|
| **CoinGecko** | https://api.coingecko.com | 免费 | 50 次/分钟 |
| **备用源** | CoinMarketCap | 免费 | 333 次/天 |

**获取的数据：**
- 实时价格（10,000+ 币种）
- 24 小时交易量
- 市值排名
- 历史价格数据（最多 365 天）
- 涨跌幅统计

### 更新频率

- **新闻爬取**：每小时自动执行（整点）
- **名人动态**：每 2 小时更新
- **市场数据**：每 5 分钟刷新价格
- **融资信息**：每天更新一次

### 数据存储策略

- **SQLite 数据库**：存储所有历史数据
- **内存缓存**：缓存最近 1 小时的热门数据
- **自动清理**：30 天前的旧新闻自动归档

---

## 功能使用说明

### 首页功能

**首页展示：**
1. **今日头条**：最新最热的 5 条重要新闻
2. **市场概览**：BTC/ETH 实时价格和涨跌幅
3. **名人动态**：最近 24 小时的重要发言
4. **热门话题**：DeFi、NFT、Layer2 等分类快捷入口

**操作提示：**
- 点击新闻卡片查看完整内容
- 点击名人头像查看历史动态
- 点击"查看更多"进入详细页面

### 新闻页面

**筛选功能：**

```
[全部来源 ▼] [全部分类 ▼] [🔍 搜索关键词]
```

- **按来源筛选**：CoinDesk / Cointelegraph / The Block
- **按分类筛选**：DeFi / NFT / Layer2 / 监管 / 市场 / 技术
- **关键词搜索**：实时搜索标题和摘要

**排序方式：**
- 最新发布（默认）
- 热度排序（按阅读量）

**使用技巧：**
- 使用 `Ctrl+F` 或 `Cmd+F` 快速搜索页面内容
- 点击标签快速筛选同类新闻
- 收藏感兴趣的新闻（需登录，计划中功能）

### 名人动态页面

**查看方式：**
- **网格视图**：展示所有名人卡片
- **时间线视图**：按时间顺序展示所有动态

**功能：**
- 点击名人卡片查看个人页
- 查看最近 30 天的所有推文/文章
- 显示点赞数、转发数等互动数据

### 市场趋势页面

**数据可视化：**

1. **价格趋势图**（Chart.js 折线图）
   - 默认展示 BTC 和 ETH 7 天价格走势
   - 可切换时间范围：24H / 7D / 30D / 90D / 1Y
   - 鼠标悬停查看具体时间点价格

2. **涨跌幅排行榜**
   - Top 10 涨幅榜（24 小时）
   - Top 10 跌幅榜（24 小时）
   - 实时更新（每 5 分钟）

3. **市值排名**
   - Top 100 加密货币
   - 显示价格、市值、24H 交易量
   - 点击查看详情和历史数据

**交互功能：**
- 点击币种名称查看详细信息
- 图表支持缩放和拖拽
- 导出图表为图片（右键菜单）

---

## 故障排除

### 常见问题

#### 1. 端口被占用

**错误信息：**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解决方案：**

```bash
# 查找占用端口的进程（macOS/Linux）
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或者修改端口
# frontend/.env.local
PORT=3001
```

#### 2. 数据库连接失败

**错误信息：**
```
PrismaClientInitializationError: Can't reach database server
```

**解决方案：**

```bash
# 检查数据库文件是否存在
ls backend/dev.db

# 重新初始化数据库
cd backend
rm -f dev.db
npx prisma migrate reset
npx prisma generate
```

#### 3. 爬虫抓取失败

**错误信息：**
```
Scraper error: Request failed with status code 403
```

**原因：**
- 网站可能有反爬虫机制
- IP 被临时封禁
- 网络连接问题

**解决方案：**

```bash
# 1. 检查网络连接
curl https://coindesk.com

# 2. 查看爬虫日志
tail -f backend/logs/scraper.log

# 3. 手动触发爬虫测试
cd backend
npm run scraper:test

# 4. 调整爬虫间隔（避免频繁请求）
# backend/.env
SCRAPER_INTERVAL=7200000  # 改为 2 小时
```

#### 4. 依赖安装失败

**错误信息：**
```
npm ERR! code ERESOLVE
```

**解决方案：**

```bash
# 使用 --legacy-peer-deps 标志
npm install --legacy-peer-deps

# 或清除缓存后重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 5. TypeScript 类型错误

**解决方案：**

```bash
# 重新生成 Prisma Client 类型
cd backend
npx prisma generate

# 重启 TypeScript 服务器（VS Code）
# 按 Cmd+Shift+P (macOS) 或 Ctrl+Shift+P (Windows)
# 输入：TypeScript: Restart TS Server
```

#### 6. 前端打包失败

**错误信息：**
```
Error: Minified React error
```

**解决方案：**

```bash
cd frontend

# 清除 Next.js 缓存
rm -rf .next

# 重新构建
npm run build
```

### 日志查看

```bash
# 查看后端日志
tail -f backend/logs/app.log

# 查看爬虫日志
tail -f backend/logs/scraper.log

# 查看错误日志
tail -f backend/logs/error.log
```

### 性能优化

如果应用运行缓慢：

1. **数据库优化**
   ```bash
   cd backend
   npx prisma db push
   # 添加索引（在 schema.prisma 中）
   ```

2. **清理旧数据**
   ```bash
   # 删除 30 天前的新闻
   npm run db:cleanup
   ```

3. **启用缓存**
   ```env
   # backend/.env
   ENABLE_CACHE=true
   CACHE_TTL=3600
   ```

---

## 开发指南

### 添加新的新闻源

假设你想添加 **Decrypt** 作为新的新闻源：

**步骤 1：创建爬虫脚本**

```typescript
// backend/src/scrapers/decrypt.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsArticle } from '../types';

export async function scrapeDecrypt(): Promise<NewsArticle[]> {
  const url = 'https://decrypt.co/news';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  
  const articles: NewsArticle[] = [];
  
  $('.article-card').each((i, el) => {
    const title = $(el).find('.article-title').text().trim();
    const summary = $(el).find('.article-excerpt').text().trim();
    const link = $(el).find('a').attr('href');
    const imageUrl = $(el).find('img').attr('src');
    
    articles.push({
      title,
      summary,
      sourceUrl: `https://decrypt.co${link}`,
      source: 'decrypt',
      imageUrl,
      publishedAt: new Date(),
    });
  });
  
  return articles;
}
```

**步骤 2：注册爬虫**

```typescript
// backend/src/services/scraperService.ts
import { scrapeDecrypt } from '../scrapers/decrypt';

export async function runAllScrapers() {
  const scrapers = [
    scrapeCoinDesk,
    scrapeCointelegraph,
    scrapeTheBlock,
    scrapeDecrypt, // 添加新爬虫
  ];
  
  // 并行执行所有爬虫
  const results = await Promise.allSettled(
    scrapers.map(scraper => scraper())
  );
  
  // 处理结果...
}
```

**步骤 3：更新数据库模型（如需要）**

```prisma
// prisma/schema.prisma
model News {
  id          Int      @id @default(autoincrement())
  title       String
  summary     String?
  content     String?
  source      String   // coindesk, cointelegraph, theblock, decrypt
  sourceUrl   String   @unique
  // ...
}
```

运行迁移：

```bash
cd backend
npx prisma migrate dev --name add-decrypt-source
```

### 自定义 API 端点

假设你想添加 **收藏功能**：

**步骤 1：创建路由**

```typescript
// backend/src/routes/favorites.ts
import express from 'express';
import { addFavorite, getFavorites } from '../controllers/favoriteController';

const router = express.Router();

router.post('/', addFavorite);
router.get('/:userId', getFavorites);

export default router;
```

**步骤 2：创建控制器**

```typescript
// backend/src/controllers/favoriteController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function addFavorite(req: Request, res: Response) {
  const { userId, newsId } = req.body;
  
  try {
    const favorite = await prisma.favorite.create({
      data: { userId, newsId },
    });
    
    res.json({ success: true, data: favorite });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getFavorites(req: Request, res: Response) {
  const { userId } = req.params;
  
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: parseInt(userId) },
      include: { news: true },
    });
    
    res.json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

**步骤 3：注册路由**

```typescript
// backend/src/routes/index.ts
import favoriteRoutes from './favorites';

app.use('/api/favorites', favoriteRoutes);
```

### 修改样式和布局

使用 Tailwind CSS 工具类：

```tsx
// frontend/components/NewsCard.tsx
export default function NewsCard({ news }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
      <img 
        src={news.imageUrl} 
        alt={news.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {news.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {news.summary}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{news.source}</span>
        <span className="text-sm text-gray-400">{formatDate(news.publishedAt)}</span>
      </div>
    </div>
  );
}
```

### 修改数据库 Schema

**步骤 1：编辑 Prisma Schema**

```prisma
// prisma/schema.prisma
model News {
  id          Int      @id @default(autoincrement())
  title       String
  summary     String?
  content     String?
  source      String
  sourceUrl   String   @unique
  imageUrl    String?
  category    String?  // 新增字段
  tags        String[] // 新增标签数组
  viewCount   Int      @default(0) // 新增浏览量
  publishedAt DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**步骤 2：创建迁移**

```bash
cd backend
npx prisma migrate dev --name add-category-tags-viewcount
```

**步骤 3：更新类型定义**

```typescript
// shared/types/news.ts
export interface NewsArticle {
  id: number;
  title: string;
  summary?: string;
  content?: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  category?: string;     // 新增
  tags?: string[];       // 新增
  viewCount?: number;    // 新增
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 部署指南

### 本地生产部署

#### 1. 构建应用

```bash
# 构建前端
cd frontend
npm run build

# 构建后端
cd ../backend
npm run build
```

#### 2. 配置生产环境变量

```env
# backend/.env
NODE_ENV=production
PORT=5000
DATABASE_URL="file:/var/data/web3-news.db"
CORS_ORIGIN=https://yourdomain.com
```

#### 3. 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动后端
cd backend
pm2 start dist/index.js --name web3-news-api

# 启动前端
cd ../frontend
pm2 start npm --name web3-news-web -- start

# 保存 PM2 配置
pm2 save
pm2 startup
```

#### 4. 配置 Nginx 反向代理

```nginx
# /etc/nginx/sites-available/web3-news
server {
    listen 80;
    server_name yourdomain.com;

    # 前端
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端 API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/web3-news /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Docker 部署

#### 创建 Dockerfile

**后端 Dockerfile：**

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

**前端 Dockerfile：**

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:/data/production.db
    volumes:
      - ./data:/data
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api
    depends_on:
      - backend
    restart: unless-stopped
```

启动：

```bash
docker-compose up -d
```

### 云平台部署

#### Vercel（推荐用于前端）

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

#### Railway（推荐用于后端）

1. 访问 https://railway.app
2. 连接 GitHub 仓库
3. 选择 `backend` 目录
4. 配置环境变量
5. 自动部署

### 环境配置最佳实践

1. **使用环境变量管理敏感信息**
   - 永远不要提交 `.env` 文件到 Git
   - 使用 `.env.example` 作为模板

2. **数据库备份**
   ```bash
   # 自动备份脚本
   #!/bin/bash
   BACKUP_DIR="/var/backups/web3-news"
   DATE=$(date +%Y%m%d_%H%M%S)
   cp /var/data/web3-news.db "$BACKUP_DIR/backup_$DATE.db"
   # 保留最近 7 天的备份
   find "$BACKUP_DIR" -name "backup_*.db" -mtime +7 -delete
   ```

3. **监控和日志**
   - 使用 PM2 监控应用状态：`pm2 monit`
   - 配置日志轮转
   - 集成错误追踪（如 Sentry）

4. **性能优化**
   - 启用 Gzip 压缩
   - 配置 CDN（静态资源）
   - 使用 Redis 缓存（可选）

---

## 贡献指南

我们欢迎所有形式的贡献！无论是报告 Bug、提出新功能建议，还是提交代码，都是对项目的巨大支持。

### 如何贡献

#### 1. 报告 Bug

如果你发现了 Bug，请：

1. 在 GitHub Issues 中搜索是否已有相同问题
2. 如果没有，创建新 Issue，包含：
   - Bug 描述（期望行为 vs 实际行为）
   - 复现步骤
   - 环境信息（Node.js 版本、操作系统等）
   - 相关截图或日志

#### 2. 提出新功能

1. 创建 Feature Request Issue
2. 清晰描述功能需求和使用场景
3. 等待社区讨论和反馈

#### 3. 提交代码

**Fork 和 Clone：**

```bash
# Fork 本仓库到你的 GitHub 账户
# 然后 Clone 你的 Fork
git clone https://github.com/YOUR_USERNAME/web3-daily-news.git
cd web3-daily-news
```

**创建分支：**

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

**开发和测试：**

```bash
# 安装依赖
npm install

# 进行开发...

# 运行测试
npm run test

# 代码检查
npm run lint

# 格式化代码
npm run format
```

**提交代码：**

```bash
git add .
git commit -m "feat: add new feature"
# 遵循 Conventional Commits 规范
```

**Push 并创建 Pull Request：**

```bash
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request。

### 代码规范

- **TypeScript**：所有代码必须使用 TypeScript
- **ESLint**：遵循项目 ESLint 配置
- **Prettier**：使用 Prettier 格式化代码
- **命名规范**：
  - 组件：PascalCase（如 `NewsCard.tsx`）
  - 函数：camelCase（如 `fetchNews`）
  - 常量：UPPER_SNAKE_CASE（如 `API_BASE_URL`）

### Commit 规范

使用 Conventional Commits：

```
feat: 新增功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

示例：

```bash
git commit -m "feat: add celebrity filter functionality"
git commit -m "fix: resolve scraper timeout issue"
git commit -m "docs: update API documentation"
```

### Pull Request 检查清单

在提交 PR 之前，请确保：

- [ ] 代码通过所有测试
- [ ] 代码通过 ESLint 检查
- [ ] 添加了必要的注释和文档
- [ ] 更新了相关文档（如 README.md）
- [ ] PR 描述清晰，说明了改动内容和原因

---

## 许可证

本项目采用 **MIT License** 许可证。

```
MIT License

Copyright (c) 2024 Web3 Daily News Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

你可以自由地：
- ✅ 商业使用
- ✅ 修改源代码
- ✅ 分发和私用
- ✅ 专利使用

但你必须：
- 📄 包含许可证和版权声明
- 📋 声明所做的修改

---

## 联系方式

### 项目维护者

- **GitHub**: [yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Twitter/X**: [@yourusername](https://twitter.com/yourusername)

### 社区交流

- **GitHub Discussions**: [参与讨论](https://github.com/yourusername/web3-daily-news/discussions)
- **Discord**: [加入服务器](https://discord.gg/your-invite-link)（计划中）
- **Telegram**: [加入群组](https://t.me/your-group)（计划中）

### 问题反馈

- **GitHub Issues**: https://github.com/yourusername/web3-daily-news/issues
- **Email Support**: support@web3dailynews.com（计划中）

---

## 致谢

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Prisma](https://www.prisma.io/) - 现代化 ORM
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [CoinGecko](https://www.coingecko.com/) - 加密货币数据 API
- [CoinDesk](https://coindesk.com/), [Cointelegraph](https://cointelegraph.com/), [The Block](https://theblock.co/) - 新闻来源

---

## 路线图

### v1.0（当前版本）
- ✅ 基础新闻聚合功能
- ✅ 名人动态追踪
- ✅ 市场数据展示
- ✅ 响应式设计

### v1.1（计划中）
- [ ] 用户登录和个人中心
- [ ] 新闻收藏功能
- [ ] 自定义推送通知
- [ ] 多语言支持（英语）

### v2.0（未来计划）
- [ ] AI 智能摘要
- [ ] 情绪分析
- [ ] 社区评论功能
- [ ] 移动端 App（React Native）

---

## FAQ（常见问题）

### Q: 项目是否需要付费 API 密钥？

**A**: 不需要。项目使用 CoinGecko 的免费 API，无需申请密钥。如果需要更高的请求频率，可以选择升级到付费计划。

### Q: 可以添加自己关注的名人吗？

**A**: 目前版本是预设的名人列表。未来版本会支持用户自定义关注列表（需要登录功能）。

### Q: 数据多久更新一次？

**A**: 
- 新闻：每小时自动爬取
- 名人动态：每 2 小时更新
- 市场数据：每 5 分钟刷新

### Q: 为什么爬虫有时会失败？

**A**: 新闻网站可能会更新 HTML 结构，或实施反爬虫措施。我们会定期维护爬虫脚本。如果遇到问题，请提交 Issue。

### Q: 可以用于商业项目吗？

**A**: 可以，项目采用 MIT 许可证，支持商业使用。但请注意遵守新闻来源网站的使用条款。

---

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，请给我们一个 Star！</p>
  <p>Made with ❤️ by the Web3 Community</p>
</div>
