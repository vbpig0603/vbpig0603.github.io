# Writing Blog Posts SKILL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable OpenCode SKILL at `.opencode/skills/writing-blog-posts/SKILL.md` that guides users through writing structured technical blog posts using the 5-section template (`_template.md`).

**Architecture:** Single `SKILL.md` file with YAML frontmatter, a HARD-GATE block preventing premature content generation, a 5-stage interactive process (requirements → outline → draft → review → write), embedded writing norms referenced from `_template.md`, interruption recovery, and multi-language support.

**Tech Stack:** OpenCode SKILL.md format, references `src/content/docs/blog/_template.md`

**Spec:** `docs/superpowers/specs/2026-06-09-writing-blog-posts-skill-design.md`

---

### Task 1: Create SKILL Directory and Frontmatter

**Files:**
- Create: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Create the directory structure**

```bash
New-Item -ItemType Directory -Path ".opencode/skills/writing-blog-posts" -Force
```

- [ ] **Step 2: Write SKILL.md frontmatter**

```markdown
---
name: writing-blog-posts
description: >-
  引導使用者撰寫結構化的技術部落格文章，遵循 5 段式模板
  （Hook → Context → Practice → Reflection → Next Step）。
  透過互動式問答收集需求，逐段撰寫，最後自動寫入
  src/content/docs/blog/。
---
```

- [ ] **Step 3: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: initialize writing-blog-posts SKILL with frontmatter"
```

---

### Task 2: Write HARD-GATE and Process Overview

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append HARD-GATE block and process overview**

Append to `SKILL.md`:

```markdown
<HARD-GATE>
在完成「需求收集」階段之前，不得開始撰寫任何內容。
必須先確認主題、目標讀者、Hook、技術細節後，才能進入大綱階段。
</HARD-GATE>

## 概述

這個 SKILL 引導你寫一篇技術部落格文章，遵循 `src/content/docs/blog/_template.md` 的 5 段式結構。

### 流程一覽

```dot
digraph writing_blog_posts {
    "需求收集" [shape=box];
    "大綱確認" [shape=box];
    "逐段撰寫" [shape=box];
    "整體審稿" [shape=box];
    "寫入檔案" [shape=doublecircle];

    "需求收集" -> "大綱確認";
    "大綱確認" -> "逐段撰寫";
    "逐段撰寫" -> "整體審稿";
    "整體審稿" -> "寫入檔案" [label="通過"];
    "整體審稿" -> "逐段撰寫" [label="需修改"];
}
```

### 中斷恢復

如果對話中斷，重新載入此 SKILL 時先確認上次進度：

1. 檢查已經完成到哪個階段
2. 已確認的段落內容保留，不需重新產生
3. 從中斷處繼續

### 多語言支援

開始前先詢問使用者：**「這篇文章要寫中文還是英文？」**

- 中文：日期格式使用 `zh-CN` locale，文章用語為繁體中文
- 英文：日期格式使用 `en-US` locale，文章用語為英文

預設為中文。
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add HARD-GATE, process overview, recovery, and multi-language support"
```

---

### Task 3: Write Stage 1 - 需求收集

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append 需求收集 stage**

```markdown
## 階段 1：需求收集

一次問一個問題，引導使用者聚焦。等使用者回答後再問下一題。

問題清單（依序提問）：

1. **主題**：今天要寫的主題是什麼？請用一句話描述。
2. **目標讀者**：這篇文章是寫給誰看的？（例如：前端初學者、後端工程師、DevOps 團隊）
3. **Hook**：為什麼這件事值得今天花時間寫？讀者為什麼要關心？
4. **技術細節**：有沒有具體的：
   - 踩坑經驗（原本怎麼寫 → 出什麼錯 → 怎麼修）
   - 設計決策（A 方案 vs B 方案的取捨）
   - 關鍵技巧（學到一個好東西/技巧）

收集完後，簡短總結給使用者確認。
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add stage 1 - requirements collection"
```

---

### Task 4: Write Stage 2 - 大綱確認

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append 大綱確認 stage**

```markdown
## 階段 2：大綱確認

根據需求收集的結果，產生完整的 5 段式大綱。格式如下：

```markdown
## 大綱

**Hook（鉤子）**
一句話：<擬寫的 hook>

**Context（背景與動機）**
- <預計要寫的背景 1>
- <預計要寫的背景 2>

**Practice（核心實作）**
- 採用 <踩坑型 / 推導型 / 關鍵技巧型> 寫法
- 預計展示的關鍵程式碼：<簡述>

**Reflection（練習後反思）**
- <預計要寫的反思點>

**Next Step（下一步）**
- <預計的收尾方向>
```

請使用者確認或修改大綱。**通過後才能進入階段 3**。
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add stage 2 - outline confirmation"
```

---

### Task 5: Write Stage 3 - 逐段撰寫

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append 逐段撰寫 stage**

```markdown
## 階段 3：逐段撰寫

依序撰寫每一段。**寫完一段 → 使用者確認 → 再寫下一段。**

### 寫作規範（參考 _template.md）

