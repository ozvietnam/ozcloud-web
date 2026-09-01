---
title: "Sáng thứ Hai khỏi ngồi ghép số: cho AI agent nháp báo cáo tuần từ CSV"
description: "Một cách dùng AI agent vừa sức cho doanh nghiệp nhỏ: đọc các file CSV đã che thông tin cá nhân, tìm số lệch và soạn bản nháp báo cáo tuần để người phụ trách duyệt."
keywords: "AI agent báo cáo tuần, tổng hợp CSV, tự động hóa văn phòng, OpenClaw automations, bảo vệ dữ liệu cá nhân"
date: 2026-09-01
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Sáng thứ Hai khỏi ngồi ghép số: cho AI agent nháp báo cáo tuần từ CSV

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud.*

Sáng thứ Hai, bạn mở file bán hàng, file công nợ và file giao hàng. Ba bảng do ba người xuất ra, tên cột không giống nhau. Bạn cộng doanh thu, dò đơn chưa giao, tìm khoản quá hạn rồi viết lại thành vài đoạn gửi sếp. Công việc không khó, nhưng tuần nào cũng phải làm và chỉ cần kéo nhầm một dòng là cả báo cáo lệch.

Đây là việc hợp với AI agent hơn là giao cho một ô chat thông thường. Agent có thể tự thức dậy theo lịch, đọc đúng thư mục được giao, đối chiếu các bảng và soạn **bản nháp** theo một mẫu cố định. Từ “bản nháp” rất quan trọng: agent không được tự sửa sổ kế toán, gửi báo cáo cho khách hay kết luận số nào là số chính thức.

## Agent làm gì trong quy trình này?

Ta chia việc thành sáu chặng dễ kiểm:

1. Nhân viên xuất dữ liệu từ phần mềm đang dùng thành CSV.
2. Một bước tiền xử lý bỏ tên, số điện thoại, địa chỉ và mã số thuế; thay bằng mã nội bộ như `KH-A`, `KH-B`.
3. Agent chỉ được đọc thư mục chứa bản đã che dữ liệu.
4. Agent tính lại các tổng, liệt kê dòng thiếu và đánh dấu chỗ hai bảng không khớp.
5. Agent viết báo cáo theo mẫu, kèm tên file nguồn và thời điểm đọc.
6. Người phụ trách mở bảng gốc, kiểm các cảnh báo rồi mới gửi báo cáo.

Hãy bắt đầu bằng một mẫu ngắn, chẳng hạn:

```text
Mục 1: Việc đã hoàn thành
Mục 2: Việc đang chậm, kèm mã đơn
Mục 3: Công nợ cần người phụ trách kiểm tra
Mục 4: Dữ liệu thiếu hoặc mâu thuẫn
Mục 5: Danh sách file đã đọc
```

Đừng yêu cầu “phân tích tình hình kinh doanh thật sâu” ngay từ đầu. Hãy nói rõ cột nào được cộng, trạng thái nào được coi là chưa xong và khi nào phải ghi “không đủ dữ liệu”.

## Làm thử bằng tay trước, đặt lịch sau

Tạo một thư mục riêng trong workspace của agent, ví dụ `bao-cao-tuan/du-lieu-da-che/`. Chép vào đó vài file CSV của một tuần đã bỏ dữ liệu nhận dạng. Sau đó giao đúng câu lệnh công việc:

```text
Đọc các file CSV trong thư mục bao-cao-tuan/du-lieu-da-che.
Không đọc thư mục khác. Không sửa file nguồn.
Tính lại tổng từ từng dòng, không tin dòng TOTAL có sẵn.
Nếu thiếu cột hoặc hai file mâu thuẫn, ghi rõ KHÔNG ĐỦ DỮ LIỆU.
Chỉ tạo bản nháp theo mẫu báo cáo tuần, không gửi cho ai.
```

Chạy thử với một tuần mà bạn đã biết kết quả. Cố tình bỏ một cột và thêm một dòng trùng. Nếu agent vẫn viết trơn tru mà không cảnh báo, chưa nên đặt lịch.

Khi bản chạy tay đã ổn, OpenClaw có bộ lập lịch nằm trong Gateway. Tài liệu chính thức nói lịch chỉ chạy khi Gateway đang hoạt động; job và lịch sử chạy được lưu bền trong cơ sở dữ liệu trạng thái. Ví dụ tạo một việc chạy sáng thứ Hai theo giờ Việt Nam:

```bash
openclaw automations add \
  --name "Nháp báo cáo tuần" \
  --cron "0 8 * * 1" \
  --tz "Asia/Ho_Chi_Minh" \
  --session isolated \
  --message "Đọc thư mục dữ liệu đã che và tạo bản nháp theo mẫu đã duyệt. Không gửi ra ngoài."

openclaw automations list
```

Sau khi tạo, lấy ID trong danh sách và chạy thử ngay, đừng chờ tới thứ Hai kế tiếp:

