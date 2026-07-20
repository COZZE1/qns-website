# 发布到 GitHub — 操作说明（给你点的）

## 先看清：私人仓库还是公开？

你要的是：**大家能打开网站看，但不等于开源给人随便抄。**

| 做法 | 免费？ | 网站给大家看 | 代码仓库别人能否打开 |
|------|--------|--------------|----------------------|
| GitHub **公开**仓库 + Pages | 免费 | 能 | 能打开仓库（但 LICENSE 禁止商用/盗用） |
| GitHub **私人**仓库 + Pages | 一般要付费 | — | 不能 |
| **私人**仓库 + Cloudflare Pages | 免费 | 能 | 不能看仓库 |

**结论：**  
- 用免费 GitHub Pages → 仓库请建 **Public（公开）**，并放上我们写好的 `LICENSE`（写明禁止开源复用）。  
- 若坚持仓库也保密 → 用 Cloudflare Pages（我也可下一步帮你），不要设成 Private 还指望免费 GitHub Pages。

公开仓库 ≠ 开源授权；我们的 LICENSE 是 **All Rights Reserved**。

---

## 你需要做的（约 10 分钟）

### 1. 注册 / 登录 GitHub
https://github.com/signup

### 2. 新建仓库
1. 右上角 **+** → **New repository**  
2. Repository name：`qns-website`  
3. 选 **Public**  
4. **不要**勾选 “Add a README”（我们本地已有文件）  
5. Create repository  

### 3. 把本文件夹上传上去

本机发布目录：

`e:\WEB\publish-github`

**方法 A — 网页上传（最简单）**  
1. 打开新仓库页面  
2. 点 **uploading an existing file**  
3. 把 `publish-github` **里面的所有文件和文件夹**拖进去（不要多拖一层 `publish-github` 空壳）  
4. Commit  

**方法 B — 命令行**（装好 Git 后，在 `publish-github` 目录执行；把 `YOUR_USER` 换成你的用户名）：

```bash
git init
git add .
git commit -m "Publish Quantum Narrative School official site"
git branch -M main
git remote add origin https://github.com/YOUR_USER/qns-website.git
git push -u origin main
```

### 4. 打开 GitHub Pages
1. 仓库 → **Settings** → 左侧 **Pages**  
2. Source：Deploy from a branch  
3. Branch：`main`，文件夹：`/ (root)` → Save  
4. 等 1–3 分钟，访问：  
   `https://YOUR_USER.github.io/qns-website/`

### 5. 域名（可选，稍后）
仓库里已有 `CNAME` = `www.q-n-s.com`。  
确认 Pages 预览正常后，再去域名 DNS 把 `www` CNAME 到 `YOUR_USER.github.io`。  
**未改 DNS 前**，旧站 q-n-s.com 仍指向原来的主机，不会被立刻冲掉。

---

## 我这边已准备好的内容

- 界面：desktop 正式版  
- `LICENSE`：禁止开源/商用  
- `guard.js`：防盗 + 证据回传；已允许 `*.github.io` 预览  
- `CNAME`：留给绑定 www.q-n-s.com  

你建好仓库并告诉我 **GitHub 用户名** 后，若命令行推送需要协助，把仓库地址发我即可继续。
