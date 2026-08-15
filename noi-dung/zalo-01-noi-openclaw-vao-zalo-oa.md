---
title: "Cách nối OpenClaw vào Zalo OA của shop: hướng dẫn từng bước"
description: "Hướng dẫn chi tiết từng bước kết nối OpenClaw vào Zalo Official Account (OA) của shop, kèm các lệnh cụ thể để bot trả khách tự động."
keywords: "openclaw zalo, openclaw zalo oa, openclaw zalo official account, bot zalo openclaw, openclaw zalo oa hướng dẫn"
date: 2026-08-15
tac_gia: Agent OZ Cloud
---

# Cách nối OpenClaw vào Zalo OA của shop

Nếu shop của bạn có một Zalo Official Account (OA) và muốn nó chủ động trả lời khách mà không cần người ngồi cạnh điện thoại mỗi ngày, OpenClaw làm được việc đó. Đây là bài hướng dẫn đi từng bước, ghi rõ cả lệnh cần gõ trên máy chủ. Với người không rành kỹ thuật, cứ làm theo thứ tự, chỗ nào chưa hiểu thì nhờ người biết dùng Linux hỗ trợ.

## Trước khi bắt đầu: cần chuẩn bị gì

Nối OpenClaw vô Zalo OA không phải là mở trình duyệt bấm vài phát là xong. Bạn cần có ba thứ:

1. **Một máy chủ (VPS) có ít nhất 2 GB RAM, tốt nhất 4 GB.** OpenClaw với 1 GB RAM sẽ bị hệ điều hành giết (lỗi exit code 137, OOM). Mức 2 GB là tối thiểu cho một agent nhẹ, 4 GB mới gọi là thoải mái. Đây không phải khuyến nghị riêng của ai — docs chính thức của OpenClaw ghi rõ điều này.
2. **Một Zalo OA.** Nếu chưa có, đăng ký OA theo diện doanh nghiệp. Bot nối qua OA thường được xem là hợp lệ hơn những cách khác, ít rủi ro bị giới hạn tài khoản.
3. **Docker và quyền cài đặt trên VPS.** OpenClaw chạy mặc định qua Docker. Nếu VPS chưa có Docker thì phải cài trước.

> Mẹo nhỏ: nếu bạn không muốn tự lo VPS, nhiều nơi có gói "hosting AI agent" bao gồm cả cài sẵn OpenClaw và hỗ trợ. Với chủ shop không rành kỹ thuật, đây thường là hướng ít vất vả hơn. Phần này tôi nói kỹ hơn ở một bài riêng.

## Từng bước nối OpenClaw vào Zalo OA

Các bước dưới đây giả định bạn đã có máy chủ chạy Docker và OpenClaw đã được cài. Nếu chưa, làm phần chuẩn bị trước.

### Bước 1: Bật kênh Zalo trong cấu hình

OpenClaw nhận lệnh quản lý qua giao diện dòng lệnh `openclaw`. Bạn mở terminal trên VPS và kiểm tra danh sách kênh hiện có:

```
openclaw channels
```

Kết quả sẽ liệt kê các kênh đang hoạt động. Nếu chưa thấy Zalo, bạn cần bật kênh này lên. Cách đơn giản và an toàn nhất là dùng lệnh `set` thay vì sửa cả file cấu hình — vì lệnh `config.apply` sẽ thay thế *toàn bộ* config, dễ làm mất những cấu hình khác đang chạy tốt.

```
openclaw config set core.channels.zalo.enabled true
```

### Bước 2: Lấy quyền kết nối từ Zalo

Đây là phần nhạy cảm nhất. Để OpenClaw nhận tin nhắn từ OA, bạn cần cho nó quyền đọc và gửi tin nhắn trong kênh. Cách làm cụ thể phụ thuộc vào biến thể Zalo bạn chọn:

- **Bot chuẩn:** tạo credentials trên cổng dành cho nhà phát triển Zalo, lấy được cặp key cấu hình, sau đó dán vào cấu hình của OpenClaw.
- **ClawBot / QR login:** quét mã QR để đăng nhập tài khoản, giống cách bạn đăng nhập Zalo Web bằng điện thoại.

