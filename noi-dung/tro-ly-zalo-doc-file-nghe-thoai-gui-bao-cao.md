---
title: "Trợ lý Zalo của OZ Cloud giờ đọc được file, nghe được giọng nói và tự gửi báo cáo"
description: "Nhật ký nâng cấp thật: bot Zalo của OZ Cloud từ chỗ chỉ trả lời chữ đã đọc PDF/Word/Excel, xem ảnh, nghe tin thoại, nhận việc và gửi lại file. Kèm những giới hạn thật của Zalo Bot API mà ai làm trợ lý qua Zalo cũng sẽ đụng."
keywords: "trợ lý Zalo, Zalo Bot API, bot Zalo đọc file PDF, AI agent Zalo, OZ Connect, gửi file qua Zalo bot, nhận dạng giọng nói tiếng Việt, tự động hoá công việc"
date: 2026-09-02
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Trợ lý Zalo của OZ Cloud giờ đọc được file, nghe được giọng nói và tự gửi báo cáo

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud. Mọi con số và giới hạn trong bài là kết quả đo thật trên hệ thống của OZ Cloud ngày 01–02/09/2026, không lấy từ tài liệu quảng cáo.*

Ba tuần trước, bot Zalo của OZ Cloud chỉ làm được một việc: ai nhắn "báo cáo" thì nó trả về một đoạn chữ soạn sẵn. Đến hôm nay nó đã là chỗ để chủ doanh nghiệp giao việc cho đội AI agent, hỏi tình hình bằng câu tự nhiên, gửi một file báo giá vào và nhận lại phân tích, nói một câu bằng giọng thật và được hiểu. Bài này kể lại đúng những gì đã làm được, làm bằng cách nào, và **những chỗ Zalo không cho làm** — vì nếu bạn định dựng trợ lý qua Zalo cho công ty mình, bạn sẽ đụng đúng các bức tường này.

## Vì sao phải là file?

Một trợ lý qua chat mà chỉ hiểu chữ thì chỉ dùng được cho việc hỏi đáp vặt. Công việc thật của một doanh nghiệp nhỏ nằm trong file: báo giá bên Trung Quốc gửi sang dạng PDF, bảng công nợ là Excel, hợp đồng là Word, chứng từ là ảnh chụp, còn sếp thì hay nhắn tin thoại lúc đang lái xe. Chúng tôi coi việc **đọc được mọi loại file người dùng gửi qua Zalo** là kỹ thuật nền của cả dự án: không có nó thì các tính năng khác chỉ là trình diễn.

## Trợ lý làm được gì hôm nay

Mọi thứ dưới đây đang chạy thật trên trạm của OZ Cloud, không phải bản thử nghiệm trong phòng.

**Hỏi tình hình bằng câu tự nhiên.** Gõ "đội đang làm gì?" hoặc "RAM còn bao nhiêu?", trợ lý trả lời theo số liệu thật lúc đó — hàng đợi việc, tiến độ từng mục, kết quả ba việc gần nhất, tình trạng tám dịch vụ — chứ không phải văn mẫu. Nó nhớ mười hai lượt gần nhất của cuộc trò chuyện; gõ "quên" là xoá.

**Giao việc ngay trong chat.** "Giao việc rà lại năm bài blog mới nhất xem có lỗi chính tả" — câu đó thành một việc thật trong hàng đợi của đội agent. Làm xong, trợ lý báo lại đúng cuộc trò chuyện kèm bản kết quả. Khi bạn chỉ *bàn* về một việc, trợ lý không tự ý làm: nó viết một dòng "ĐỀ XUẤT GIAO VIỆC" và chờ bạn gõ "ok". Đây là van an toàn cố tình đặt ra: mô hình ngôn ngữ trong trợ lý **không có quyền chạy lệnh**, mọi hành động đều đi qua hàng đợi có kiểm soát.

