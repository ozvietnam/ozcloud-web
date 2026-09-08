---
title: "Nhận máy là đủ tính năng: trợ lý kế toán Zalo trên VPS OZ Cloud làm được gì trong tuần đầu tháng 9/2026 — và 30 phút khởi động để nó chạy bằng AI của chính bạn"
description: "Danh sách tính năng thật của gói Doanh nghiệp tính đến 07/09/2026 (đọc file, đọc ảnh, gửi file, làm việc trong nhóm Zalo, tự chủ AI, khởi động 7 bước, kho skill), cái nào đã giao, cái nào còn thử nghiệm, và quy trình một lệnh để mọi máy mới ra lò đều đầy đủ như nhau."
keywords: "trợ lý kế toán Zalo, VPS AI agent, OpenClaw, gói Doanh nghiệp OZ Cloud, khởi động 7 bước, 9Router riêng, Gemini API key miễn phí, đọc hoá đơn PDF, nhóm Zalo kế toán, skill hub ClawHub, bàn giao VPS"
date: 2026-09-07
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Nhận máy là đủ tính năng: trợ lý kế toán Zalo trên VPS OZ Cloud làm được gì — và 30 phút khởi động

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud. Bài viết với sự hỗ trợ của AI (theo Luật Trí tuệ nhân tạo, hiệu lực 01/03/2026).*

Bài này trả lời một câu hỏi rất cụ thể mà khách hay hỏi trước khi chọn gói: *"Nhận máy về thì nó làm được gì ngay, tôi phải làm gì thêm, và máy của tôi có giống máy của người đăng ký trước không?"* Câu trả lời ngắn: từ 08/09/2026, mọi máy gói Doanh nghiệp được cài bằng **một kịch bản duy nhất**, nghiệm thu bằng **20 mục kiểm tự động**, và người dùng chỉ cần **30 phút khởi động** với trợ lý dẫn từng bước. Dưới đây là danh sách tính năng thật, kèm chỗ nào còn đang thử nghiệm.

## Trợ lý làm được gì ngay khi nhận máy

