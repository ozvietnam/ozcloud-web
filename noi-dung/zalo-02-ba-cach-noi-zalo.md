---
title: "Ba đường nối Zalo với OpenClaw: đường nào chạy được, đường nào không"
description: "So sánh Zalo Bot Creator, tài khoản Zalo cá nhân và Zalo OA khi dùng với OpenClaw — kèm chi phí gói OA thật và rủi ro của từng đường."
keywords: "openclaw zalo, zalo bot creator, zalo oa api, bot zalo, openclaw zalo ca nhan"
date: 2026-08-16
tac_gia: Agent OZ Cloud
---

# Ba đường nối Zalo với OpenClaw: đường nào chạy được, đường nào không

> **Đính chính.** Bản 15/08/2026 của bài này gọi "bot chuẩn qua Zalo OA" là đường được khuyến khích nhất. Sai. OpenClaw **không** nối vào Zalo OA — tài liệu chính thức ghi rõ OA là một sản phẩm khác và trang kênh Zalo không bao gồm nó. Bài đã được viết lại toàn bộ.

Người hỏi chúng tôi nhiều nhất câu này: "Tôi có OA rồi, cắm OpenClaw vào là xong đúng không?" Câu trả lời ngắn: **không**. Dưới đây là ba đường thật, kèm cái giá của từng đường.

## Đường 1: Zalo Bot Creator — đường duy nhất OpenClaw hỗ trợ chính thức

Bot tạo tại `bot.zaloplatforms.com`, cấp một token, đưa token vào OpenClaw là chạy. Đây là kênh có trong tài liệu, có người bảo trì, có giới hạn được ghi rõ.

**Được:** nhắn riêng với khách, gửi và nhận văn bản, cấu hình bằng một biến môi trường, miễn phí ở mức cơ bản.

**Không được (đã kiểm thử thật):** bot Marketplace **không thêm được vào nhóm**; ảnh khách gửi vào xử lý chập chờn; **voice, MP3, video, file đính kèm gửi vào thì bot im lặng**; đường dẫn kèm xem trước cũng không kích hoạt trả lời. Thêm nữa: tin nhắn tối đa **2000 ký tự**, media **5 MB**, webhook **120 lượt/60 giây**.

**Hợp với:** shop cần trả câu hỏi lặp đi lặp lại bằng chữ — giá, giờ mở cửa, cách đặt, tình trạng đơn.

**Không hợp với:** quy trình mà khách phải gửi ảnh chuyển khoản, ảnh sản phẩm lỗi, hay tin nhắn thoại.

## Đường 2: Tài khoản Zalo cá nhân (đăng nhập bằng QR)

OpenClaw có một kênh riêng cho tài khoản Zalo cá nhân — đăng nhập bằng cách quét mã QR, giống như bạn đăng nhập Zalo Web.

**Được:** dùng chính tài khoản đang có, khách nhắn vào số quen thuộc, không phải giải thích với ai "bot của shop nằm ở đâu".

**Cái giá:** đây là đường đi ngoài kênh chính thức của Zalo dành cho doanh nghiệp. Rủi ro nằm ở phía tài khoản của bạn — hạn chế, khoá, hoặc thay đổi phía Zalo làm gãy kết nối bất cứ lúc nào mà không ai báo trước. Nếu tài khoản đó cũng là tài khoản cá nhân bạn đang dùng hằng ngày, cân nhắc kỹ.

**Hợp với:** thử nghiệm, dùng nội bộ, người muốn xem bot trả lời trông thế nào trước khi đầu tư.

**Không hợp với:** vận hành kinh doanh lâu dài mà bạn không chấp nhận được rủi ro mất tài khoản.

## Đường 3: Zalo OA — OpenClaw không cắm thẳng vào được

Đây là chỗ nhiều người vỡ mộng, nên nói cho rõ.

Zalo OA có API và có chatbot, **nhưng OpenClaw không có kênh cho OA**. Muốn dùng OA, bạn phải tự viết lớp trung gian: nhận webhook từ OA, chuyển vào OpenClaw, lấy câu trả lời, gọi API OA gửi lại. Đó là một dự án tích hợp, không phải một bước cấu hình.

Và trước khi tính chuyện đó, phải nhìn bảng giá. Theo biểu phí OA có hiệu lực từ **01/06/2026**:

| Gói OA | Giá | API / chatbot |
|---|---|---|
| Tiêu chuẩn | 1.000.000đ/năm | **Không có API, không có chatbot** |
| Tăng trưởng | 2.500.000đ/năm | Có, 10 kịch bản |
| Toàn diện | 6.000.000đ/năm | Có, 50 kịch bản |

Nghĩa là gói rẻ nhất **không dùng được cho bot**. Muốn tự động trả khách trên OA, sàn khởi điểm là **2.500.000đ/năm** cho riêng phần Zalo, chưa tính máy chủ, chưa tính công tích hợp.

**Hợp với:** doanh nghiệp đã có lượng khách quan tâm OA đáng kể và sẵn sàng trả tiền cho một dự án tích hợp riêng.

**Không hợp với:** shop nhỏ muốn có bot trong tuần này.

## Chọn thế nào

- **Muốn có bot chạy sớm, ngân sách gọn, khách hỏi bằng chữ** → **Zalo Bot Creator**. Chấp nhận giới hạn về nhóm và media.
- **Chỉ muốn thử cho biết** → tài khoản cá nhân qua QR, nhưng đừng dùng tài khoản chính.
- **Đã có OA, có khách, có ngân sách** → gói OA từ Tăng trưởng trở lên, cộng một dự án tích hợp. Tính công và tính thời gian trước khi bắt đầu.

Chưa có đường nào miễn phí mà lại vừa an toàn vừa đủ tính năng. Ai nói ngược lại thì họ đang bỏ qua một cột trong bảng trên.

## Bước tiếp theo

Nếu bạn chọn đường 1, phần thao tác từng bước nằm ở bài "Nối OpenClaw vào Zalo: dùng Zalo Bot Creator, không phải Zalo OA". Nếu bạn muốn ước lượng chi phí chạy 24/7 trước khi quyết, đọc bài "Bot Zalo trả khách 24/7 tốn bao nhiêu".

---

*Nguồn: tài liệu chính thức OpenClaw — trang kênh Zalo (`docs.openclaw.ai/channels/zalo`) nêu rõ chỉ bao gồm Zalo Bot Creator / Marketplace bot chứ không bao gồm Zalo OA, và trang kênh Zalo cá nhân (`docs.openclaw.ai/channels/zalouser`). Các giới hạn thực tế về nhóm, ảnh, voice, video, file, link preview lấy từ issue #47550 của kho mã OpenClaw. Biểu phí gói Zalo OA hiệu lực 01/06/2026 lấy từ công bố của Zalo. Bài viết lại ngày 16/08/2026 để sửa sai sót của bản 15/08/2026.*
