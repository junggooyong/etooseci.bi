import re
import json

v3_path = '/Users/etoos-gyjung/Library/CloudStorage/GoogleDrive-gooyong.jung@gmail.com/내 드라이브/_AICursor_Project/My247 Data/My247_대시보드_차트_v3.html'
v4_path = '/Users/etoos-gyjung/Library/CloudStorage/GoogleDrive-gooyong.jung@gmail.com/내 드라이브/_AICursor_Project/My247 Data/My247_대시보드_차트_v4.html'

with open(v3_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace dates and days
html = html.replace('2026.03.03 ~ 04.03', '2026.03.03 ~ 04.07')
html = html.replace('2026.03.03 ~ 2026.04.03', '2026.03.03 ~ 2026.04.07')
html = html.replace('31일간', '36일간')
html = html.replace('31일 · 실데이터', '36일 · 실데이터')
html = html.replace('31일 누적 합산 기준', '36일 누적 합산 기준')
html = html.replace('v3', 'v4')
html = html.replace('v2 - 데이터 레이블', 'v4')

# Replace KPI Texts in HTML
html = re.sub(r'<div class="kpi-value">98,762\s*<span class="kpi-unit">h</span></div>', r'<div class="kpi-value">117,358<span class="kpi-unit">h</span></div>', html)
html = re.sub(r'<div class="kpi-value">1,123\s*<span class="kpi-unit">명</span></div>', r'<div class="kpi-value">1,177<span class="kpi-unit">명</span></div>', html)
html = re.sub(r'<div class="kpi-value">87.9\s*<span class="kpi-unit">h</span></div>', r'<div class="kpi-value">99.7<span class="kpi-unit">h</span></div>', html)

# Replace DATA JSON
# Find `const DATA = { ... };` line
data_match = re.search(r'const DATA = ({.*?});', html, re.DOTALL)
if data_match:
    old_data_str = data_match.group(1)
    # Parse existing
    data_json = json.loads(old_data_str)
    
    # Update kpi
    data_json['kpi']['total_hours'] = 117358.5
    data_json['kpi']['total_students'] = 1177
    data_json['kpi']['avg_hours_per_student'] = 99.7
    
    # Update other fields from recent analysis
    data_json['daily_study'] = [{'date': '2026-03-03', 'hours': 717.1, 'students': 148}, {'date': '2026-03-04', 'hours': 2369.8, 'students': 332}, {'date': '2026-03-05', 'hours': 3708.3, 'students': 439}, {'date': '2026-03-06', 'hours': 4327.2, 'students': 444}, {'date': '2026-03-07', 'hours': 4188.9, 'students': 403}, {'date': '2026-03-08', 'hours': 2653.6, 'students': 218}, {'date': '2026-03-09', 'hours': 4989.8, 'students': 451}, {'date': '2026-03-10', 'hours': 5149.2, 'students': 473}, {'date': '2026-03-11', 'hours': 4466.6, 'students': 443}, {'date': '2026-03-12', 'hours': 4928.2, 'students': 438}, {'date': '2026-03-13', 'hours': 4599.6, 'students': 422}, {'date': '2026-03-14', 'hours': 3293.2, 'students': 354}, {'date': '2026-03-15', 'hours': 1149.0, 'students': 155}, {'date': '2026-03-16', 'hours': 2636.8, 'students': 305}, {'date': '2026-03-17', 'hours': 2568.4, 'students': 312}, {'date': '2026-03-18', 'hours': 3672.3, 'students': 389}, {'date': '2026-03-19', 'hours': 3727.6, 'students': 374}, {'date': '2026-03-20', 'hours': 3630.5, 'students': 368}, {'date': '2026-03-21', 'hours': 2817.6, 'students': 315}, {'date': '2026-03-22', 'hours': 725.8, 'students': 101}, {'date': '2026-03-23', 'hours': 3506.4, 'students': 356}, {'date': '2026-03-24', 'hours': 3600.1, 'students': 355}, {'date': '2026-03-25', 'hours': 3324.1, 'students': 341}, {'date': '2026-03-26', 'hours': 3556.2, 'students': 359}, {'date': '2026-03-27', 'hours': 3593.5, 'students': 361}, {'date': '2026-03-28', 'hours': 2413.5, 'students': 271}, {'date': '2026-03-29', 'hours': 943.5, 'students': 132}, {'date': '2026-03-30', 'hours': 3605.1, 'students': 368}, {'date': '2026-03-31', 'hours': 3704.8, 'students': 370}, {'date': '2026-04-01', 'hours': 3584.2, 'students': 361}, {'date': '2026-04-02', 'hours': 3650.5, 'students': 378}, {'date': '2026-04-03', 'hours': 3680.3, 'students': 362}, {'date': '2026-04-04', 'hours': 2986.0, 'students': 319}, {'date': '2026-04-05', 'hours': 961.9, 'students': 128}, {'date': '2026-04-06', 'hours': 3824.6, 'students': 392}, {'date': '2026-04-07', 'hours': 4104.1, 'students': 387}]
    data_json['subject_study'] = [{'subject': '수학', 'hours': 48096.7}, {'subject': '국어', 'hours': 33196.1}, {'subject': '사회탐구', 'hours': 15642.6}, {'subject': '영어', 'hours': 15134.3}, {'subject': '과학탐구', 'hours': 4665.9}, {'subject': '한국사', 'hours': 294.3}, {'subject': '직업탐구', 'hours': 170.1}, {'subject': '제2외국어/한문', 'hours': 158.5}]
    data_json['type_study'] = [{'type': '자습', 'hours': 87426.1}, {'type': '인강', 'hours': 27191.2}, {'type': '단과', 'hours': 2134.8}, {'type': '실모', 'hours': 606.4}]
    data_json['branch_study'] = [{'branch': '다산', 'hours': 22280.1}, {'branch': '인천송도', 'hours': 13225.3}, {'branch': '분당정자', 'hours': 12963.9}, {'branch': '평택', 'hours': 9808.5}, {'branch': '이천기숙학원', 'hours': 6736.3}, {'branch': '인천인하대', 'hours': 6098.9}, {'branch': '독학기숙학원', 'hours': 5636.1}, {'branch': '의정부', 'hours': 5486.7}, {'branch': '인천부평', 'hours': 3193.9}, {'branch': '김포', 'hours': 2818.0}, {'branch': '서울성동', 'hours': 2663.0}, {'branch': '서울강동', 'hours': 2591.6}, {'branch': '서울광진', 'hours': 2275.3}, {'branch': '대치', 'hours': 2247.3}, {'branch': '안성기숙학원', 'hours': 2081.3}, {'branch': '대구수성 1관', 'hours': 2044.3}, {'branch': '광명', 'hours': 1929.2}, {'branch': '강북', 'hours': 1448.0}, {'branch': '수원영통', 'hours': 1360.7}, {'branch': '은평서대문', 'hours': 1318.7}]

    # Format JSON
    new_data_str = json.dumps(data_json, ensure_ascii=False)
    # Replace in file
    html = html.replace(old_data_str, new_data_str)

with open(v4_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("v4 File Written.")