> Với người mới, tôi khuyên chọn đường OA và làm theo tài liệu chính thức của OpenClaw cho kênh Zalo. Đừng vội chọn đường quét QR đăng nhập tài khoản cá nhân, vì có rủi ro riêng — tôi giải thích kỹ ở bài "3 cách nối Zalo".

[ANH: ảnh chụp màn hình màn hình nhập credentials / mã QR đăng nhập trên OpenClaw]

### Bước 3: Cấu hình kênh Zalo

Sau khi có thông tin đăng nhập, đưa chúng vào cấu hình. Tùy biến thể bạn chọn, lệnh sẽ khác nhau, nhưng nhìn chung có dạng:

```
openclaw config set core.channels.zalo.appToken "<token_cua_ban>"
```

Thay `<token_cua_ban>` bằng giá trị thật. Có trường hợp bạn cần chỉnh thêm group_name, hoặc danh sách người được duyệt để bot trả lời.

> Chú ý: đừng dán token vào kênh chat chung và đừng commit token vào kho mã công khai. Token là chìa khoá của shop.

### Bước 4: Khởi động lại dịch vụ

Sau khi sửa cấu hình, khởi động lại OpenClaw để nó nhận thay đổi:

```
openclaw gateway restart
```

### Bước 5: Kiểm tra bot phản hồi

Gửi một tin nhắn thử từ một tài khoản Zalo khác vào OA. Nếu bot trả lời, coi như đường nối đã hoạt động.

[ANH: ảnh chụp màn hình một đoạn hội thoại khách hỏi, bot trả lời]

Lúc này có một điều dễ làm bạn tưởng bot hỏng: **bot online nhưng không trả lời.** Đừng vội nghĩ hỏng. Với các nhóm chat, OpenClaw thường bật sẵn "mention gating" — tức là trong nhóm phải *đề cập* (@) tên bot thì nó mới trả lời. Với tin nhắn riêng (DM), người gửi phải được duyệt trong danh sách pairing. Nếu gửi thử mà không thấy bot trả lời, kiểm tra hai thứ này trước khi đổ lỗi cho cấu hình.

## Sau khi hoạt động: việc cần ghi nhớ

- **Đừng để cổng kết nối mở ra Internet.** Nếu VPS của bạn mở cổng mặc định cho cả thế giới vào, đủ loại quét mò tới. Hệ quả nguy hiểm nhất là bị dùng để khai thác lệnh từ xa. Giữ cho cổng chỉ lắng nghe trên máy (bind 127.0.0.1), không dùng 0.0.0.0.
- **Token vừa cấp là sống với ràng buộc của kênh.** Nếu shop đăng (post) nội dung có đường dẫn, có thể dính lỗi liên quan tới việc xem trước đường dẫn trong tin nhắn — đây là điểm người khác có thể lợi dụng để nhét lệnh. Cẩn trọng với nội dung từ nguồn không đáng tin rồi dán thẳng vào OA.
- **Sao lưu cấu hình.** Khi bot chạy ổn định rồi, chụp lại (copy) file cấu hình để khi gỡ ra cất lại không phải làm lại từ đầu.

## Tóm lại

Nối OpenClaw vào Zalo OA thực chất chỉ vài thao tác: bật kênh, cấp quyền, đưa credentials vào, khởi động lại, rồi kiểm tra. Khó khăn đa phần nằm ở chỗ chọn đúng biến thể Zalo và giữ cho máy chủ đúng cấu hình (đủ RAM, không hở cổng). Nếu bạn không muốn tự bơi, hãy nhờ người có kinh nghiệm — hoặc chọn dịch vụ cài sẵn để bớt một đầu việc đau đầu.

Còn một vấn đề bạn nên đọc trước khi quyết định đi đường nào: ba cách nối Zalo với OpenClaw cái nào an toàn, cái nào rủi ro hoặc bị giới hạn tài khoản. Tôi viết riêng ở bài tiếp theo.

---

*Nguồn: Kế hoạch marketing OZ Cloud (MARKETING_OPENCLAW.md, 15/08/2026) và Kế hoạch kinh doanh (BUSINESS_PLAN.md, 13/08/2026). Các mức RAM, lỗi OOM 137, khuyến nghị an toàn cổng và coupling dựa theo tài liệu chính thức docs.openclaw.ai. Bản nháp do Anh Thắng duyệt trước khi đăng công khai.*
