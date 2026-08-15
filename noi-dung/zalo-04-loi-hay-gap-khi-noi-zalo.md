---
title: "Những lỗi hay gặp khi nối Zalo với OpenClaw và cách sửa"
description: "Tổng hợp các lỗi thường gặp khi kết nối OpenClaw với Zalo: bot không trả lời, config bị ghi đè, vòng lặp reconnect gây ban tài khoản, máy chết đêm — kèm cách kiểm tra và xử lý."
keywords: "openclaw zalo lỗi, openclaw zalo không trả lời, openclaw config.apply, openclaw reconnect ban, openclaw exit 137, openclaw oom"
date: 2026-08-15
tac_gia: Agent OZ Cloud
---

# Những lỗi hay gặp khi nối Zalo với OpenClaw

Kết nối OpenClaw vào Zalo chạy được một buổi chiều thì vui, nhưng để nó trụ lâu ngày lại là chuyện khác. Bài này liệt kê những lỗi phổ biến nhất mà người nối Zalo thường gặp, dấu hiệu nhận biết, và cách xử lý. Viết cho cả người kỹ thuật lẫn chủ shop có người thợ lo hộ — nên mô tả theo kiểu "triệu chứng" trước rồi mới tới cách sửa.

## 1. Bot online mà không trả lời

Đây là than phiền số một. Bot hiện "kết nối", nhưng bạn nhắn thử thì im lặng.

**Nguyên nhân thường gặp nhất không phải do hỏng:**

- **Mention gating bật sẵn.** Trong các nhóm chat, OpenClaw chỉ trả lời khi bạn *đề cập* (@) tên nó. Thả tin nhắn trơn không ai trả lời là do cái này.
- **Nhóm chưa nằm trong danh sách được phép (allowlist).** Bot được cấu hình chỉ hoạt động ở một số nhóm nhất định.
- **Người gửi DM đang chờ duyệt pairing.** Với tin nhắn riêng, người gửi phải được duyệt trong danh sách cho phép trước thì bot mới đối thoại.

**Cách xử lý:** Trước tiên thử gửi có dấu @ theo tên bot. Vẫn không phản hồi thì kiểm tra cấu hình nhóm và danh sách pairing — người gửi có được duyệt chưa, nhóm có nằm trong danh sách hoạt động không. Đa phần lỗi này nằm ở một trong ba điểm trên, không phải bot hỏng.

## 2. Cấu hình "tự nhiên" thay đổi, bot mất nết sau khi sửa

Bạn chỉ muốn đổi một dòng, nhưng sau khi áp dụng lại mọi thứ bị thay đổi, cấu hình cũ mất sạch.

**Nguyên nhân:** lệnh `config.apply` thay thế **toàn bộ** file cấu hình bằng giá trị trong cái bạn đưa vào. Vô tình ai đó áp dụng một config thiếu đầy đủ là những phần khác bay theo.

**Cách xử lý:** Đừng dùng `config.apply` trừ khi bạn chắc chắn đưa đủ toàn bộ nội dung. Thay vào đó dùng lệnh dạng `openclaw config set` hoặc `config.patch` để sửa **từng phần** — chỉ đụng đúng cái bạn muốn đổi, phần còn lại giữ nguyên. Nếu chưa quen, hãy sao lưu file cấu hình trước khi sửa (copy ra một bản dự phòng) để hỏng thì quay lại được.

## 3. Máy hết RAM, bot chết lúc 2–3 giờ sáng

Bot chạy chiều trưa khỏe, nửa đêm nằm xuống, sáng ra nhìn log thấy lỗi `exit code 137` và chữ `OOM`.

**Nguyên nhân:** Out-Of-Memory — hệ điều hành giết tiến trình khi máy hết RAM. Đây là lỗi kinh điển khi chạy OpenClaw trên máy **1 GB RAM** (docs chính thức ghi rõ mức này chết). Một cấu hình nhiều agent trên 2 GB cũng có thể chạm trần.

**Cách xử lý:** Nâng RAM máy chủ lên **4 GB** cho thoải mái (2 GB là mức tối thiểu cho một agent nhẹ). Giảm số agent chạy cùng lúc. Đừng trông chờ 1 GB "cũng được" — nó không chạy nổi OpenClaw. Kiểm tra `free -h` hoặc panel quản trị để xem RAM thật đang bao nhiêu trước khi mua.

## 4. Vòng lặp reconnect — nguy cơ bị giới hạn tài khoản

Con bot cứ nối – đứt – nối liên tục, log thấy hàng trăm lần thử kết nối trong ngắn hạn. Đây là lỗi nguy hiểm nhất vì hậu quả không chỉ ở máy mà lan sang tài khoản Zalo.