**Xem ảnh.** Gửi ảnh kèm câu hỏi ("hoá đơn này tính đúng chưa?", "nhãn hàng này ghi gì?"), trợ lý tải ảnh về và đưa cho mô hình có khả năng nhìn. Đo thật: một ảnh trả lời trong 2,5–10 giây tuỳ độ phức tạp.

**Đọc file PDF, Word, Excel, CSV.** Trợ lý trích chữ (PDF qua lớp chữ của file, Word cả bảng biểu, Excel tối đa năm sheet và hai trăm dòng mỗi sheet), cắt ở khoảng mười hai nghìn ký tự rồi trả lời theo câu hỏi. Thử nghiệm thật với một file Word báo giá ba mặt hàng: trợ lý tính đúng tổng 100.000 CNY, tách đúng điều khoản FOB, cọc 30%, giao 12–15 ngày, hết 27 giây kể cả thời gian đọc file. PDF dạng ảnh scan chưa đọc được — trợ lý sẽ nói thẳng là cần OCR thay vì bịa.

**Nghe tin thoại.** Tin thoại được chuyển thành chữ bằng mô hình nhận dạng giọng nói chạy ngay trên máy của OZ Cloud (không gửi giọng của bạn ra dịch vụ bên ngoài), rồi xử lý *y như bạn gõ*: nói "giao việc đo RAM Aider" cũng thành việc thật. Chạy bằng CPU nên một đoạn mười giây mất khoảng năm đến mười lăm giây.

**Xem video ngắn.** Trợ lý cắt một khung hình cho mô hình nhìn và tách lời thoại để nghe. Đủ để trả lời "video này nói về cái gì", không đủ để phân tích từng cảnh.

**Đọc trang web và file qua link.** Dán link bài viết, trợ lý tự tải trang về đọc. Dán link file PDF/Word/Excel hoặc link chia sẻ Google Drive/Docs/Sheets (đã mở quyền xem), trợ lý tải file về đọc như file đính kèm.

**Tạo và gửi file ngược lại.** Gõ "xuất báo cáo", trợ lý sinh file Excel ba sheet và gửi link tải. Khi đội agent làm xong một việc có sản phẩm là file, trợ lý gửi ảnh thẳng vào chat, file khác gửi dạng link.

## Những bức tường của Zalo Bot API — đo thật, không đoán

Đây là phần đáng đọc nhất nếu bạn định tự làm.

**Bot không nhận được file đính kèm.** Người dùng gửi PDF, Word, Excel hay video vào bot, Zalo chỉ báo về một sự kiện "không hỗ trợ", **không kèm đường dẫn tải file**. Ảnh thì có (Zalo gửi kèm địa chỉ ảnh). Chúng tôi từng viết phần nhận ảnh theo tài liệu của bên thứ ba và sai một tên trường — ảnh về đến bot nhưng rơi mất. Bài học đắt: với API chat, **phải bắt gói tin thật rồi mới viết mã**, tài liệu không thay được.

**Bot không gửi được file.** Zalo Bot API có gửi chữ, gửi ảnh (bằng địa chỉ URL), gửi sticker, gửi tin thoại (cũng bằng URL) và báo "đang gõ". Các lệnh gửi tài liệu, gửi video, gửi âm thanh, lấy file đều **không tồn tại** — máy chủ trả lỗi 404 khi gọi. Không phải chưa bật, mà là không có.

**Cách chúng tôi đi vòng.** Vì hai bức tường trên, trợ lý dựng một *hộp nhận file* riêng: khi bạn gửi file mà Zalo không chuyển, trợ lý lập tức trả về một link dùng một lần, hết hạn sau một giờ, chỉ người đó dùng được. Bấm link trên điện thoại, chọn file, ghi câu hỏi, gửi — kết quả quay lại đúng cuộc trò chuyện Zalo. Chiều ngược lại, file trợ lý tạo ra nằm trên máy của OZ Cloud, phát ra ngoài qua một đường hầm mã hoá, trong thư mục có tên ngẫu nhiên hai mươi bốn ký tự, không liệt kê được, tự xoá sau bảy ngày. Không có file nào của người dùng nằm trên máy chủ bên thứ ba — điều này quan trọng với Luật 91/2025/QH15 khi file có dữ liệu cá nhân.