Một máy ảo riêng (12 vCPU · 32 GB RAM · 400 GB SSD) chạy [OpenClaw](https://docs.openclaw.ai) với ba agent con: *kế toán* (trả lời, điều phối), *đọc chứng từ*, *soạn thảo*. Người dùng chạm vào nó qua **Zalo Bot** của chính công ty — không cài thêm app.

| Nhóm | Việc cụ thể | Tình trạng 07/09 |
|---|---|---|
| Hỏi – đáp nghiệp vụ | Hạn nộp thuế, cách hạch toán một nghiệp vụ, tra HS code hàng nhập, soạn công văn ngắn | Đã giao, dùng hằng ngày |
| Đọc tệp gửi qua Zalo | PDF, Word, Excel, CSV; ảnh chụp chứng từ (đọc bằng mô hình nhìn ảnh, dự phòng OCR); tin nhắn thoại chuyển thành chữ | Đã giao |
| Trả kết quả dạng tệp | Soạn Word/Excel rồi gửi lại **đúng một cách**: đường link qua kho tệp của máy + ảnh xem trước 2 trang ngay trong Zalo. Trợ lý bị cấm tải tệp của bạn lên bất kỳ dịch vụ ngoài nào | Đã giao |
| Làm việc trong **nhóm Zalo** | Thêm bot vào nhóm kế toán, tag để hỏi; bot phân biệt *chủ nhân* / *đồng nghiệp* / *khách*; việc nhạy cảm bot xin phép chủ nhân riêng thay vì tự làm | Đã giao, đang chạy thật với một phòng kế toán |
| Nhớ ngữ cảnh | Mỗi người, mỗi nhóm một phiên; mở chủ đề song song bằng #tag | Đã giao |
| Email và Google Drive của công ty | Đọc hộp thư (IMAP, **chỉ đọc**, mật khẩu ứng dụng), đọc thư mục Drive bạn chia sẻ cho tài khoản đọc riêng của máy | Đã cài trên mọi máy, đang thử với hộp thư thật — chưa tính là "đã giao" |
| Tự chủ AI | Ba chế độ: AI của OZ (mặc định) / API key riêng / **9Router riêng trên máy bạn** gom mọi tài khoản bạn có — [bài trước](/blog/ke-toan-03-tu-chu-llm-khoa-rieng-9router-rieng/) | Đã giao; 9Router riêng nay cài **mặc định** cho mọi máy |
| Khi AI lỗi | Nếu mọi nhà cung cấp cùng hết hạn mức, bot nói thật, ghi lại câu hỏi và **tự trả lời bù** khi AI trở lại (kiểm 10 phút/lần) | Đã giao — sinh ra từ sự cố thật ngày 07/09 |
| Kho skill thế giới | Trợ lý dùng thêm skill từ [ClawHub](https://clawhub.ai) sau khi OZ soi giấy phép và an toàn; đợt đầu: đọc mọi định dạng tài liệu ra văn bản (markitdown) và lịch âm Việt Nam (tính hạn nộp quanh lễ Tết) | Đã cài trên mọi máy |

## 30 phút khởi động: trợ lý dẫn bạn 7 bước

Điểm mới nhất, và là thứ chúng tôi tự hào hơn cả danh sách trên: máy **không đòi hỏi bạn đọc tài liệu**. Nhận máy xong, chủ tài khoản nhắn riêng cho bot hai chữ `khoi dong`. Bot đọc trạng thái thật của máy và in ra bảng 7 bước, đánh dấu bước nào xong, bước nào là việc kế tiếp, kèm hướng dẫn đúng bước đó.

| Bước | Loại | Bạn làm | Bot làm |
|---|---|---|---|
| 1. Chủ nhân | bắt buộc | nhắn `chu nhan <mã>` (mã OZ đưa khi bàn giao) | ghi nhận người có quyền nhập khoá, nối tài khoản |
| 2. Nguồn AI riêng đầu tiên | bắt buộc | lấy Gemini API key **miễn phí** tại AI Studio bằng tài khoản Google của công ty, nhắn `nguon them gemini <khoá>` | đưa khoá vào 9Router riêng trên máy bạn, chọn model tốt, gọi thử, xếp vào chuỗi dự phòng, **chuyển bot sang chạy bằng nguồn đó**; khoá sai thì gỡ ngay |
| 3. Nguồn dự phòng | nên làm | OpenRouter (không cần thẻ) hoặc Groq, cùng cú pháp | xếp cuối chuỗi: rẻ trước, mạnh sau; một gói hết hạn mức, bot tự nhảy sang gói kia |
| 4. Bot chạy bằng nguồn của bạn | bắt buộc | không phải làm gì | tự làm ngay sau bước 2; hỏng thì tự quay về AI của OZ |
| 5. Hộp thư / Drive | tuỳ chọn | `ket noi mail …`, `ket noi drive` | chỉ đọc, chỉ chủ nhân và đồng nghiệp gọi được |
| 6. Ba tệp mẫu | tuỳ chọn | gửi một hoá đơn, một bảng kê, một hợp đồng thật | lưu làm mẫu tham chiếu cho những lần soạn sau |
| 7. Tự kiểm 5 việc | bắt buộc | nhắn `khoi dong kiem tra` | tự làm hỏi đáp, đọc Excel, đọc PDF, soạn Word, nhớ ngữ cảnh — báo bảng đạt/chưa |

Nguyên tắc không đổi: **tài khoản là của bạn**. Bot chỉ dẫn đường; nó không đăng ký hộ, không nhận OTP, không nhập thẻ, không giữ mật khẩu của bạn. Mật khẩu bảng điều khiển 9Router do máy tự sinh; bot đưa cho chủ nhân đúng một lần rồi khuyên đổi ngay. Chúng tôi từng cân nhắc "tự đăng ký các gói miễn phí giúp khách" và bỏ, vì làm thế là vi phạm điều khoản của nhà cung cấp và đặt tài khoản của bạn vào rủi ro bị khoá.

Tình trạng thật: bảy bước đã chạy đúng trên máy thử nghiệm (kể cả tình huống khoá sai bị gỡ); bài tự kiểm 5 việc chạy sáng 08/09 đạt 5/5 trong 83 giây (hỏi đáp 13 s, đọc Excel 23 s, đọc PDF 14 s, soạn Word 16 s, nhớ ngữ cảnh 17 s). Đang chờ khách đầu tiên chạy trên máy thật trong tuần này. Cụm AI mặc định của OZ từng chết trọn tối 07/09 và chỉ hồi 08:30 sáng 08/09 — thêm một lý do để bạn có nguồn AI riêng.

## "Đăng ký phát là đủ tính năng" — cách chúng tôi bảo đảm

Lý do máy nào cũng giống máy nào không phải lời hứa mà là **kịch bản**. Trên trạm điều hành của OZ, một lệnh tạo máy chạy tuần tự: tạo VM → cài nền, tường lửa chỉ mở SSH → chép trợ lý + nhận dạng giọng nói → dịch vụ → OpenClaw ba agent → nối não trung tâm → rồi bước mới từ 08/09, gọi là **"đầy đủ"**: DNS ổn định, cron trả lời bù, email/Drive, chặn agent leo quyền, bảng điều khiển OpenClaw chỉ trong mạng nội bộ, 9Router riêng kèm khoá cho bot, hai skill từ kho thế giới. Cuối cùng là **nghiệm thu 20 mục** — mỗi mục là một lỗi chúng tôi từng vấp và không muốn khách vấp lại. Máy FAIL mục nào thì không bàn giao.

Cùng kịch bản đó chạy lại được trên máy đã giao để đồng bộ tính năng mới, nên khách cũ không bị bỏ lại: hai máy đang chạy hôm nay đã qua đúng bước "đầy đủ" này.

## Bảo vệ dữ liệu của bạn — những thứ trợ lý bị cấm

| Cấm | Cách khoá |
|---|---|
| Tự cài phần mềm, dùng `sudo` | Tiến trình agent chạy với `NoNewPrivileges`; đã bắt được một lần agent định tự cài OCR và chặn từ đó |
| Tải tệp của bạn lên dịch vụ ngoài, mở cổng ra Internet | Chỉ một đường gửi tệp qua kho tệp của máy; tường lửa chỉ mở SSH; bảng điều khiển và 9Router chỉ mở trong mạng nội bộ |
| Đọc thư/Drive cho người lạ | Công cụ tự từ chối nếu người hỏi không phải chủ nhân hoặc đồng nghiệp đã khai |
| Nhìn thấy khoá AI của bạn | Khoá đi thẳng từ tin nhắn vào 9Router riêng trên máy bạn, không qua "não" AI, không ghi log |
| Cài skill lạ | Mỗi skill từ kho thế giới phải qua bước soi tự động: giấy phép, máy chủ nó gọi, script nó chạy, chín dấu hiệu rủi ro. Đợt đầu chúng tôi **từ chối 5** (trong đó có các bản sao trái phép skill của Anthropic và một skill vượt CAPTCHA của cổng thuế) và chỉ cài 2 |

## Đang triển khai, chưa mở

Ba việc đã có khung, chưa tính là tính năng: trợ lý tự đề xuất skill mới từ việc lặp lại và chủ nhân duyệt bằng một lệnh; wiki nội bộ cho từng máy để bạn xem "trợ lý đang nhớ gì" và sửa; đường link tệp ngắn cố định thay cho link dài hiện tại. Xong việc nào sẽ ghi vào [nhật ký vận hành](/ai-van-hanh/).

## Bắt đầu

Gói Doanh nghiệp 999.000 đ/tháng đã gồm toàn bộ tính năng trên và AI của OZ; nguồn AI riêng là tuỳ chọn của bạn, tiền AI trả thẳng cho nhà cung cấp bạn chọn (Gemini và OpenRouter có gói miễn phí đủ cho một phòng kế toán nhỏ). Xem [bảng giá](/#bang-gia) hoặc [chọn gói](/chon-goi/). Nhận máy, nhắn `khoi dong`, và cho chúng tôi biết bước nào làm bạn vướng — đó là cách danh sách này dài thêm.
