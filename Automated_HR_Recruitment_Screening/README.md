# 🤖 ระบบรับสมัครและคัดกรองผู้สมัครงานอัตโนมัติ (Automated HR Recruitment & Screening System)

ระบบคัดกรองและประเมินคุณสมบัติผู้สมัครงานอัตโนมัติด้วย **UiPath RPA** ร่วมกับ **Google Workspace (Google Sheets & Gmail)** และ **Web Application Form** เพื่อช่วยลดเวลาในการทำงานของฝ่าย HR จากหลายชั่วโมงเหลือเพียงไม่กี่วินาที

---

## 📊 สไลด์นำเสนอโครงการ (Presentation Slide)

📌 **ลิงก์สไลด์นำเสนอใน Canva:**  
👉 [**คลิกเพื่อดูสไลด์นำเสนอ (Canva Presentation)**](https://canva.link/1yyu3psuk52l2pz)

---

## 🚀 คุณสมบัติของระบบ (Features)

1. **📄 Online Application Form:** แบบฟอร์มสมัครงานสไตล์กระดาษโน้ตสีครีม (Warm Cream Paper Theme) ใช้งานง่าย รองรับการกรอกข้อมูลและอัปโหลดเรซูเม่
2. **📊 Google Sheets Integration:** รับส่งข้อมูลผู้สมัครเข้าฐานข้อมูลกลางบน Google Sheet แบบ Real-time ผ่าน Google Apps Script Web App
3. **🤖 UiPath RPA Screening Engine:**
   * อ่านข้อมูลผู้สมัครและกรองเฉพาะรายชื่อที่มีสถานะ `รอตรวจสอบ`
   * ตรวจสอบเกรดเฉลี่ยสะสมอัตโนมัติ (`GPA >= 3.00`)
   * **กรณีผ่านเกณฑ์:** อัปเดตสถานะเป็น `ผ่านการคัดกรอง` และส่งอีเมมนัดสัมภาษณ์พร้อมแนบลิงก์นัดหมาย **Calendly**
   * **กรณีไม่ผ่านเกณฑ์:** อัปเดตสถานะเป็น `ไม่ผ่านการคัดกรอง` และส่งอีเมลแจ้งผลปฏิเสธอย่างสุภาพ (Rejection Letter)
   * เขียนอัปเดตผลลัพธ์และหมายเหตุบอทกลับลง Google Sheet อัตโนมัติ

---

## 🏗️ สถาปัตยกรรมระบบ (Architecture)

```text
[Web Application Form (HTML/CSS)] 
            │
            ▼ (POST Payload)
[Google Apps Script Web App] 
            │
            ▼ (Write Data)
[Google Sheets Database] 
            │
            ▼ (Read & Process)
[UiPath RPA Engine] ──(GPA >= 3.00)──► 🟢 ส่งอีเมมนัดสัมภาษณ์ (Calendly)
            │                        └── 🔴 ส่งอีเมลแจ้งผลปฏิเสธ
            ▼ (Write Back Result)
[Google Sheets Status Updated]
```

---

## 🛠️ เครื่องมือที่ใช้ (Tech Stack & Tools)

* **Frontend:** HTML5, Vanilla CSS3 (Warm Cream Paper Theme), JavaScript (ES6+)
* **Database & Cloud:** Google Sheets API, Google Apps Script
* **RPA Engine:** UiPath Studio, Google Workspace Package, Mail/SMTP Package
* **Email Service:** Gmail SMTP Integration
* **Scheduling:** Calendly Integration
* **Presentation:** [Canva Slide](https.canva.link/1yyu3psuk52l2pz)

---

## 📂 โครงสร้างโฟลเดอร์ (Directory Structure)

```text
├── index.html                     # แบบฟอร์มสมัครงานออนไลน์
├── dashboard.html                 # หน้าจอแสดงผลและสรุปสถิติสำหรับ HR
├── uipath/                        # โฟลเดอร์โครงการ UiPath RPA
│   ├── Main.xaml                  # Workflow หลักใน UiPath Studio
│   ├── project.json               # ค่าการตั้งค่าและ Dependencies ของ UiPath
│   └── Credentials/               # โฟลเดอร์เก็บคีย์ Service Account (credentials.json)
└── docs/                          # เอกสารคู่มือและการทดสอบ (UAT Test Data)
```

---

## 📝 ขั้นตอนการติดตั้งและรันระบบ

1. **เปิดหน้าฟอร์มสมัครงาน:**
   * ดับเบิลคลิกไฟล์ `index.html` หรือรันผ่าน Local Server:
     ```powershell
     python -m http.server 8080
     ```
2. **รันบอท UiPath:**
   * เปิดไฟล์ `uipath/Main.xaml` ในโปรแกรม **UiPath Studio**
   * กด **Run (F5)** เพื่อเริ่มกระบวนการคัดกรองอัตโนมัติ
