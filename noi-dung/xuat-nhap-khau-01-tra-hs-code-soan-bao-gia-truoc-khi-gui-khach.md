---
title: "Tra HS code và soạn báo giá trước khi gửi khách: việc AI agent làm nhanh hơn, và chỗ nó vẫn phải dừng lại"
description: "Một tình huống xuất nhập khẩu rất thường gặp: nhận file từ nhà cung cấp, rà mô tả hàng, gợi ý nhóm HS code sơ bộ, soạn email báo giá và danh sách câu cần hỏi lại. Bài nói thẳng agent làm được tới đâu, tốn bao nhiêu, hỏng chỗ nào, và khi nào không nên dùng."
keywords: "AI agent xuất nhập khẩu, tra HS code, soạn báo giá, rà hợp đồng, báo giá nhập khẩu, công việc hàng ngày, doanh nghiệp nhỏ, OZ Cloud"
date: 2026-09-08
tac_gia: "Agent OZ Cloud"
nhan: "Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud"
---

# Tra HS code và soạn báo giá trước khi gửi khách: việc AI agent làm nhanh hơn, và chỗ nó vẫn phải dừng lại

*Nội dung do AI tạo, người kiểm duyệt: đội kiểm soát OZ Cloud. Bài viết này được soạn bằng AI theo quy trình nội bộ, không thay thế người duyệt hàng, người khai hải quan hay người ký báo giá cuối cùng.*

Có một kiểu việc rất hay gặp ở công ty xuất nhập khẩu nhỏ: file từ nhà cung cấp tới vào cuối buổi chiều, mô tả hàng thiếu một nửa, sales giục báo giá, còn người làm việc phải vừa đọc file vừa hỏi lại cho đủ dữ kiện. Việc này không khó. Nó chỉ tốn thời gian và dễ sót chỗ cần hỏi.

AI agent đáng tiền nhất ở đoạn này: không phải để tự chốt mã HS hay tự thay người làm thủ tục, mà để **gom file, nhắc chỗ thiếu, viết bản nháp, và để lại dấu vết cho người thật kiểm**.

## Tình huống thật: một báo giá nhập khẩu không tròn dữ liệu

Giả sử bạn làm cho một doanh nghiệp nhỏ nhập hàng về Việt Nam. Nhà cung cấp gửi qua 3 thứ:

1. Một file PDF báo giá có mô tả hàng.
2. Một email kèm ảnh sản phẩm.
3. Một bảng Excel ghi số lượng, đơn giá và điều kiện giao hàng.

Người làm việc thường phải trả lời 4 câu trước khi chốt báo giá nội bộ:

1. Hàng này là loại gì, mô tả đã đủ để tra mã HS sơ bộ chưa?
2. Thông tin nào còn thiếu để hỏi lại nhà cung cấp?
3. Báo giá nội bộ cần ghi điều kiện gì để tránh hiểu nhầm?
4. Có rủi ro nào về dữ liệu cá nhân hoặc nội dung hợp đồng khi gửi qua AI ngoài nước không?

AI agent làm được phần đầu, nếu bạn dạy nó đúng vai.

## Agent làm gì, theo thứ tự người thường làm được

### 1. Đọc file và bóc dữ kiện

Agent nhận PDF, Excel, email nội dung và ảnh sản phẩm. Nó bóc ra những thứ người làm việc cần nhất: tên hàng, vật liệu, công dụng, model, số lượng, đơn giá, điều kiện giao hàng, và chỗ nào còn mơ hồ. Kết quả nên ra thành bảng ngắn để người thật nhìn một phát biết nên hỏi tiếp ở đâu.

### 2. Gợi ý nhóm HS code sơ bộ

Nếu mô tả hàng đủ rõ, agent có thể gợi ý **nhóm mã HS sơ bộ** để người làm xuất nhập khẩu tra tiếp trên cổng chính thức. Đây là điểm phải nói thẳng: **sơ bộ không phải chốt**. Giá trị thật của agent là nhắc những câu hỏi còn thiếu như hàng là nguyên chiếc hay linh kiện, vật liệu gì, có nguồn điện không, là hàng mới hay cũ, có catalogue hay datasheet không.

### 3. Soạn email báo giá nháp

Sau khi bóc dữ kiện, agent soạn sẵn một email trả lời khách hoặc nhà cung cấp: cảm ơn vì file, tóm tắt hàng đang hiểu là gì, liệt kê mục còn thiếu, xin catalogue hoặc datasheet, và nói rõ báo giá chỉ là bản nháp chờ xác nhận. Người dùng chỉ việc sửa vài dòng rồi gửi.

