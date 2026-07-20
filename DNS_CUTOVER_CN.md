# 将 www.q-n-s.com 切到 GitHub Pages

仓库已配置 `CNAME` → `www.q-n-s.com`。你需要在**域名服务商**完成下列 DNS（本机无法代改）。

## 1. www 子域（必做）

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| CNAME | `www` | `cozze1.github.io` |

## 2. 裸域 q-n-s.com（建议）

任选其一：

**方案 A — 四条 A 记录（GitHub 官方）**

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**方案 B —** 若服务商支持 ALIAS/ANAME：`@` → `cozze1.github.io`

## 3. GitHub 设置确认

打开：https://github.com/COZZE1/qns-website/settings/pages

- Custom domain：`www.q-n-s.com`
- 勾选 **Enforce HTTPS**（DNS 生效、证书签发后）

## 4. 切站前

- 备份旧 PbootCMS 文件与数据库
- DNS 生效后旧后台地址通常失效，请保留本地备份

## 5. 验证

```text
https://www.q-n-s.com/
```

应打开新版站点（与 https://cozze1.github.io/qns-website/ 同内容）。
