---
title: "Bot Zalo trả khách 24/7 cho shop bán hàng: cần gì, tốn bao nhiêu"
description: "Chủ shop không rành Linux: bot Zalo trả khách 24/7 bằng OpenClaw làm được gì, cần chuẩn bị gì, chi phí mỗi tháng khoảng bao nhiêu, và bước nào nên nhờ người hỗ trợ."
keywords: "bot zalo trả khách 24/7, bot zalo cho shop, openclaw cho chủ shop, chi phí bot zalo, openclaw không biết linux"
date: 2026-08-15
tac_gia: Agent OZ Cloud
---

# Bot Zalo trả khách 24/7 cho shop bán hàng

Bạn là chủ shop, nghe nói có thể cài một "con bot" để nó trả lời khách trên Zalo cả ngày lẫn đêm, kể cả lúc bạn ngủ. Nghe hấp dẫn, nhưng bạn không biết gì về Linux, không biết command, cũng không muốn đụng vào mấy thứ kỹ thuật. Bài này viết riêng cho bạn: bot thật sự làm được gì, cần chuẩn bị ra sao, mỗi tháng mất khoảng bao nhiêu tiền, và chỗ nào bạn nên nhờ người khác.

## Bot làm được gì (và không làm được)

Hiểu đúng trước khi móc ví. Con bot chạy OpenClaw nối vào Zalo giúp bạn:

- **Trả lời khách trên Zalo OA** các câu hỏi lặp đi lặp lại: giá, giờ mở cửa, cách đặt hàng, tình trạng đơn — theo kịch bản bạn cung cấp.
- **Trực thường xuyên.** Không mệt, không cần nghỉ, khách hỏi lúc 23 giờ đêm vẫn nhận được phản hồi.
- **Chuyển việc khó cho người thật.** Gặp câu khó, nó biết dấu hiệu để báo lại cho bạn hoặc người phụ trách, thay vì cố bịa ra câu trả lời.

Còn những thứ nó **không** làm được, đừng hy vọng:

- Không thay thế được bạn trả lời những câu hỏi cần suy đoán, cần thương lượng hay cần cảm xúc.
- Trả lời sai là có, nếu kịch bản sơ sài hoặc khách hỏi ngoài phạm vi. Ai bảo "bot hiểu hết mọi thứ" thì nói quá.
- Không tự nhiên biết "hàng còn không" trừ khi bạn cấu hình để nó đọc được kho hàng của bạn.

Vậy nên hãy nghĩ về nó như một **lễ tân trực điện thoại ban đêm** — trả lời phần đơn giản, ghi lại phần phức tạp. Chứ không phải một trợ lý thay thế hoàn toàn.

## Thứ bạn cần để bắt đầu

Không cần biết lập trình, nhưng bạn phải có một số mảnh ghép trước khi đi xa hơn:

1. **Một Zalo OA của shop.** Nếu chưa có, đây là chỗ bắt đầu. Bot nối qua tài khoản OA chính thức an toàn hơn là dùng Zalo cá nhân.
2. **Một nơi để con bot chạy.** Con bot không "nằm" trong điện thoại của bạn — nó sống trên một máy chủ. Máy này phải đủ mạnh: **tối thiểu 2 GB RAM, tốt nhất 4 GB.** Có loại 1 GB nhưng đừng mua, vì nó sẽ bị hệ thống giết (lỗi exit code 137) và bot lăn ra chết giữa đêm.
3. **Kịch bản trả lời.** Đây là thứ bạn đóng góp quan trọng nhất: danh sách câu khách hay hỏi và câu trả lời. Bot hay là tùy thuộc kịch bản có tốt hay không.
4. **Người cài đặt một lần.** Hầu như chắc chắn bạn cần ai đó biết kỹ thuật lo khâu cài đặt ban đầu (xem cuối bài).

## Chi phí mỗi tháng khoảng bao nhiêu

Có hai khoản chính:

1. **Chỗ chạy (máy chủ).** Bạn cần một gói máy chủ vừa đủ RAM. Tham khảo giá VPS nội địa: một gói **4 GB RAM tầm 169.000 đồng/tháng** là mức vừa đủ cho một con bot chạy ổn định. Gói 2 GB rẻ hơn nhưng chỉ đủ cho một agent nhẹ; nếu bot vừa trả lời vừa làm thêm việc khác thì dễ nghẹt.
2. **Chi phí model AI (không phải lúc nào cũng có).** Con bot dùng "não" của model AI, đôi khi tính tiền theo lượng xử lý. Một số model rẻ thì không đáng lo, nhưng nếu dùng model cao cấp cho mọi thứ, người dùng Việt từng báo tốn **100–500 USD một tháng**. Có cách giảm: việc nhẹ dùng model rẻ, việc quan trọng mới dùng model đắt. Ai đó có kinh nghiệm sẽ biết cân chỉnh giúp bạn.

Vậy tổng chi phí thật của bạn khó mà nói một con số duy nhất vì nó phụ thuộc con bot dùng "não" xịn tới đâu. Nhưng nếu chỉ tính phần máy chủ và dùng model tiết kiệm, con số trải nghiệm khá gần mức **vài trăm nghìn đồng/tháng**, chưa kể công cài đặt một lần.

## Không biết Linux thì làm sao?

Ba từ khóa: **nhờ người, dùng dịch vụ cài sẵn, hoặc tự bấm theo hướng dẫn.** Chiến lược thông minh nhất cho chủ shop là trộn hai hướng đầu.

Bạn có thể tự làm được (không cần biết Linux):

- Chuẩn bị Zalo OA, soạn kịch bản trả lời, định nghĩa "câu nào là khó cần báo người thật".
- Kiểm tra bot trả lời có đúng ý không, rồi tiếp tục chỉnh kịch bản — việc này bạn làm tốt hơn bất kỳ lập trình viên nào vì bạn biết khách hỏi gì.

Bạn **nên nhờ người** (hoặc chọn dịch vụ bao cài sẵn):

- Cài OpenClaw lên máy chủ, nối vào Zalo OA, xử lý token.
- Đảm bảo cổng kết nối không bị mở ra ngoài Internet (rủi ro bảo mật).
- Chọn model và hãm chi phí, theo dõi log đợt đầu.

Nếu ngại, một số nơi có gói **hosting AI agent** — họ cài sẵn OpenClaw, lo vận hành và hỗ trợ, bạn chỉ cần chỉnh kịch bản. Giá dạng này tham khảo **249.000–549.000 đồng/tháng** tùy mức độ quản lý. Không rẻ bằng tự làm, nhưng bạn không phải đuổi người lúc nửa đêm để sửa máy.

## Checklist trước khi quyết định

- [ ] Tôi có Zalo OA, không dùng Zalo cá nhân làm bot.
- [ ] Máy chủ tối thiểu 2 GB RAM, tốt nhất 4 GB.
- [ ] Tôi đã soạn được 5–10 câu hỏi khách hay hỏi nhất kèm câu trả lời.
- [ ] Tôi có người/kế hoạch lo khâu cài đặt ban đầu.
- [ ] Tôi biết mỗi tháng sẽ chi bao nhiêu, và đã có cách hãm chi phí model.

## Nên bắt đầu từ đâu

Đừng nhảy vào mua máy lớn hay cài đặt phức tạp ngay. Cách thông minh: chuẩn bị kịch bản trước (thứ bạn giỏi nhất), đồng thời hỏi một đơn vị cài hộ khởi chạy thử, sau đó mới tính chuyện mở rộng. Khi đã có chỗ chạy và bot nối vào OA, chuyện tiếp theo chỉ là nuôi kịch bản cho thật tốt.

Muốn đi sâu hơn về kỹ thuật — như 3 cách nối Zalo cái nào an toàn, hay những lỗi hay gặp — thì xem hai bài sau trong loạt bài này.

---

*Nguồn: Kế hoạch marketing OZ Cloud (MARKETING_OPENCLAW.md, 15/08/2026) — mức RAM 2/4 GB, lỗi OOM exit 137, chi phí model 100–500 USD/tháng và 20–70 USD/tháng VPS, định tuyến model; Kế hoạch kinh doanh (BUSINESS_PLAN.md, 13/08/2026) — gói Pro 169.000đ, hosting AI agent 249.000–549.000đ/tháng, hỗ trợ 24/7 Zalo/Telegram. Bản nháp do Anh Thắng duyệt trước khi đăng công khai.*
