# Astro Starlight 技術部落格 設計規範

## 目標

使用 Astro + Starlight 建立一個部署於 GitHub Pages 的技術部落格，兼具：

- 個人技術筆記 / 學習紀錄
- 分享技術文章，建立個人品牌

文章以中英混用為主，透過 VS Code 撰寫 Markdown 後推送到 GitHub，由 GitHub Actions 自動部署。

## 技術棧

- 框架：Astro
- 主題：Starlight
- 內容格式：Markdown +  Astro Content Collections
- 部署：GitHub Pages（gh-pages 分支）
- CI/CD：GitHub Actions
- 語法高亮：Starlight 預設 Shiki

## 專案結構

核心結構（簡化版）：

- astro.config.mjs
- content/
  - config.ts
  - blog/
    - 各篇文章.md
- public/
- src/
  - content/
  - pages/
  - components/
- package.json
- .github/
  - workflows/
    - deploy.yml

細節：

- 使用 Content Collections 定義 blog 集合，包含 frontmatter schema（title、description、date、tags、author、summary、related）。
- 文章存放在 content/blog/，以檔案名稱或 frontmatter date 控制排序。
- 標籤透過 frontmatter tags 欄位管理，並提供依標籤篩選的頁面。
- 相關文章透過 frontmatter related 欄位，手動指定相關文章 slug。

## 部署流程

流程：

- 開發者在本機用 VS Code 編輯 / 新增 Markdown 文章。
- 提交到 main 分支。
- GitHub Actions 觸發：
  - 安裝依賴
  - 執行 Astro build
  - 部署 dist 到 gh-pages 分支
- 網站透過 username.github.io 存取。

要求：

- 部署腳本需處理 gh-pages 分支的切換與清理。
- 失敗時保留上一次可運作版本，不直接覆蓋。

## 功能需求

- 首頁：
  - 個人簡介
  - 最新文章列表（含標題、日期、摘要）
- 文章頁面：
  - 標題、日期、作者
  - 標籤
  - 程式碼區塊（Shiki 語法高亮）
  - 相關文章區塊
- 標籤頁：
  - 列出所有標籤
  - 依標籤篩選文章
- 搜尋：
  - 使用 Starlight 內建搜尋功能
- 導航：
  - 清晰的側邊欄或頂部導航，區分「關於」、「文章列表」、「標籤」等

## 非功能需求

- 效能：
  - 使用 Astro 靜態產生，頁面加載快速
  - 不引入不必要的 JS
- 可維護性：
  - 結構簡單，方便未來擴充
  - 不依賴過多外部套件
- 可讀性：
  - 支援中英文混排
  - 程式碼區塊清晰可讀

## 限制與決策

- 不引入額外部落格套件，僅使用 Starlight 核心能力。
- 不實作後端、資料庫、使用者登入等複雜功能。
- 留言系統與 RSS 本期不實作，未來可依需求擴充。