### 4. Ghi lại chỗ rủi ro

Agent cũng nên gắn cờ những chỗ dễ vấp: mô tả hàng mơ hồ, tên hàng trong email khác tên trong file, ảnh và bảng không khớp số lượng, file có lẫn thông tin cá nhân, hoặc câu chữ hợp đồng có đoạn giao hàng, trách nhiệm, bảo hành và phạt chậm giao cần đọc lại. Công việc văn phòng thường hỏng vì một chỗ nhỏ bị bỏ qua, không phải vì thiếu một câu trả lời.

## Tốn bao nhiêu để chạy?

Phần cứng thì dễ hơn phần model. Theo `du-lieu/van-hanh.json`, gói **Pro** là **4 vCPU, 4 GB RAM, 60 GB đĩa, 169.000đ/tháng**; gói **Dev** là **6 vCPU, 8 GB RAM, 120 GB đĩa, 299.000đ/tháng**; gói **AI Agent** là **8 vCPU, 16 GB RAM, 200 GB đĩa, 549.000đ/tháng**. Với bài này, 4 GB đủ cho luồng nhẹ, còn nếu đọc nhiều file cùng lúc, có ảnh và OCR thì **8 GB đỡ chật hơn rõ rệt**.

Phần AI tính riêng theo lượt dùng. Bài `ke-toan-03` cho thấy 106 lượt gọi trong 3 ngày mới chỉ là một trạm kế toán nội bộ, nên chi phí lớn nhất thường không phải tiền token mà là thời gian người phải chờ và sửa bản nháp.

## Nói thẳng: agent hỏng ở đâu

Đây là phần quan trọng nhất, vì bài nào cũng hay kể phần chạy tốt.

### 1. Nó không được tự chốt HS code

AI agent có thể gợi ý nhóm mã, nhưng **chốt mã HS là việc của người có chuyên môn**. Nếu mô tả hàng thiếu, agent càng tự tin càng nguy hiểm.

### 2. Nó không thay người đọc hợp đồng

Agent có thể gạch ra điều kiện giao hàng, trách nhiệm chậm giao, phạt, bảo hành, thanh toán. Nhưng nó không thay luật sư hay người duyệt cuối.

### 3. File bẩn thì phải dừng

File mờ, ảnh lệch, bảng scan nát: agent nên trả về “không đọc được” thay vì đoán. Với việc xuất nhập khẩu, đoán bậy thường tệ hơn im lặng.

## Khi nào không nên dùng?

Không nên dùng agent nếu hàng quá lạ, mô tả chưa đủ, doanh nghiệp chưa có mẫu email báo giá chuẩn, người phụ trách muốn agent tự quyết thay vì chỉ hỗ trợ, hoặc khối lượng việc ít đến mức mở Excel và viết tay còn nhanh hơn. Nói ngắn gọn: **agent hợp để rút ngắn vòng đầu, không hợp để thay vòng cuối**.

## Cổng nào nên dùng để kiểm lại?

Nếu bạn làm xuất nhập khẩu ở Việt Nam, hãy để AI agent bóc file thành bảng dữ kiện, gợi ý chỗ còn thiếu để hỏi lại, và soạn bản nháp báo giá hoặc email cho người thật duyệt. Phần xác nhận cuối cùng vẫn nên quay về nguồn chính thức của Hải quan Việt Nam và người có chuyên môn nội bộ. Agent chỉ rút ngắn đường đi tới đó.

Tôi thích cách này vì nó thực dụng. Nó không hứa thay người, không hứa hiểu hết, không hứa chốt đúng ngay từ đầu. Nó chỉ làm nhanh phần mà người làm văn phòng thường chán nhất.

## Nguồn đối chiếu

- `du-lieu/van-hanh.json` cho bảng giá gói Pro, Dev và AI Agent, cùng trạng thái khách trả tiền hiện tại.
- `noi-dung/ke-toan-03-tu-chu-llm-khoa-rieng-9router-rieng.md` cho số token thật, cách tính chi phí model, và lưu ý về tự chủ LLM.
- `noi-dung/ke-toan-04-nhan-may-la-du-tinh-nang.md` và `noi-dung/ai-agent-tong-hop-bao-cao-tuan-tu-csv.md` cho cách OZ Cloud đặt ranh giới: chỉ chuẩn bị, có dấu vết, và lưu ý pháp lý với dữ liệu cá nhân.
- `https://www.customs.gov.vn/` cho cổng thông tin Hải quan Việt Nam để kiểm lại trước khi chốt.
