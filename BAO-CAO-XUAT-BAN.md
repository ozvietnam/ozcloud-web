# Báo cáo xuất bản loạt bài đầu tiên về OpenClaw

Ngày: 2026-08-15 · Commit: `8e479a8` (đã push lên `main`, Vercel tự deploy)

## 1. Đã đăng gì (7 bài, tất cả cùng ngày 15/08/2026)

| File | Chủ đề |
|---|---|
| `zalo-01-noi-openclaw-vao-zalo-oa.md` | Cách nối OpenClaw vào Zalo OA từng bước |
| `zalo-02-ba-cach-noi-zalo.md` | 3 cách nối Zalo, cái nào an toàn |
| `zalo-03-bot-zalo-tra-khach-24-7.md` | Bot Zalo trả khách 24/7 cho chủ shop |
| `zalo-04-loi-hay-gap-khi-noi-zalo.md` | Lỗi hay gặp khi nối Zalo với OpenClaw |
| `ram-02-vi-sao-openclaw-tu-tat-luc-3-gio-sang.md` | Vì sao OpenClaw tự tắt lúc 3 giờ sáng (OOM) |
| `bot-01-bot-online-ma-khong-tra-loi.md` | Bot online mà không trả lời — nguyên nhân |
| `checklist-an-toan-openclaw-12-muc.md` | Checklist tự kiểm an toàn 12 mục (đổi tên từ bản cũ) |

Build xanh: `node build.mjs` in ra `Bài viết: 7`, đủ 10 trang. KPI "Bài viết đã xuất bản" trong `van-hanh.json` cập nhật từ 0 → 7.

## 2. Đã sửa gì trước khi đăng

- **Thiếu front matter bắt buộc (cả 7 bài).** Bản nguồn chỉ có `title`/`description`/`keywords`, chưa có `date` và `tac_gia`. Đã thêm cả hai (`date: 2026-08-15`, `tac_gia: Agent OZ Cloud`). Đây là điểm suýt trượt: chỉ vì build có fallback mặc định nên lỗi này không làm hỏng build, dễ bỏ qua.
- **Lỗi truy nguồn ở 2 bài về vòng lặp reconnect** (`zalo-02`, `zalo-04`). Bản gốc viết tài khoản "bị giới hạn 48–72 giờ" do 3.500 chu kỳ kết nối — nghe cứ như Zalo. Kiểm lại nguồn (`MARKETING_OPENCLAW.md`) thì ca đó ghi nhận trên **WhatsApp**. Đã sửa để ghi rõ nguồn là WhatsApp, coi là bài học chung cho bài toán auto-reconnect, không khẳng định Zalo sẽ bị ban y hệt.
- **Lỗi gõ tiếng Việt** `zalo-03`: "không phải đuy người" → "không phải đuổi người".
- **`.gitignore` thêm `public/`** để không commit build output (Vercel tự sinh lại). Giữ nguyên `tai-lieu/` bị bỏ qua — tài liệu nội bộ (kế hoạch marketing/kinh doanh, có số liệu và định vị cạnh tranh) không được lên mạng công khai.

## 3. Bộ tự kiểm — mục nào suýt trượt

| # | Mục tự kiểm | Kết quả | Ghi chú |
|---|---|---|---|
| 1 | Mọi số phải truy được nguồn | Đạt | Số RAM/exit 137, 3.500 chu kỳ, 48–72h, 40.214 instance... đều có trong `tai-lieu/`. **Suýt trượt** ở 2 bài nói "ban tài khoản 48–72h" mà không rõ là WhatsApp — đã sửa. |
| 2 | Không hứa cái chưa có | Đạt | Không nơi nào ghi "đã sẵn sàng/giao ngay"; dùng "đang triển khai", "một số nơi có gói" (nói về thị trường chung, không nhận vơ của mình). |
| 3 | Không dìm đối thủ | Đạt | Không nêu tên chê đối thủ; chỉ cảnh báo chung về bảng specs VPS do nhà bán tự đặt. |
| 4 | Không nhận vơ thành tích | Đạt | KPI khách vẫn 0; "chưa có khách" giữ nguyên. |
| 5 | Không lộ thông tin cá nhân | Đạt | Không có tên/liên hệ người cụ thể. |
| 6 | Không khoá/token/IP nội bộ | Đạt | `git grep -inE "sk-|token=|password=|192\.168\." -- noi-dung du-lieu` sạch (chạy 2 lần, lần cuối sau mọi sửa đổi). |
| 7 | Giọng văn người thật | Đạt | Các bài đọc như người rành kỹ thuật chỉ cho bạn, không sáo rỗng, không "giải pháp hàng đầu". |
| 8 | Bài kỹ thuật có bước làm được | Đạt | Mỗi bài có lệnh cụ thể (`openclaw config set ...`, `ss -tlnp | grep 18789`, `free -h`...). |

## 4. Còn chưa làm / dặn lại

- **`tai-lieu/` nằm trong `.gitignore`** nên người đọc sau không thấy nguồn ngay trong repo công khai; nếu cần minh bạch hết mức thì cân nhắc tách một bản "nguồn công khai" riêng. Hiện để vậy để tránh lộ kế hoạch nội bộ.
- Bài gốc có chỗ đánh dấu `[ANH: ảnh chụp màn hình ...]` trong `zalo-01` (chưa có ảnh). Đã đăng nội dung; ảnh minh hoạ là việc sau, không chặn xuất bản.
- Số liệu bảo mật (40.214 instance, tỉ lệ RCE...) có ngày khảo sát 09/02/2026 ghi sẵn trong bài — mục đích là người đọc biết độ cũ của số liệu.