```bash
openclaw automations run <job-id> --wait
openclaw automations runs --id <job-id>
```

CLI hiện dùng tên `automations`; `openclaw cron` vẫn là bí danh. Hãy mở `openclaw automations --help` trước khi làm theo.

## Tốn bao nhiêu?

Có hai khoản tách biệt: máy chạy agent và lượt dùng mô hình.

Với OpenClaw, cẩm nang OZ Cloud ghi mức vận hành tối thiểu chính thức là **1 GB RAM** và OZ Cloud tư vấn từ **2 GB**. Đây không phải RAM để chạy model local. Tài liệu Docker hiện hành còn yêu cầu **ít nhất 6 GB RAM** nếu tự build image từ mã nguồn; dùng image dựng sẵn tránh riêng yêu cầu build này. Vì vậy phải hỏi rõ bạn đang vận hành Gateway, tự build hay chạy cả model trên máy.

Tiền mô hình phụ thuộc độ dài file và bản nháp. Theo trang giá DeepSeek được cẩm nang đối chiếu ngày 18/08/2026, `v4-flash` thấp điểm có giá **0,22 USD đầu vào và 0,66 USD đầu ra cho mỗi triệu đơn vị**; cao điểm là **0,44 USD và 1,32 USD**. Đây là đơn giá, không phải giá một báo cáo. Hãy chạy một file thật, xem usage rồi nhân với đơn giá tại ngày triển khai.

Để giảm tiền, không gửi lại dữ liệu cũ không cần thiết và giữ mẫu báo cáo ngắn. Chỉ chuyển dòng mâu thuẫn cho model mạnh hơn hoặc cho người xử lý.

## Nói thẳng: chỗ nào sẽ hỏng?

**CSV bẩn.** Cột tiền có dấu chấm, dấu phẩy hoặc ô trống có thể bị hiểu sai. Hãy yêu cầu agent nêu quy tắc chuyển đổi và in tổng theo từng file để người duyệt đối chiếu.

**Agent có thể viết rất tự tin khi thiếu dữ liệu.** Vì vậy prompt phải buộc ghi “không đủ dữ liệu”, không được tự suy ra mã đơn, ngày giao hay lý do chậm.

**Lịch chạy không có nghĩa là báo cáo chắc chắn tới nơi.** Gateway tắt, model lỗi hoặc thư mục chưa có file mới thì job có thể thất bại. Tài liệu OpenClaw có lịch sử chạy và cảnh báo lỗi; người vận hành vẫn phải xem `automations runs`, không chỉ nhìn tin nhắn cuối.

**Dữ liệu cá nhân là ranh giới pháp lý.** Điều 20 Luật 91/2025/QH15 coi việc dùng nền tảng ngoài Việt Nam để xử lý dữ liệu cá nhân thu thập tại Việt Nam là chuyển dữ liệu ra nước ngoài. Hãy thay thông tin định danh bằng mã trước khi gọi API ngoài. Việc này giảm dữ liệu lộ ra, không tự xóa nghĩa vụ tuân thủ. Với dữ liệu nhạy cảm, cần người phụ trách pháp lý xác nhận và cân nhắc xử lý trong nước.

## Khi nào không nên dùng agent?

Không nên dùng nếu quy trình chưa có mẫu báo cáo thống nhất, đầu vào thay đổi mỗi tuần hoặc không ai chịu trách nhiệm duyệt. Cũng không nên cho agent tự nộp báo cáo thuế, tự xác nhận công nợ, tự gửi thư đòi tiền hay ghi ngược vào phần mềm kế toán. Những việc đó tạo hậu quả bên ngoài và cần người có thẩm quyền bấm duyệt.

Nếu mỗi tuần chỉ có một bảng nhỏ, công thức spreadsheet có thể rẻ và ổn định hơn. Agent đáng dùng khi phải đọc nhiều nguồn, giải thích chỗ lệch và lặp lại theo lịch.

Bài thử tốt nhất không phải là bản báo cáo đẹp. Đó là bản nháp biết dừng ở dòng dữ liệu thiếu, chỉ ra đúng chỗ cần người kiểm và không tự ý gửi đi. Khi làm được ba việc ấy đều đặn, lúc đó mới đáng giao cho nó sáng thứ Hai.

---

**Nguồn đối chiếu:** [OpenClaw Automations](https://docs.openclaw.ai/automation/cron-jobs) (lịch, múi giờ, lịch sử chạy; đọc 01/09/2026); [OpenClaw Docker](https://docs.openclaw.ai/install/docker) (RAM build và image dựng sẵn; đọc 01/09/2026); [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing) (đơn giá, cẩm nang đối chiếu ngày 18/08/2026); Luật 91/2025/QH15 và Nghị định 356/2025/NĐ-CP qua mục 8 `CAM-NANG-AGENT.md`; RAM OpenClaw qua mục 4 cùng cẩm nang. Giá phải kiểm lại tại ngày triển khai.
