---
title: "Một ngày của kế toán có trợ lý AI trên Zalo: bớt mở file, không bớt quyền duyệt"
description: "Một ngày làm việc cụ thể của kế toán khi dùng VPS và trợ lý AI của OZ Cloud qua Zalo: hỏi số liệu, đưa chứng từ vào hộp nhận file, giao việc và duyệt báo cáo."
keywords: "kế toán dùng VPS, trợ lý AI trên Zalo, AI cho kế toán doanh nghiệp nhỏ, trợ lý Zalo đọc Excel, OZ Cloud"
date: 2026-09-03
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Một ngày của kế toán có trợ lý AI trên Zalo: bớt mở file, không bớt quyền duyệt

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud.*

Một sáng thứ Hai ở phòng kế toán doanh nghiệp nhỏ: vừa mở máy đã có người hỏi số phải thu, một hoá đơn mới nằm trong điện thoại, sếp cần báo cáo trước giờ họp. Bình thường tôi tìm bản Excel, lọc dữ liệu rồi gõ lại vào Zalo. Có hôm tôi mở nhầm bản tuần trước và phải đính chính.

VPS và trợ lý AI không làm nghiệp vụ biến mất. Tôi dùng Zalo để **hỏi, giao việc và nhận bản nháp**, còn quy trình nằm trên máy chủ. Tôi vẫn kiểm số và quyết định gửi.

Dưới đây là một ngày mẫu. Tất cả tên công ty, mã khách và số tiền đều là **ví dụ minh hoạ**, không phải dữ liệu khách hàng hay kết quả vận hành của OZ Cloud.

## 8 giờ: hỏi trước, mở file sau

Tôi nhắn riêng cho trợ lý:

```text
Cho tôi tình hình công nợ đầu ngày từ file đã nạp hôm qua.
Chỉ dùng sheet Phai_thu. Nêu ngày dữ liệu và file nguồn.
Nếu không thấy file đúng ngày thì báo thiếu, không lấy bản cũ thay thế.
```

Trợ lý có thể trả một bản tóm tắt kiểu này:

```text
VÍ DỤ MINH HOẠ
Nguồn: cong-no-2026-09-02.xlsx, sheet Phai_thu
Ngày dữ liệu trong file: 02/09/2026
Tổng phải thu theo cột Con_lai: 480.000.000đ
Có 7 khoản đã quá ngày đến hạn.
Cảnh báo: 2 dòng thiếu ngày đến hạn, chưa đưa vào nhóm quá hạn.
```

Tôi cần thấy tên file, sheet, ngày dữ liệu và cảnh báo để kiểm lại. Với số tiền, trợ lý phải viết công thức rồi để máy chạy, không cho mô hình cộng nhẩm. Câu giao việc phải rõ phạm vi, cột cần tính và điều kiện dừng.

## 9 giờ 30: đưa hoá đơn vào đúng cửa

Một hoá đơn vừa đến điện thoại. Tôi không gửi PDF thẳng vào bot rồi chờ phép màu. Zalo Bot Creator hiện không chuyển file PDF, Word, Excel, tin thoại hay video cho bot; ảnh cũng không phải luồng vận hành ổn định. Đây là giới hạn của kênh.

Cách đang có của trợ lý OZ Cloud là **hộp nhận file riêng**:

1. Tôi nhắn `nhận file` trong cuộc trò chuyện riêng với trợ lý.
2. Trợ lý trả một đường dẫn dùng một lần và hết hạn sau một giờ.
3. Tôi mở đường dẫn trên điện thoại, chọn ảnh hoá đơn hoặc PDF có lớp chữ, rồi ghi yêu cầu: “Trích số hoá đơn, ngày, tên nhà cung cấp, tiền trước thuế, thuế và tổng thanh toán. Chỉ làm bản nháp.”
4. Kết quả quay lại đúng cuộc trò chuyện Zalo để tôi đối chiếu với chứng từ gốc.

PDF scan chưa có OCR thì trợ lý không đọc được chữ. Khi đó tôi dùng ảnh chụp rõ, đủ bốn góc; hoặc tự OCR bằng công cụ đã được doanh nghiệp duyệt trước khi gửi. Trợ lý phải nói “không đọc được” thay vì tự lấp số còn thiếu.

Đây là bước chuẩn bị, không phải tự hạch toán. Tôi vẫn kiểm mã số thuế, số tiền và hàng hoá trước khi duyệt. Xem cách hộp nhận hoạt động tại bài [trợ lý Zalo đọc file, nghe thoại, gửi báo cáo](/blog/tro-ly-zalo-doc-file-nghe-thoai-gui-bao-cao/).

## 11 giờ: giao một việc, không giao cả quyền quyết định

Trước giờ nghỉ, tôi cần rà các khoản quá hạn để chiều trao đổi với kinh doanh. Tôi nhắn:

```text
Từ file công nợ sáng nay, lọc các khoản quá hạn.
Nhóm theo nhân viên phụ trách và số ngày quá hạn.
Soạn nội dung nhắc nội bộ, không gửi cho khách, không sửa file nguồn.
Đánh dấu riêng mọi dòng thiếu ngày hoặc thiếu người phụ trách.
```