- 總長度：讀完約 3~5 分鐘（約 800~1500 字）
- 不含程式碼的純文字大約 600~1000 字
- 程式碼區塊 1~3 段，每段不超過 20 行
- 每多一段程式碼，就要多一段文字解釋
- Practice 段落為全文 50~60%

### Hook（鉤子）— 1~2 句

不說「我今天學了 X」，而是說「為什麼這件事值得今天花時間」。讓讀者一秒共鳴。

### Context（背景與動機）— 3~5 句

說明原本遇到的問題、為什麼選這個主題來練。可寫：
- 之前卡關的點
- 看到誰的文章/影片/專案受到啟發
- 這次練習想驗證什麼假設

### Practice（核心實作）— 全文 50~60%

從大綱確認的三種寫法中選一種，嚴格遵守：

- **不要貼完整檔案**，只貼最關鍵的 5~15 行程式碼
- **每段程式碼前面一定要有一句話解釋**「這段在做什麼」
- **程式碼後面一定要有一句話解釋**「這樣做的好處是什麼」

推薦節奏：文字解釋問題 → 程式碼區塊 → 一句話總結 → 文字解釋下一步 → 程式碼區塊 → 一句話總結

### Reflection（練習後反思）— 3~5 句

做完之後的感覺，跟預期有哪裡不一樣。可寫：
- 這個方法比想像中難/簡單的地方
- 過程中發現自己原本的盲點
- 跟網路上教學文說的哪裡一致、哪裡不同

這是「故事性」的靈魂——讀者不是來看標準答案，是來看你的思考過程。

### Next Step（下一步）— 2~3 句

收在「未完待續」的感覺。暗示你是有計劃地在進步，不是隨興所至。
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add stage 3 - section-by-section drafting"
```

---

### Task 6: Write Stage 4 - 整體審稿

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append 整體審稿 stage**

```markdown
## 階段 4：整體審稿

文章完成後，對照 `_template.md` 的檢查清單逐項檢查：

| 問題 | 通過？ |
|------|--------|
| 看完鉤子，讀者想知道更多嗎？ | |
| 核心實作有「我原本以為 → 後來發現」的轉折嗎？ | |
| 程式碼有被文字解釋包圍嗎？ | |
| 反思有誠實寫出「跟預期不一樣」的地方嗎？ | |
| 全文只講一個主題嗎？ | |

如果任一項未通過，回到階段 3 修改對應段落。全部通過後進入階段 5。
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add stage 4 - review checklist"
```

---

### Task 7: Write Stage 5 - 寫入檔案 and Frontmatter Rules

**Files:**
- Modify: `.opencode/skills/writing-blog-posts/SKILL.md`

- [ ] **Step 1: Append 寫入檔案 stage and frontmatter rules**

```markdown
## 階段 5：寫入檔案

### Frontmatter 產生規則

```yaml
---
title: <從主題提煉，與檔案名稱一致>
description: <簡短描述，用於搜尋與摘要>
date: <當天日期 YYYY-MM-DD>
tags: [<從內容推斷，使用者可調整>]
author: <使用者名稱或預設值>
summary: <從內容摘要，首頁用>
related: []     # 相關文章 slug，可選，預設空陣列
isBlog: true
draft: true     # Starlight 不會渲染此頁面，確認發布後改 false
---
```

### Slug 產生規則

- 從 title 自動產生
- 全小寫
- 空白換成連字號 `-`
- 移除特殊字元
- 範例：`"在 Windows 上使用 LLM Studio"` → `local-llm-architecture`（或者更貼近英文 slug）

### 檔案路徑

寫入到 `src/content/docs/blog/<slug>.md`

### 最終提示

完成後告知使用者：
- 檔案已寫入的路徑
- 提醒 `draft: true`，發布前需改為 `false`
- 建議檢查 `tags` 和 `related` 是否正確
- 可用 `npm run dev` 預覽
```

- [ ] **Step 2: Commit**

```bash
git add .opencode/skills/writing-blog-posts/SKILL.md
git commit -m "feat: add stage 5 - file writing and frontmatter rules"
```

---

### Task 8: Self-Review Checklist

**Files:** None (verification only)

- [ ] **Step 1: Verify spec coverage against plan**

| Spec Requirement | Covered In |
|-----------------|------------|
| HARD-GATE 提醒 | Task 2 |
| 5 階段流程 | Tasks 3-7 |
| Frontmatter 規則 | Task 7 |
| 寫作規範 | Task 5 |
| 檢查清單 | Task 6 |
| 中斷恢復 | Task 2 |
| 多語言支援 | Task 2 |
| 檔案寫入規則 | Task 7 |

- [ ] **Step 2: Verify SKILL.md loads correctly**

Run:
```bash
Get-ChildItem -LiteralPath ".opencode/skills/writing-blog-posts/SKILL.md"
```
Expected: File exists and is readable.

- [ ] **Step 3: Check OpenCode can discover the skill**

Run:
```bash
opencode list skills
```
Expected: `writing-blog-posts` appears in the list with its description.

(Note: If `opencode list skills` is not available, verify the file structure matches OpenCode's discovery paths.)

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete writing-blog-posts SKILL with 5-stage guided process"
```
