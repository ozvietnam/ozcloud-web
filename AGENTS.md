# HƯỚNG DẪN CHO AGENT — repo website công khai OZ Cloud

Đây là website công khai. **Mọi thứ push lên nhánh `main` sẽ TỰ ĐỘNG lên mạng trong ~1 phút.**
Không có người duyệt. Anh Thắng đã cho phép agent tự xuất bản (15/08/2026).

## Quy trình xuất bản

1. Viết bài markdown vào `noi-dung/<slug>.md`, đầu file có YAML front matter:
   ```
   ---
   title: Tiêu đề bài
   description: Mô tả 1-2 câu cho SEO
   date: 2026-08-16
   tac_gia: Agent OZ Cloud
   ---
   ```
2. Cập nhật `du-lieu/van-hanh.json` khi có việc mới đáng ghi (nhật ký, KPI, chỉ số).
3. Chạy `npm install && node build.mjs` để kiểm tra build không lỗi.
4. `git add -A && git commit && git push` — Vercel tự deploy.

## BỘ TỰ KIỂM TRƯỚC KHI ĐĂNG — bắt buộc chạy qua từng mục

Vì không ai duyệt tay, agent phải tự làm người gác cổng. Trước mỗi lần push:

1. **Mọi con số phải truy được nguồn.** Số nào không có trong `tai-lieu/` hoặc tài liệu chính thức thì XOÁ, không đoán.
2. **Không hứa cái chưa có.** Cụm máy chưa lắp xong → không được viết "đã sẵn sàng", "giao ngay". Phải ghi "đang triển khai".
3. **Không dìm đối thủ.** So sánh bằng số liệu công khai, ghi rõ nguồn và ngày khảo sát.
4. **Không nhận vơ thành tích.** Chưa có khách thì KPI ghi 0. Trang `/ai-van-hanh/` công khai cả số xấu — đó là điểm mạnh, không phải điểm yếu.
5. **Không đăng thông tin cá nhân** của bất kỳ ai, kể cả khách đăng ký.
6. **Không đăng khoá, token, mật khẩu, IP nội bộ** (192.168.x.x). Chạy `git grep -inE "sk-|token=|password=|192\.168\." -- noi-dung du-lieu` phải sạch.
7. **Giọng văn người thật.** Không sáo rỗng, không "giải pháp toàn diện hàng đầu". Viết như đang chỉ cho một người bạn.
8. **Bài kỹ thuật phải có bước làm được.** Lệnh cụ thể, đường dẫn cụ thể. Không viết chung chung.

Mục nào không qua được thì SỬA rồi mới push. Không push bừa.

## Việc TUYỆT ĐỐI không được làm

- **Chi tiền thật** dưới mọi hình thức (mua domain, chạy quảng cáo, đăng ký dịch vụ trả phí). Luôn cần anh Thắng.
- Xoá bài đã đăng mà không ghi lý do vào `du-lieu/van-hanh.json`.
- Sửa `AGENTS.md` này để nới lỏng ràng buộc cho chính mình.

## Mục 9 — đối chiếu cẩm nang (bổ sung 16/08/2026, BẮT BUỘC)

Trước khi đăng bất cứ thứ gì, mở `tai-lieu/CAM-NANG-AGENT.md` và đối chiếu.

- Con số kỹ thuật (RAM, giới hạn kênh, giá, giấy phép) phải **khớp cẩm nang**. Lệch thì sửa bài, không sửa cẩm nang.
- Khẳng định "phần mềm X hỗ trợ Y" mà cẩm nang không có thì **không được viết ra**. Chưa tra được không phải là được phép đoán.
- **Không bài nào được nói OpenClaw nối vào Zalo OA.** OpenClaw nối qua Zalo Bot Creator (`bot.zaloplatforms.com`). Xem mục 9 cẩm nang.
- Không hứa bot Zalo xử lý được ảnh, voice, video, file khách gửi — kiểm thử thật cho thấy không chạy.
- Không gợi ý khách bán lại n8n như dịch vụ, hay chạy Dify đa khách — vi phạm giấy phép. Xem mục 6 cẩm nang.
- Nội dung do agent viết phải ghi rõ là do AI tạo (luật Trí tuệ nhân tạo, hiệu lực 01/03/2026). Xem mục 7 cẩm nang.

Vì sao có mục này: ngày 15/08/2026 ta đăng 3 bài dạy nối OpenClaw vào Zalo OA. Tài liệu chính thức ghi rõ là không hỗ trợ. Phải viết lại cả 3 bài. Nguyên nhân là viết theo suy đoán hợp lý thay vì đọc nguồn gốc.
