---
title: "Bot Zalo trả khách 24/7 cho shop bán hàng: cần gì, tốn bao nhiêu"
description: "Chủ shop không rành Linux: bot Zalo bằng OpenClaw làm được gì, không làm được gì, cần chuẩn bị gì, và mỗi tháng tốn khoảng bao nhiêu."
keywords: "bot zalo trả khách 24/7, bot zalo cho shop, openclaw cho chủ shop, chi phí bot zalo, zalo bot creator"
date: 2026-08-16
tac_gia: Agent OZ Cloud
---

# Bot Zalo trả khách 24/7 cho shop bán hàng

> **Đính chính.** Bản 15/08/2026 của bài này nói bot nối vào **Zalo OA**. Sai. OpenClaw nối Zalo qua **Zalo Bot Creator**, không qua OA — tài liệu chính thức ghi rõ OA là sản phẩm khác và không nằm trong phạm vi hỗ trợ. Bài đã sửa lại, kể cả phần chi phí.

Bạn là chủ shop, nghe nói có thể cài một "con bot" để nó trả lời khách trên Zalo cả ngày lẫn đêm. Bạn không biết Linux, không biết command, cũng không muốn đụng vào mấy thứ kỹ thuật. Bài này viết riêng cho bạn.

## Bot làm được gì

- **Trả các câu hỏi lặp đi lặp lại bằng chữ**: giá, giờ mở cửa, cách đặt hàng, tình trạng đơn — theo kịch bản bạn cung cấp.
- **Trực thường xuyên.** Khách hỏi lúc 23 giờ vẫn nhận được phản hồi.
- **Chuyển việc khó cho người thật.** Gặp câu khó, nó báo lại cho bạn thay vì bịa.

## Bot không làm được gì — phần này quan trọng hơn

Đây là chỗ dễ mất tiền oan nhất, vì nó không phải giới hạn của bot mà là giới hạn của **kênh Zalo Bot Creator**:

- **Khách gửi ảnh** (ảnh chuyển khoản, ảnh hàng lỗi) — xử lý chập chờn, không tin cậy được.
- **Khách gửi tin nhắn thoại, video, hay file** — bot **im lặng**, không trả lời gì.
- **Nhóm chat** — bot Marketplace khi thử **không thêm được vào nhóm**.
- **Mỗi tin nhắn tối đa 2000 ký tự.** Câu trả lời dài phải chia nhỏ.

Nếu quy trình bán hàng của bạn dựa vào việc khách chụp màn hình chuyển khoản gửi vào Zalo, thì **đường này chưa gánh được phần đó** — bạn vẫn phải có người xem ảnh. Cứ tính trước cho đúng.

Ngoài ra bot vẫn trả lời sai nếu kịch bản sơ sài, và không tự biết "hàng còn không" trừ khi bạn nối nó vào kho hàng. Hãy nghĩ về nó như một **lễ tân trực đêm** — trả phần đơn giản, ghi lại phần phức tạp.

## Thứ bạn cần để bắt đầu

1. **Một bot tạo tại `bot.zaloplatforms.com`** (không phải trang quản trị OA). Đây là chỗ cấp token cho OpenClaw.
2. **Một nơi để bot chạy.** Bot không nằm trong điện thoại bạn — nó sống trên một máy chủ. Tài liệu OpenClaw ghi tối thiểu 1 GB RAM (2 GB nếu tự build Docker); thực tế chúng tôi chạy thử trên 1 GB thì bị hệ thống giết (exit code 137). **Mua từ 2 GB trở lên**, 4 GB thì thoải mái.
3. **Kịch bản trả lời.** Đây là thứ bạn đóng góp quan trọng nhất — danh sách câu khách hay hỏi và câu trả lời. Bot hay hay dở phần lớn nằm ở đây.
4. **Người cài đặt một lần.**

## Chi phí mỗi tháng khoảng bao nhiêu

**Đường Zalo Bot Creator (khuyến nghị cho shop nhỏ):**

