---
title: "Quy trình giao một VPS kế toán gói Doanh nghiệp: 5 bước, và nhật ký lần chạy đầu tiên"
description: "OZ Cloud công bố đúng quy trình dùng để dựng VPS kế toán gói Doanh nghiệp (12 vCPU, 32 GB RAM, 400 GB SSD, 999.000 đ/tháng): 5 bước tự động, khách chỉ làm một việc là dán token Zalo Bot. Kèm nhật ký lần chạy đầu tiên ngày 05/09 cho chính phòng kế toán của chúng tôi, có cả chỗ hỏng và cách sửa."
keywords: "VPS kế toán, quy trình giao VPS, VPS cho phòng kế toán, trợ lý kế toán Zalo, gói Doanh nghiệp OZ Cloud, VPS 12 vCPU 32 GB, cài đặt VPS tự động, Proxmox cloud-init"
date: 2026-09-05
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Quy trình giao một VPS kế toán gói Doanh nghiệp: 5 bước, và nhật ký lần chạy đầu tiên

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud. Bài viết với sự hỗ trợ của AI (theo Luật Trí tuệ nhân tạo, hiệu lực 01/03/2026).*

Bài trước trong loạt kế toán kể [một ngày làm việc của kế toán khi có trợ lý AI trên Zalo](/blog/ke-toan-01-mot-ngay-voi-tro-ly-ai-tren-zalo/). Bài này trả lời câu hỏi thực dụng hơn: **khi đặt gói Doanh nghiệp, cái máy đó được dựng ra sao, trong bao lâu, và khách phải tự làm gì?**

Chúng tôi trả lời bằng cách công bố đúng quy trình đang dùng, không phải bản mô tả cho đẹp. Chiều 05/09/2026, đội agent OZ Cloud dựng chiếc VPS kế toán đầu tiên theo quy trình này **cho chính phòng kế toán của công ty dùng thử** trước khi mở bán. Lần chạy đầu hỏng ở bước 2. Chúng tôi giữ nguyên đoạn đó trong bài, vì một quy trình chưa từng hỏng là quy trình chưa từng chạy.

## Gói Doanh nghiệp gồm những gì

| Hạng mục | Nội dung |
|---|---|
| Máy ảo | 12 vCPU · 32 GB RAM · 400 GB SSD NVMe, chạy trên cụm máy chủ Dell của OZ Cloud (Proxmox VE 9) |
| Giá | 999.000 đ/tháng, 5.394.000 đ/6 tháng (theo bảng giá công khai trên trang chủ) |
| Hệ điều hành | Ubuntu 24.04 LTS, cập nhật bảo mật tự động |
| Trợ lý kế toán trên Zalo | Đọc ảnh hoá đơn, file Excel/Word/PDF, nghe tin nhắn thoại; trả lời số liệu; soạn bản nháp báo cáo và công văn |
| Hộp nhận file | Kho file riêng có link tạm, tự dọn sau 7 ngày, đi qua đường hầm Cloudflare nên máy không mở cổng ra Internet |
| Bảo mật mặc định | Tường lửa chỉ mở SSH; bot Zalo và đường hầm đều là kết nối đi ra; không có dịch vụ nào nghe cổng công khai |
| Mô hình ngôn ngữ | Bản dùng thử nội bộ đi qua cổng LLM của OZ Cloud; khách thật dùng khoá API riêng để hoá đơn tiền model tách khỏi tiền máy |
| Sao lưu | Đưa vào lịch sao lưu hằng ngày trước khi bàn giao chính thức (mục này chưa tự động, xem phần "còn thiếu") |

Con số 12/32/400 và giá lấy từ bảng giá đã công bố, không phải cấu hình riêng cho bài. Đây cũng là gói chúng tôi khuyên cho phòng kế toán từ 3 người trở lên: nhận dạng giọng nói và đọc ảnh hoá đơn chạy trên CPU, cần RAM thật chứ không cần GPU.

## Năm bước, một kịch bản

Toàn bộ việc giao máy nằm trong một kịch bản shell chạy trên trạm điều phối của chúng tôi. Người vận hành gõ đúng một lệnh với ba tham số: số hiệu máy, tên máy, tên công ty khách. Phần còn lại chạy tự động và ghi nhật ký từng bước.

**Bước 1 — Tạo máy ảo từ bản mẫu.** Kịch bản gọi API Proxmox bằng một token có quyền giới hạn (không phải tài khoản quản trị), nhân bản đầy đủ từ bản mẫu Ubuntu 24.04 đã cài sẵn cloud-init và guest agent, đặt 12 lõi, 32 GB, nới đĩa lên 400 GB, gắn vào nhóm tài nguyên riêng cho máy khách, rồi bật máy. Máy nhận IP qua DHCP; kịch bản tìm IP bằng địa chỉ MAC thay vì đoán. Lần chạy 05/09: **47 giây** từ lúc gõ lệnh đến khi có IP.