**Không có nút bấm, không có menu.** Khác Telegram, Zalo Bot không có bàn phím lệnh hay nút xác nhận. Mọi tương tác là chữ. Trợ lý bù bằng cách đánh số danh sách ("kết quả 2", "huỷ 3") và chấp nhận gõ không dấu.

## Chuyện hậu trường: mô hình nào trả lời?

Trợ lý không dùng một mô hình duy nhất. Nó đi qua một cổng định tuyến gom nhiều tài khoản, thử lần lượt năm mô hình còn sống, mỗi lớp tối đa hai mươi giây, rồi mới đến lớp dự phòng. Lý do phải làm vậy: khi đo thật cùng một buổi, có mô hình trả lời trong 2 giây, có mô hình lúc 4 giây lúc 30 giây, và một nửa số tài khoản "có trong danh sách" thực ra đang hết hạn đăng nhập hoặc hết hạn mức. Bài học cho ai vận hành: **danh sách mô hình không phải danh sách mô hình dùng được** — phải có lệnh kiểm tra từng lớp (trợ lý có lệnh "kiểm llm" để làm đúng việc đó).

Một phát hiện tình cờ nhưng ảnh hưởng lớn: bot chậm chập chờn suốt hai ngày hoá ra không phải do mô hình, mà do hai máy chủ DNS IPv6 nhà mạng đẩy xuống đã chết hẳn (đo: 0/6 lần trả lời), cộng với IPv6 không ra được Internet trong khi máy vẫn được cấp địa chỉ. Sửa xong hai dòng cấu hình, tải mô hình nhận dạng giọng nói từ 488 KB trong mười phút lên 464 MB trong hai mươi giây. Nếu trợ lý của bạn "lúc nhanh lúc điếc", hãy đo DNS trước khi đổ cho AI.

## Nói thẳng: chưa làm được gì

Bot chưa vào nhóm Zalo (API cho phép, chúng tôi cố tình để sau vì cần quy tắc ai được giao việc, khi nào bot lên tiếng). Chưa trả lời bằng giọng nói dù API có lệnh gửi tin thoại. Chưa đọc PDF scan (cần OCR). Chưa vẽ ảnh. Chất lượng nghe tiếng Việt mới ở mức "chạy được", còn chờ đo với giọng thật nhiều vùng miền. Link tải file đổi mỗi lần đường hầm khởi động lại — muốn địa chỉ cố định phải có tên miền riêng. Và toàn bộ những thứ trên mới chạy cho một người dùng là chủ doanh nghiệp; mở cho nhiều người sẽ cần thêm phân quyền.

## Nếu bạn muốn làm tương tự

Phần cầu nối Zalo (nhận/gửi tin, chia tin dài, chống trùng, giới hạn nhịp) đã mở nguồn theo giấy phép MIT trong dự án OZ Connect, dùng được với cả Telegram, Messenger và Viber. Phần trợ lý (đọc file, nghe thoại, hộp nhận file, hàng đợi việc) là mã nội bộ vì gắn với hạ tầng của OZ Cloud, nhưng cách làm thì như bài đã kể — không có gì bí mật, chỉ có nhiều gói tin phải bắt và nhiều lần phải nói "chưa làm được".

*Bài tiếp theo trong loạt "ứng dụng AI agent vào công việc hàng ngày" sẽ kể một tình huống cụ thể: dùng trợ lý này để đối chiếu báo giá từ ba nhà cung cấp Trung Quốc gửi sang bằng ba định dạng khác nhau.*
