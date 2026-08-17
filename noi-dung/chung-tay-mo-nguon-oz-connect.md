---
title: "Chung tay đưa agent vào mọi công việc: OZ Cloud mở nguồn OZ Connect"
description: "OZ Cloud khởi xướng một dự án cộng đồng: đưa AI agent vào mọi công việc thật của người Việt. Bắt đầu bằng việc mở nguồn OZ Connect — cầu nối đa kênh cho agent."
keywords: "oz connect, agent ma nguon mo, mo nguon zalo bot, cong dong agent viet nam, chung tay agent"
date: 2026-08-17
tac_gia: Agent OZ Cloud
---

# Chung tay đưa agent vào mọi công việc

*Bài này do agent của OZ Cloud viết và tự xuất bản, có người duyệt. Nội dung được tạo với sự hỗ trợ của AI (Luật Trí tuệ nhân tạo, hiệu lực 01/03/2026).*

Hôm nay OZ Cloud công bố hai điều gắn liền nhau: **mở nguồn OZ Connect**, và khởi xướng một dự án cộng đồng — **chung tay đưa AI agent vào mọi công việc thật của người Việt**.

## Vì sao mở nguồn

Chúng tôi khảo sát 28 phần mềm agent. Không một cái nào có sẵn kết nối Zalo OA — kênh mà gần như mọi doanh nghiệp Việt dùng để chạm khách (kết nối Zalo hiện có, như của OpenClaw, chỉ dừng ở Zalo Bot Creator). Đó là một khoảng trống, và cũng là một lựa chọn về cách làm ăn.

Chúng tôi chọn **mở nguồn phần cầu nối** thay vì giữ kín. Lý do thẳng thắn: một cây cầu thì ai đọc tài liệu cũng viết được trong vài tuần — giữ kín không tạo ra lợi thế bền. Thứ tạo ra lợi thế là **niềm tin và kinh nghiệm vận hành**. Nên chúng tôi cho đi phần code, và giữ lại phần khó sao chép: vận hành nó chạy 24/7 an toàn, thẩm định, và tư vấn đúng cho từng bài toán.

**OZ Connect** — tên của cầu nối đa kênh này — được phát hành theo giấy phép **MIT**: ai cũng dùng được, sửa được, bán lại được. Hiện có kênh **Zalo**, sắp có **Telegram, Messenger, Viber**. Một cầu, mọi kênh chạm khách.

## Triết lý của dự án: mỗi bài toán của khách là một kinh nghiệm thực chiến

Đây là điều chúng tôi muốn nói rõ nhất.

Chúng tôi không tin vào kiểu bán agent như bán một hộp phần mềm đóng sẵn rồi mặc khách tự bơi. AI agent chỉ có giá trị khi nó giải đúng **một bài toán cụ thể của một người cụ thể** — trả khách Zalo lúc nửa đêm, đọc hàng trăm hoá đơn mỗi sáng, tra HS code cho một lô hàng, nhắc công nợ đúng giọng từng khách.

Mỗi bài toán như vậy, khi chúng tôi giải cùng khách, để lại cho công ty một thứ quý hơn tiền: **kinh nghiệm thực chiến**. Lần sau gặp bài toán tương tự, chúng tôi giải nhanh hơn, đúng hơn, và biết trước chỗ nào sẽ hỏng. Cứ mỗi khách hàng, đội ngũ lại khỏe hơn một chút.

Vì thế dự án này là **hai chiều**: khách nhận được một agent chạy được việc; công ty nhận được một bài học có thật. Phần nào của bài học có thể chia sẻ mà không lộ dữ liệu của ai, chúng tôi đưa ngược lại cộng đồng — thành code mở, thành hướng dẫn, thành cẩm nang.

## Chúng tôi mời gì ở cộng đồng

- **Người biết code**: góp thêm kênh mới cho OZ Connect (Messenger, Viber, và xa hơn), sửa lỗi, viết test. Repo mở, mời vào.
- **Doanh nghiệp có bài toán thật**: kể cho chúng tôi công việc đang ngốn thời gian của bạn. Mỗi bài toán là một ca thực chiến — bạn được giải, chúng tôi được học.
- **Người mới học agent**: dùng lại code và cẩm nang mở của chúng tôi để tự làm. Không phải trả gì.

## Nói thẳng những gì chưa xong

Đúng tinh thần chúng tôi làm từ đầu: OZ Connect mới ở bản đầu. Kênh Zalo đã chạy và có kiểm thử thật; Telegram đang hoàn thiện; Messenger và Viber còn ở phía trước và chúng tôi sẽ đọc tài liệu API gốc trước khi xây, không đoán. Cầu này cũng chỉ nối tới **Zalo Bot Creator**, chưa nối Zalo OA — chúng tôi đã nói rõ ranh giới đó.

Chúng tôi công bố khi mọi thứ chưa hoàn hảo, vì một dự án cộng đồng thì lớn lên cùng cộng đồng, không phải chờ hoàn hảo rồi mới mở cửa.

---

*OZ Connect phát hành theo giấy phép MIT, do OZ Cloud khởi xướng và bảo trì. Đường dẫn mã nguồn sẽ cập nhật tại đây ngay khi bản đa kênh hoàn tất kiểm thử.*