**Bước 2 — Cài nền.** SSH vào máy bằng khoá (không có mật khẩu nào được đặt), cài guest agent, ffmpeg và poppler (để đọc thoại và PDF), các thư viện Python đọc Excel/Word/ảnh, cập nhật bảo mật tự động; đặt múi giờ Việt Nam; bật tường lửa chỉ cho SSH vào.

**Bước 3 — Chép trợ lý kế toán.** Đồng bộ mã trợ lý (bản kế toán của OZ Connect), mô-đun nhận dạng giọng nói faster-whisper cùng môi trường Python của nó, bản mô tả vai trò kế toán, và tệp cấu hình. Tệp cấu hình có sẵn chỗ trống cho token Zalo Bot, kèm một lệnh nhỏ để khách tự điền.

**Bước 4 — Bật dịch vụ.** Ba dịch vụ chạy dưới tài khoản người dùng thường (không phải root), tự khởi động lại khi lỗi và sau khi máy khởi động lại: trợ lý Zalo, kho file, đường hầm. Kịch bản kiểm tra ngay tại chỗ: ba dịch vụ có đang chạy không, mô-đun nhận dạng giọng nói có nạp được không, các mô-đun Python của trợ lý có import được không.

**Bước 5 — Hồ sơ bàn giao.** Sinh một tệp hồ sơ ghi cấu hình, ngày tạo, tên khách, những gì đã cài và những gì còn thiếu. Hồ sơ này là thứ đội vận hành mở ra đầu tiên khi khách gọi hỗ trợ.

## Khách phải tự làm đúng một việc

Tạo một Zalo Bot trong Zalo Bot Creator (miễn phí, mất khoảng hai phút), lấy token, rồi chạy trên máy của mình:

```
oz-token-zalo.sh <token-zalo-bot>
```

Lệnh này ghi token vào tệp cấu hình chỉ chủ máy đọc được, khởi động lại trợ lý và in ba dòng nhật ký cuối để biết bot đã lên. **Chúng tôi cố ý không nhận token qua chat hay email.** Token Zalo Bot là quyền nhắn tin thay mặt bot của khách; nó nên đi thẳng từ khách vào máy của khách. Nếu sau này cần thu hồi, khách tạo token mới và chạy lại lệnh, không cần báo chúng tôi.

Nếu phòng kế toán muốn giới hạn ai được nói chuyện với bot, thêm danh sách ID Zalo vào biến `KETOAN_CHO_PHEP` trong cùng tệp cấu hình. Để trống nghĩa là ai nhắn cũng được trả lời, phù hợp giai đoạn thử.

## Trợ lý kế toán được phép và không được phép làm gì

Bản mô tả vai trò được chép vào máy ở bước 3 quy định cứng, không phụ thuộc người dùng có nhắc hay không:

- **Chỉ chuẩn bị, không quyết định.** Trợ lý soạn bản nháp báo cáo, bảng đối chiếu, công văn nhắc nợ. Nó không nộp tờ khai, không chuyển tiền, không ký hoá đơn điện tử, không gửi gì cho bên thứ ba. Việc đó của người.
- **Chỉ dùng số trong file.** Số liệu phải đến từ file người dùng gửi. Không có file thì trợ lý hỏi xin, không bịa số "cho đủ mẫu".
- **Đọc hoá đơn theo thứ tự cố định:** số hoá đơn, ngày, bên bán, mã số thuế, tiền trước thuế, thuế suất, tiền thuế, tổng. Ô nào không đọc được thì ghi "không rõ", không đoán.
- **Không lưu số tài khoản ngân hàng, mã OTP, mật khẩu** kể cả khi người dùng gửi. Trợ lý nhắc xoá tin nhắn đó.
- **Nhớ theo từng người,** không trộn hội thoại của hai kế toán với nhau. Gõ "quên" để xoá phần nhớ của mình.

Đây là chỗ khác biệt với việc dán ChatGPT vào Zalo: giới hạn nằm trong cấu hình máy, không nằm ở lời hứa.

## Nhật ký lần chạy đầu tiên: hỏng ở bước 2

Lần chạy 18:01 ngày 05/09: bước 1 xong sau 47 giây. Bước 2 báo lỗi ngay: *Could not get lock /var/lib/apt/lists/lock*. Nguyên nhân là cloud-init của máy mới vẫn đang chạy `apt-get` của riêng nó ngay sau khi khởi động; kịch bản của chúng tôi vào quá sớm. Tệ hơn, kịch bản khi đó không dừng lại mà chạy tiếp bước 3, 4, 5 trên một máy chưa có thư mục cài, nên nhật ký đầy lỗi "Permission denied" và ba dịch vụ ở trạng thái "activating" mãi.

Hai chỗ sửa, xong trong 5 phút:

1. Trước khi cài gói, chờ `cloud-init status --wait` xong, rồi chờ đến khi không tiến trình nào giữ khoá apt/dpkg (tối đa 7,5 phút).
2. Bước nào hỏng thì dừng ngay và ghi rõ "LOI buoc N - dung" vào nhật ký. Không chạy tiếp trên nền hỏng.

Kịch bản là idempotent: chạy lại cùng số hiệu máy thì bước 1 thấy máy đã có, chỉ bật lại và tìm IP (6 giây), rồi đi tiếp. Lần chạy lại lúc 18:03 đi hết năm bước; thời gian từng bước ghi ở cuối bài.

Bài học ghi vào quy trình: **thời điểm "máy đã bật" và "máy đã sẵn sàng cài" là hai thời điểm khác nhau** trên ảnh cloud-init, và kịch bản tự động phải chờ cái thứ hai.

Sau khi kịch bản báo XONG, bài nghiệm thu "khô" (gọi thẳng mô-đun trò chuyện với vai trò kế toán, chưa qua Zalo) tìm thêm ba lỗi nhỏ, sửa trong 15 phút: chỗ giữ token viết dạng `<...>` làm hỏng lệnh `source` khi người vận hành nạp tệp cấu hình bằng tay (systemd thì không sao); tên công ty có dấu cách chưa bọc ngoặc kép; và khi ghim IP tĩnh sau khi máy đã chạy, Proxmox đổi instance-id của cloud-init nên máy sinh lại khoá host SSH, gây cảnh báo "host key changed". Cả ba đã vào quy trình: token mặc định rỗng, tên công ty luôn trong ngoặc, ghim IP **trước** khi bàn giao. Bài nghiệm thu đó cũng xác nhận vai trò giữ đúng luật: yêu cầu "chuyển 50 triệu cho nhà cung cấp, số tài khoản ..." bị từ chối, trợ lý không nhắc lại số tài khoản và đề nghị soạn phiếu đề nghị thanh toán thay vì làm hộ.

## Còn thiếu gì trước khi bán thật

Nói thẳng để không ai đặt gói này với kỳ vọng sai:

- **Chưa mở bán.** Máy 05/09 là máy dùng thử cho nhân viên OZ Cloud. Bảng theo dõi công khai của chúng tôi vẫn ghi số khách trả tiền là 0 và sẽ chỉ đổi khi có khách thật.
- **IP nội bộ còn là DHCP.** Máy khách sẽ được ghim IP tĩnh trước khi bàn giao; hiện làm tay.
- **Sao lưu chưa tự gắn.** Lịch sao lưu hằng ngày đang áp cho nhóm máy nội bộ; máy khách phải được thêm vào lịch bằng tay ở bước 5. Việc này sẽ đưa vào kịch bản.
- **Zalo Bot chưa nhận file trực tiếp** (giới hạn của Zalo Bot API, đã đo trong bài trợ lý Zalo 02/09). Chứng từ đi qua hộp nhận file có link; trợ lý gửi link khi người dùng gõ "gửi file".
- **Bản dùng thử dùng cổng LLM chung.** Khách thật sẽ điền khoá API riêng để tự kiểm soát chi phí model; số token thật của chúng tôi 3 tuần qua có trong [bài đo token](/blog/openclaw-co-dot-tien-khong-so-token-that-3-tuan/).

## Vì sao công bố quy trình

Vì khách mua VPS kế toán không mua 12 lõi. Họ mua việc ai đó đã nghĩ trước về chuyện token nằm ở đâu, bot được phép làm gì, và máy hỏng thì dựng lại trong bao lâu. Công bố quy trình là cách rẻ nhất để khách tự kiểm tra ba câu đó thay vì tin lời chúng tôi.

Loạt kế toán còn tiếp: bài sau sẽ là nhật ký hai tuần nhân viên OZ Cloud dùng thử chiếc máy này, gồm cả những câu trợ lý trả lời sai.

---

*Phụ lục — thời gian từng bước, lần chạy lại 18:03 ngày 05/09/2026 (máy 12 vCPU / 32 GB / 400 GB, mạng nội bộ 1 Gbps):*

| Bước | Bắt đầu | Thời gian | Ghi chú |
|---|---|---|---|
| 1. Tạo máy ảo | 18:03:19 | 6 giây (lần đầu 47 giây) | lần chạy lại chỉ bật máy và tìm IP theo MAC |
| 2. Cài nền | 18:03:25 | 4 phút 38 giây | gần hết là tải gói từ mirror Ubuntu; máy không bận (load 0,2) |
| 3. Chép trợ lý + nhận dạng giọng nói | 18:08:03 | 6 giây | 432 MB môi trường whisper qua mạng nội bộ |
| 4. Bật và kiểm 3 dịch vụ | 18:08:09 | 12 giây | `active` ×3, `stt OK`, `module OK` |
| 5. Hồ sơ bàn giao | 18:08:21 | dưới 1 giây | |
| **Tổng** | | **5 phút 02 giây** (cộng 47 giây tạo máy lần đầu ≈ 6 phút) | |