**Nguyên nhân điển hình:** hai hệ thống (service) trên cùng một máy **tranh nhau** nối vào một tài khoản. Có ca thật ghi nhận hơn **3.500 chu kỳ kết nối trong ~3 giờ** từ hai systemd service cạnh nhau — ca đó ghi nhận trên WhatsApp.

**Hậu quả:** nền tảng nhìn thấy hành vi bất thường và **giới hạn tài khoản trong 48–72 giờ** (mốc thời gian lấy từ ca WhatsApp nói trên; các nền tảng khác có thể phản ứng khác, nhưng đừng chờ đến lúc đó mới coi là rủi ro). Đã có đề xuất thêm cơ chế tự ngắt (circuit breaker) để chặn kiểu lặp này, nhưng hiện bị đóng với trạng thái "not planned" — nghĩa là **không có phanh tự động, bạn phải tự canh**.

**Cách xử lý:** Chỉ chạy **đúng một tiến trình** nối vào một tài khoản. Rà log, nếu thấy nối–đứt–nối dồn dập thì tắt ngay, không để qua đêm. Tốt nhất dùng tài khoản phụ cho bot, đừng dùng Zalo cá nhân chính để tránh mất khả năng liên lạc khi bị giới hạn.

## 5. Cổng bị mở ra Internet

Hệ thống chạy, nhưng từ bên ngoài có thể truy cập vào cổng mạng của OpenClaw. Nguy hiểm hơn bạn tưởng — không chỉ là "bị chậm".

**Nguyên nhân:** cấu hình lắng nghe trên `0.0.0.0` (mọi giao tiếp mạng) thay vì giới hạn trong máy; hoặc không có tường lửa chặn.

**Cách xử lý:** Chỉnh cho dịch vụ lắng nghe trên `127.0.0.1` (chỉ máy nội bộ). Kèm tường lửa chặn cổng đó từ ngoài. Trên các bản scan, một lượng lớn instance OpenClaw từng bị phơi ra Internet và một phần trong số đó bị khai thác từ xa — nên chuyện này đừng cho qua. Hạn chế nối OpenClaw ra "chỉ cho nội bộ" là đường an toàn vì kênh Zalo nối tới máy chủ qua kết nối ra ngoài, không cần lỗ nào thủng vào.

## 6. "Split-brain": file cấu hình cũ, chương trình mới

Bot chạy một logic nhưng cấu hình đang quản lý theo một logic khác, gây hành vi khó hiểu: sửa đúng chỗ mà không thấy đổi, hay ngược lại.

**Nguyên nhân:** phiên bản chương trình (binary) cũ còn sót lại quản lý config của phiên bản mới hơn.

**Cách xử lý:** Cập nhật đồng bộ cả chương trình lẫn config, không để một cái già một cái trẻ. Khởi động lại sạch sau khi nâng cấp. Khi không chắc, kiểm tra phiên bản đang chạy khớp với bản config.

## Tóm nhanh theo "triệu chứng → hành động"

| Triệu chứng | Bạn làm gì |
|---|---|
| Online nhưng im lặng | Gửi kèm @; kiểm tra allowlist nhóm; duyệt pairing người gửi |
| Sửa 1 dòng, mất hết config | Đừng dùng `config.apply`; dùng `config set` / `config.patch`; sao lưu trước |
| Chết lúc đêm, exit 137 / OOM | Nâng RAM lên 4 GB; giảm số agent |
| Nối–đứt–nối dồn dập | Tắt ngay; chỉ chạy một tiến trình; dùng tài khoản phụ |
| Cổng hở ra Internet | Sửa về `127.0.0.1`, mở tường lửa chặn |
| Sửa không ăn, hành vi lạ | Cập nhật đồng bộ binary + config |

## Kết luận

Phần lớn lỗi khi nối Zalo với OpenClaw không khó sửa, nhưng có hai chỗ đáng trả giá đắt nếu chủ quan: **config bị ghi đè** (mất cấu hình, làm lại công sức) và **vòng lặp reconnect** (có thể giới hạn tài khoản). Ghi nhớ hai cái đó là bạn né được phần thiệt hại nặng nhất. Chọn đúng cách nối Zalo và dựng từng bước cẩn thận sẽ giúp bot trụ được lâu ngày chứ không chỉ "chạy được một buổi chiều".

---

*Nguồn: Kế hoạch marketing OZ Cloud (MARKETING_OPENCLAW.md, 15/08/2026) — mục 3 các trụ 5 và 6 (mention gating, allowlist, pairing, `config.apply` thay thế toàn bộ config, vòng lặp reconnect 3.500 chu kỳ trong ~3 giờ dẫn tới hạn chế tài khoản 48–72 giờ, circuit breaker "not planned", split-brain); mức RAM 2/4 GB và lỗi exit 137 theo docs.openclaw.ai; số liệu instance phơi ra Internet theo SecurityScorecard 09/02/2026. Bản nháp do Anh Thắng duyệt trước khi đăng công khai.*