Yêu cầu này vào hàng đợi trên VPS; tôi không cần giữ điện thoại hay máy tính mở. Làm xong, trợ lý báo trong chat và có thể tạo file Excel. Tôi luôn thêm ba van: **không gửi**, **không sửa nguồn**, **thiếu thì đánh dấu**. Gửi thư nhắc nợ là hành động đối ngoại, phải có người duyệt. Trợ lý cũng không được tự nộp tờ khai, ký hoá đơn điện tử, chuyển tiền hay ghi số liệu vào sổ.

## 15 giờ: nhận bản nháp có dấu vết

Trước cuộc họp, thay vì nhắn “làm báo cáo đẹp”, tôi yêu cầu một đầu ra kiểm được:

```text
Xuất bản nháp báo cáo ngày từ các file đã xử lý hôm nay.
Gồm: nguồn đã đọc, số dòng hợp lệ, dòng bị loại, công nợ quá hạn
và danh sách chỗ cần người kiểm. Không tự kết luận nguyên nhân.
```

Báo cáo phải chỉ ra file, công thức và dữ liệu bị bỏ qua. Nếu chỉ có số tổng không để lại dấu vết, tôi coi như chưa xong. Tôi mở cảnh báo, so vài khoản với nguồn rồi mới dùng. Trợ lý giúp gom và trình bày; trách nhiệm vẫn ở người duyệt.

## Tốn gì để vận hành một ngày như vậy?

Có hai khoản riêng biệt.

**VPS:** bảng giá OZ Cloud ngày 03/09/2026 niêm yết gói Pro gồm 4 vCPU, 4 GB RAM, 60 GB đĩa với giá **169.000đ/tháng**. Đây không phải cam kết chứa được mọi kho chứng từ; file lớn, OCR hoặc nhiều người dùng cần đo tải. Cụm máy đang lắp đặt và trang thanh toán chưa mở; hiện chỉ nhận **đăng ký sớm**, chưa thể giao ngay.

**Mô hình AI:** tiền lượt dùng trả riêng cho nhà cung cấp. Chi phí phụ thuộc lượng chữ, số trang, số lần hỏi và mô hình; chưa đo file thật thì không thể chốt tiền tháng. Với chứng từ có dữ liệu cá nhân, gọi nền tảng ngoài Việt Nam có thể là chuyển dữ liệu ra nước ngoài theo Điều 20 Luật 91/2025/QH15. Doanh nghiệp phải xác định luồng dữ liệu và nghĩa vụ trước khi bật; lưu file trên VPS Việt Nam không biến lời gọi mô hình ngoài nước thành xử lý trong nước.

## Nói thẳng: những giới hạn phải chấp nhận

Trợ lý không thay kế toán hay người ký. Nó có thể trích sai ô, hiểu sai tiêu đề hoặc viết tự tin khi thiếu dữ liệu. Mọi kết quả tiền, thuế, hạn nộp và công nợ phải có nguồn để kiểm.

Zalo là màn hình trò chuyện, không phải kho chứng từ. Bot không nhận file, voice hoặc video trực tiếp; muốn đọc file phải qua hộp nhận riêng. Bot Marketplace cũng chưa dùng được trong nhóm. Nếu nhiều nhân viên cùng dùng, phải cấu hình phân quyền trước.

VPS Việt Nam giúp chủ động nơi lưu file, nhưng dữ liệu vẫn có thể tới nhà cung cấp nếu dùng API ngoài. Chỉ được nói dữ liệu không rời máy khi quy trình xử lý tại chỗ đã được kiểm chứng.

## Khi nào không nên dùng?

Không nên dùng nếu chưa thống nhất mẫu file, cột đổi liên tục hoặc không có người duyệt. Bảng tính có công thức cố định thường rẻ và tin cậy hơn agent cho bài toán chỉ cộng vài cột.

Cũng không nên dùng nếu bắt buộc bot nhận mọi chứng từ ngay trong Zalo, làm việc trong nhóm chat, tự nộp thuế hoặc tự chuyển tiền. Những nhu cầu đó vượt giới hạn kênh hoặc van an toàn kế toán.

Tôi bớt tìm file và gõ lại bản nháp, nhưng không bỏ bước kiểm tra. Nếu muốn thử cách này, hãy **đăng ký sớm** trên trang chủ để OZ Cloud trao đổi quy trình và báo khi cụm máy mở; chương trình đặt trước hiện **chưa nhận tiền**.

---

**Nguồn đối chiếu:** [Trợ lý Zalo đọc file, nghe thoại, gửi báo cáo](/blog/tro-ly-zalo-doc-file-nghe-thoai-gui-bao-cao/) (chức năng hộp nhận file, đọc ảnh/PDF/Word/Excel/CSV và xuất báo cáo; kết quả đo 01–02/09/2026); mục 4, 8 và 9 `CAM-NANG-AGENT.md` (RAM OpenClaw, Luật 91/2025/QH15, phạm vi Zalo Bot Creator; đối chiếu 03/09/2026); `du-lieu/van-hanh.json` và `du-lieu/thanh-toan.json` (bảng giá sáu gói, trạng thái hạ tầng và thanh toán; đọc 03/09/2026). Các con số trong tình huống công nợ là ví dụ minh hoạ.
