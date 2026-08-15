---
title: "Bot của bạn không hỏng — nó đang chờ bạn @nó"
description: "Bot OpenClaw online nhưng không trả lời tin nhắn. Than phiền số 1 theo tài liệu chính thức. Nguyên nhân thường là mention gating bật sẵn, nhóm chưa allowlist, người gửi DM đang chờ duyệt pairing, hoặc thiếu quyền API. Kèm cách kiểm tra và sửa từng trường hợp."
keywords: "bot openclaw không trả lời, openclaw online không trả lời, openclaw không phản hồi, mention gating, openclaw allowlist"
date: 2026-08-15
tac_gia: Agent OZ Cloud
---

# Bot của bạn không hỏng — nó đang chờ bạn @nó

Một ngày bạn thấy bot OpenClaw của mình hiện đang online — xanh lè trên kênh — mà gửi tin nhắn nó không hề đáp lại. Bạn mở config, check log, không thấy lỗi. Bối rối thật. Nhưng đây lại là than phiền số 1, theo đúng tài liệu chính thức của OpenClaw. Và tin vui: **bot vẫn ổn, chỉ là nó đang không được "phép" trả lời bạn mà thôi.**

Có mấy nguyên nhân quen thuộc khiến bot online mà đứng im. Tôi liệt kê từng cái kèm cách kiểm tra và sửa, để lần sau gặp lại bạn xử lý trong năm phút.

## 1. Mention gating bật mặc định — phải @ tên bot

Nếu bạn gửi tin vào một **nhóm** và không thấy bot trả lời, khả năng cao nhất là một tính năng tên là **mention gating**. Mặc định nó được bật: trong nhóm, bot chỉ trả lời khi người ta *nhắc tên* (gõ `@` tên bot) trong tin nhắn. Gửi bình thường không @ thì bot im re.

Đây là cài đặt an toàn theo mặc định, để bot không "lấn sân" trả lời tràn lan trong mọi cuộc hội thoại. Nhưng nhiều người không biết, cứ gửi thử ào ào rồi tưởng hỏng.

- **Cách kiểm tra:** gửi một tin nhắn có gõ `@` kèm tên bot. Nếu nó trả lời → đúng bệnh này.
- **Cách sửa:** tắt mention gating để bot trả lời mọi tin trong nhóm, hoặc đưa vào danh sách kênh/nhóm cho phép. Tuỳ chọn nằm trong config kênh của OpenClaw.

## 2. Nhóm chưa được đưa vào allowlist

Một lý do khác khá phổ biến: bạn cấu hình bot chỉ trả lời trong những nhóm nhất định (allowlist). Gửi thử từ một nhóm chưa nằm trong danh sách đó — dù có @ đi chăng nữa — bot cũng không đáp.

- **Cách kiểm tra:** xem lại danh sách nhóm/kênh được phép trong config. So với nhóm bạn đang thử, nó có nằm trong đó không.
- **Cách sửa:** thêm ID nhóm bạn muốn bot hoạt động vào allowlist, rồi khởi động lại gateway.

## 3. Người gửi DM đang chờ duyệt pairing

Với tin nhắn riêng (DM), OpenClaw có cơ chế **pairing**: người muốn trò chuyện với bot qua tin riêng phải được duyệt trước. Lần đầu người lạ nhắn DM, tin không tự động được trả lời — nó nằm ở trạng thái chờ duyệt. Khi bạn chủ động nhắn thử bằng một tài khoản chưa từng được duyệt, bot cũng đứng im đúng như vậy.

- **Cách kiểm tra:** mở phần duyệt pairing/approved users xem người gửi có nằm trong danh sách chưa.
- **Cách sửa:** chấp nhận (approve) user đó, hoặc thêm vào danh sách người được phép trò chuyện riêng. Sau đó nhắn thử lại.

## 4. Thiếu quyền API

Có ca "bot im" mà không phải do gating — là do **nó không gọi được API để sinh câu trả lời**. Thường đi kèm lỗi trong log về key, giới hạn, hoặc tài khoản API bị hết hạn/thiếu quyền. Bot vẫn online vì phần kết nối kênh còn sống, nhưng phần não không hoạt động.

- **Cách kiểm tra:** mở log của gateway tìm dòng lỗi chứa từ khoá `API`, `401`, `403` hoặc `quota`. Có thông báo lỗi rõ ràng thì cha đẻ đã chỉ điểm.
- **Cách sửa:** tuỳ theo lỗi — cập nhật key mới, kiểm tra hạn mức, hoặc cấp lại quyền cho tài khoản API. Sửa xong khởi động lại gateway.

## Cách xử lý theo thứ tự gọn

Nếu gặp bot online mà câm, cứ làm thứ tự này — đa phần dừng lại ở bước 1 là hết ngay:

1. **Gửi thử có `@` tên bot trong nhóm.** Trả lời được → do mention gating. Muốn bớt phiền thì tắt nó ở config.
2. **Kiểm tra allowlist** nhóm. Thêm nhóm vào danh sách cho phép.
3. **Kiểm tra phần duyệt pairing** cho người gửi DM. Approve rồi thử lại.
4. **Mở log xem có lỗi API không.** Sửa theo thông báo lỗi.

## Mẹo nhỏ: đừng mất bình tĩnh, đừng sửa lung tung

Cảm giác thấy bot online mà không trả lời rất dễ đẩy người ta vào việc sửa bừa: đụng vào config, reset mọi thứ, thậm chí cài lại từ đầu. Đáng tiếc, vì phần lớn các trường hợp chỉ là một trong bốn điều trên, sửa đúng phát là khỏi. Nhớ lại một câu trong tài liệu chính thức: đây là than phiền số 1 — tức là bạn không cô đơn, và thường không có gì trầm trọng xảy ra.

Bot của bạn không hỏng. Nhiều khả năng nó đang rất ngoan nhưng đang bị một "nội quy" nào đó giữ im lặng: phải @ mới trả lời, chưa nằm trong nhóm cho phép, người hỏi chưa được duyệt, hoặc tạm thời không gọi được API. Mỗi cái đều có chỗ kiểm tra riêng và cách sửa gọn gàng. Lần tới thấy nó câm, nhớ: kiểm tra theo thứ tự bốn bước trên đã, đừng vội khai tử con bot.

---

*Nguồn: Kế hoạch marketing OZ Cloud (MARKETING_OPENCLAW.md, 15/08/2026). Các nguyên nhân mention gating, allowlist, chờ duyệt pairing và thiếu quyền API mô tả theo tài liệu chính thức docs.openclaw.ai (kênh channels và gateway/troubleshooting), nơi ghi nhận đây là than phiền số 1 khi bot online mà không trả lời. Khảo sát ngày 15/08/2026. Bản nháp do Anh Thắng duyệt trước khi đăng công khai.*