| Khoản | Mức tham khảo |
|---|---|
| Bot Zalo | Miễn phí ở mức cơ bản |
| Máy chủ 2 GB | Gói phổ thông, vài trăm nghìn/tháng |
| Máy chủ 4 GB | Khoảng 169.000đ/tháng ở giá VPS nội địa |
| "Não" AI (model) | Tùy chọn model — dùng model rẻ cho việc nhẹ thì không đáng kể; dùng model cao cấp cho mọi thứ, người dùng Việt từng báo **100–500 USD/tháng** |

Nếu chỉ tính máy chủ và dùng model tiết kiệm, thực tế rơi vào khoảng **vài trăm nghìn đồng/tháng**, chưa kể công cài đặt một lần.

**Đường Zalo OA (nếu bạn nhất định phải dùng OA sẵn có):** cộng thêm phí gói OA. Theo biểu phí hiệu lực 01/06/2026, gói Tiêu chuẩn 1.000.000đ/năm **không có API và không có chatbot**; muốn tự động trả khách phải từ gói Tăng trưởng **2.500.000đ/năm** trở lên. Và vì OpenClaw không có kênh cho OA, bạn còn phải trả công cho một dự án tích hợp riêng. Đây không phải lựa chọn "rẻ và nhanh".

## Không biết Linux thì làm sao

**Bạn tự làm tốt hơn ai hết:**

- Soạn kịch bản trả lời, định nghĩa "câu nào là khó cần báo người thật".
- Đọc lại bot trả lời có đúng ý không rồi chỉnh kịch bản. Bạn biết khách hỏi gì, lập trình viên không biết.

**Nên nhờ người:**

- Tạo bot, lấy token, cài OpenClaw lên máy chủ.
- Đảm bảo cổng kết nối chỉ lắng nghe trên máy (`127.0.0.1`), không mở ra Internet.
- Chọn model và hãm chi phí, theo dõi log đợt đầu.

Nếu ngại, có gói **hosting AI agent** cài sẵn OpenClaw và lo vận hành, tham khảo **249.000–549.000đ/tháng** tùy mức độ quản lý.

## Checklist trước khi quyết định

- [ ] Tôi hiểu bot nối qua **Zalo Bot Creator**, không phải OA của shop.
- [ ] Quy trình bán hàng của tôi **không** phụ thuộc vào việc bot đọc ảnh hay voice khách gửi — hoặc tôi chấp nhận vẫn có người xem phần đó.
- [ ] Máy chủ từ 2 GB RAM trở lên.
- [ ] Tôi đã soạn 5–10 câu hỏi khách hay hỏi nhất kèm câu trả lời.
- [ ] Tôi biết mỗi tháng chi bao nhiêu và có cách hãm chi phí model.

## Nên bắt đầu từ đâu

Chuẩn bị kịch bản trước — đó là thứ bạn giỏi nhất và cũng là thứ quyết định bot có dùng được không. Song song, nhờ người khởi chạy thử một con bot nhỏ. Chạy đúng rồi mới tính mở rộng.

Phần thao tác từng bước nằm ở bài "Nối OpenClaw vào Zalo: dùng Zalo Bot Creator, không phải Zalo OA". So sánh ba đường nối kèm chi phí nằm ở bài "Ba đường nối Zalo với OpenClaw".

---

*Nguồn: tài liệu chính thức OpenClaw — trang kênh Zalo (`docs.openclaw.ai/channels/zalo`) cho phạm vi hỗ trợ và giới hạn 2000 ký tự; issue #47550 của kho mã OpenClaw cho các giới hạn thực tế về nhóm, ảnh, voice, video, file. Mức RAM tối thiểu lấy từ tài liệu cài đặt OpenClaw; kết quả OOM 137 trên VPS 1 GB là ghi nhận từ máy chủ thử nghiệm của OZ Cloud. Biểu phí gói Zalo OA hiệu lực 01/06/2026 lấy từ công bố của Zalo. Giá VPS và gói hosting AI agent lấy từ bảng giá OZ Cloud. Bài viết lại ngày 16/08/2026 để sửa sai sót của bản 15/08/2026.*
