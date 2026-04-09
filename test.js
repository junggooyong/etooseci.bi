  <script>
    // ══ 플러그인 등록 & 기본값 ══
    Chart.register(ChartDataLabels);
    Chart.defaults.set('plugins.datalabels', { display: false });

    // 재사용 datalabels 유틸
    const DL_BAR = (fmtFn) => ({
      display: true, anchor: 'end', align: 'right', offset: 4, clip: false,
      formatter: fmtFn || ((v) => v.toLocaleString()),
      font: { size: 10, weight: '600', family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif" },
      color: '#374151'
    });
    const DL_STACK = {
      display: true, anchor: 'center', align: 'center',
      formatter: (v) => v > 0 ? v.toLocaleString() : '',
      font: { size: 11, weight: '700', family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif" },
      color: '#fff'
    };
    const DL_DONUT = (unit) => ({
      display: true, anchor: 'center', align: 'center',
      formatter: (v, ctx) => {
        const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
        return v.toLocaleString() + (unit||'') + '\n(' + (v/total*100).toFixed(1) + '%)';
      },
      font: { size: 9.5, weight: '700', family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif" },
      color: '#fff',
      textShadowBlur: 3, textShadowColor: 'rgba(0,0,0,0.35)'
    });
    
    const DL_LINE = (unit) => ({
      display: true, anchor: 'end', align: 'top', offset: 4, clip: false,
      formatter: (v) => v.toLocaleString() + (unit || ''),
      font: { size: 9.5, weight: '600', family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif" },
      color: (ctx) => ctx.dataset.borderColor || '#374151'
    });

    // ═══════════════════ DATA ═══════════════════
    const DATA = {"kpi": {"total_hours": 117358.5, "total_students": 1177, "avg_hours_per_student": 99.7, "total_devices": 4561, "total_login_users": 3841, "total_pass_selections": 5347, "total_attend_changes": 384, "total_univ_targets": 2204}, "daily_study": [{"date": "2026-03-03", "hours": 717.1, "students": 148}, {"date": "2026-03-04", "hours": 2369.8, "students": 332}, {"date": "2026-03-05", "hours": 3708.3, "students": 439}, {"date": "2026-03-06", "hours": 4327.2, "students": 444}, {"date": "2026-03-07", "hours": 4188.9, "students": 403}, {"date": "2026-03-08", "hours": 2653.6, "students": 218}, {"date": "2026-03-09", "hours": 4989.8, "students": 451}, {"date": "2026-03-10", "hours": 5149.2, "students": 473}, {"date": "2026-03-11", "hours": 4466.6, "students": 443}, {"date": "2026-03-12", "hours": 4928.2, "students": 438}, {"date": "2026-03-13", "hours": 4599.6, "students": 422}, {"date": "2026-03-14", "hours": 3293.2, "students": 354}, {"date": "2026-03-15", "hours": 1149.0, "students": 155}, {"date": "2026-03-16", "hours": 2636.8, "students": 305}, {"date": "2026-03-17", "hours": 2568.4, "students": 312}, {"date": "2026-03-18", "hours": 3672.3, "students": 389}, {"date": "2026-03-19", "hours": 3727.6, "students": 374}, {"date": "2026-03-20", "hours": 3630.5, "students": 368}, {"date": "2026-03-21", "hours": 2817.6, "students": 315}, {"date": "2026-03-22", "hours": 725.8, "students": 101}, {"date": "2026-03-23", "hours": 3506.4, "students": 356}, {"date": "2026-03-24", "hours": 3600.1, "students": 355}, {"date": "2026-03-25", "hours": 3324.1, "students": 341}, {"date": "2026-03-26", "hours": 3556.2, "students": 359}, {"date": "2026-03-27", "hours": 3593.5, "students": 361}, {"date": "2026-03-28", "hours": 2413.5, "students": 271}, {"date": "2026-03-29", "hours": 943.5, "students": 132}, {"date": "2026-03-30", "hours": 3605.1, "students": 368}, {"date": "2026-03-31", "hours": 3704.8, "students": 370}, {"date": "2026-04-01", "hours": 3584.2, "students": 361}, {"date": "2026-04-02", "hours": 3650.5, "students": 378}, {"date": "2026-04-03", "hours": 3680.3, "students": 362}, {"date": "2026-04-04", "hours": 2986.0, "students": 319}, {"date": "2026-04-05", "hours": 961.9, "students": 128}, {"date": "2026-04-06", "hours": 3824.6, "students": 392}, {"date": "2026-04-07", "hours": 4104.1, "students": 387}], "branch_study": [{"branch": "다산", "hours": 22280.1}, {"branch": "인천송도", "hours": 13225.3}, {"branch": "분당정자", "hours": 12963.9}, {"branch": "평택", "hours": 9808.5}, {"branch": "이천기숙학원", "hours": 6736.3}, {"branch": "인천인하대", "hours": 6098.9}, {"branch": "독학기숙학원", "hours": 5636.1}, {"branch": "의정부", "hours": 5486.7}, {"branch": "인천부평", "hours": 3193.9}, {"branch": "김포", "hours": 2818.0}, {"branch": "서울성동", "hours": 2663.0}, {"branch": "서울강동", "hours": 2591.6}, {"branch": "서울광진", "hours": 2275.3}, {"branch": "대치", "hours": 2247.3}, {"branch": "안성기숙학원", "hours": 2081.3}, {"branch": "대구수성 1관", "hours": 2044.3}, {"branch": "광명", "hours": 1929.2}, {"branch": "강북", "hours": 1448.0}, {"branch": "수원영통", "hours": 1360.7}, {"branch": "은평서대문", "hours": 1318.7}], "subject_study": [{"subject": "수학", "hours": 48096.7}, {"subject": "국어", "hours": 33196.1}, {"subject": "사회탐구", "hours": 15642.6}, {"subject": "영어", "hours": 15134.3}, {"subject": "과학탐구", "hours": 4665.9}, {"subject": "한국사", "hours": 294.3}, {"subject": "직업탐구", "hours": 170.1}, {"subject": "제2외국어/한문", "hours": 158.5}], "type_study": [{"type": "자습", "hours": 87426.1}, {"type": "인강", "hours": 27191.2}, {"type": "단과", "hours": 2134.8}, {"type": "실모", "hours": 606.4}], "os_device": [{"os": "IOS", "count": 3111}, {"os": "ANDROID", "count": 1450}], "device_model": [{"model": "iPad", "count": 2444}, {"model": "iPhone", "count": 667}, {"model": "SM-T500", "count": 125}, {"model": "SM-T733", "count": 85}, {"model": "SM-X700", "count": 51}, {"model": "SM-X800", "count": 51}, {"model": "SM-X210", "count": 50}, {"model": "SM-P610", "count": 47}, {"model": "SM-X610", "count": 44}, {"model": "SM-X510", "count": 40}], "device_reg_daily": [{"date": "2026-03-03", "count": 1035}, {"date": "2026-03-04", "count": 835}, {"date": "2026-03-05", "count": 434}, {"date": "2026-03-06", "count": 268}, {"date": "2026-03-07", "count": 146}, {"date": "2026-03-08", "count": 131}, {"date": "2026-03-09", "count": 240}, {"date": "2026-03-10", "count": 161}, {"date": "2026-03-11", "count": 102}, {"date": "2026-03-12", "count": 82}, {"date": "2026-03-13", "count": 75}, {"date": "2026-03-14", "count": 48}, {"date": "2026-03-15", "count": 47}, {"date": "2026-03-16", "count": 75}, {"date": "2026-03-17", "count": 58}, {"date": "2026-03-18", "count": 67}, {"date": "2026-03-19", "count": 46}, {"date": "2026-03-20", "count": 38}, {"date": "2026-03-21", "count": 34}, {"date": "2026-03-22", "count": 54}, {"date": "2026-03-23", "count": 72}, {"date": "2026-03-24", "count": 60}, {"date": "2026-03-25", "count": 47}, {"date": "2026-03-26", "count": 44}, {"date": "2026-03-27", "count": 26}, {"date": "2026-03-28", "count": 36}, {"date": "2026-03-29", "count": 42}, {"date": "2026-03-30", "count": 67}, {"date": "2026-03-31", "count": 39}, {"date": "2026-04-01", "count": 81}, {"date": "2026-04-02", "count": 59}, {"date": "2026-04-03", "count": 12}], "lecture_search": [{"name": "강민철의 기출 분석 [독서]", "clicks": 909, "subject": "국어"}, {"name": "강민철의 기출 분석 [문학]", "clicks": 688, "subject": "국어"}, {"name": "이지영의 출제자의 눈, 개념완성", "clicks": 663, "subject": "생활과윤리"}, {"name": "[사회문화] 불후의 명강 개념완성", "clicks": 425, "subject": "생활과윤리"}, {"name": "All Of KICE [predator : 독서]", "clicks": 361, "subject": "국어"}, {"name": "이지영의 출제자의 눈, 개념완성", "clicks": 320, "subject": "사회문화"}, {"name": "개념때려잡기 수학Ⅰ ① 지수함수와 로그함수", "clicks": 319, "subject": "수학"}, {"name": "LIM IT - 생활과 윤리", "clicks": 307, "subject": "생활과윤리"}, {"name": "[문학] 훈련도감", "clicks": 305, "subject": "국어"}, {"name": "현우진의 뉴런 - 수학Ⅰ (공통)", "clicks": 305, "subject": "수학"}, {"name": "개념때려잡기 수학Ⅰ ② 삼각함수", "clicks": 276, "subject": "수학"}, {"name": "강민철의 기본1 [독서+문학]", "clicks": 270, "subject": "국어"}, {"name": "개념때려잡기 수학Ⅱ ② 미분", "clicks": 268, "subject": "수학"}, {"name": "All Of KICE [predator : 문학]", "clicks": 259, "subject": "국어"}, {"name": "LIM IT - 사회문화", "clicks": 238, "subject": "사회문화"}], "subject_search": [{"subject": "국어", "clicks": 6306}, {"subject": "수학", "clicks": 5350}, {"subject": "영어", "clicks": 2625}, {"subject": "생활과윤리", "clicks": 2097}, {"subject": "확률과통계", "clicks": 1373}, {"subject": "사회문화", "clicks": 967}, {"subject": "미적분", "clicks": 924}, {"subject": "언어와매체", "clicks": 755}, {"subject": "한국지리", "clicks": 471}, {"subject": "화법과작문", "clicks": 451}, {"subject": "세계지리", "clicks": 376}, {"subject": "윤리와사상", "clicks": 354}, {"subject": "생명과학I", "clicks": 265}, {"subject": "지구과학I", "clicks": 239}, {"subject": "한국사", "clicks": 179}], "pass_selection": [{"pass": "ETOOS", "active": 1373, "total": 1695, "inactive": 322}, {"pass": "메가스터디", "active": 1301, "total": 1617, "inactive": 316}, {"pass": "EBS", "active": 527, "total": 781, "inactive": 254}, {"pass": "대성 마이맥", "active": 933, "total": 1254, "inactive": 321}], "pass_daily": [{"date": "2026-03-03", "count": 940}, {"date": "2026-03-04", "count": 972}, {"date": "2026-03-05", "count": 563}, {"date": "2026-03-06", "count": 398}, {"date": "2026-03-07", "count": 208}, {"date": "2026-03-08", "count": 98}, {"date": "2026-03-09", "count": 204}, {"date": "2026-03-10", "count": 203}, {"date": "2026-03-11", "count": 116}, {"date": "2026-03-12", "count": 87}, {"date": "2026-03-13", "count": 85}, {"date": "2026-03-14", "count": 47}, {"date": "2026-03-15", "count": 42}, {"date": "2026-03-16", "count": 100}, {"date": "2026-03-17", "count": 60}, {"date": "2026-03-18", "count": 74}, {"date": "2026-03-19", "count": 51}, {"date": "2026-03-20", "count": 45}, {"date": "2026-03-21", "count": 30}, {"date": "2026-03-22", "count": 27}, {"date": "2026-03-23", "count": 64}, {"date": "2026-03-24", "count": 40}, {"date": "2026-03-25", "count": 53}, {"date": "2026-03-26", "count": 86}, {"date": "2026-03-27", "count": 85}, {"date": "2026-03-28", "count": 128}, {"date": "2026-03-29", "count": 233}, {"date": "2026-03-30", "count": 81}, {"date": "2026-03-31", "count": 74}, {"date": "2026-04-01", "count": 85}, {"date": "2026-04-02", "count": 61}, {"date": "2026-04-03", "count": 7}], "subject_selection": [{"subject": "화법과작문", "count": 1443}, {"subject": "확률과통계", "count": 1407}, {"subject": "사회문화", "count": 1352}, {"subject": "생활과윤리", "count": 1037}, {"subject": "언어와매체", "count": 857}, {"subject": "미적분", "count": 778}, {"subject": "지구과학I", "count": 385}, {"subject": "윤리와사상", "count": 300}, {"subject": "세계지리", "count": 292}, {"subject": "생명과학I", "count": 281}, {"subject": "한국지리", "count": 270}, {"subject": "정치와법", "count": 143}, {"subject": "동아시아사", "count": 113}, {"subject": "물리학I", "count": 103}, {"subject": "일본어I", "count": 86}], "gyogwa_selection": [{"gyogwa": "사회탐구", "count": 3617}, {"gyogwa": "국어", "count": 2300}, {"gyogwa": "수학", "count": 2263}, {"gyogwa": "과학탐구", "count": 917}, {"gyogwa": "제2외국어/한문", "count": 285}, {"gyogwa": "직업탐구", "count": 19}], "subject_sel_daily": [{"date": "2026-03-03", "count": 1348}, {"date": "2026-03-04", "count": 1195}, {"date": "2026-03-05", "count": 793}, {"date": "2026-03-06", "count": 888}, {"date": "2026-03-07", "count": 413}, {"date": "2026-03-08", "count": 333}, {"date": "2026-03-09", "count": 412}, {"date": "2026-03-10", "count": 313}, {"date": "2026-03-11", "count": 285}, {"date": "2026-03-12", "count": 166}, {"date": "2026-03-13", "count": 207}, {"date": "2026-03-14", "count": 137}, {"date": "2026-03-15", "count": 95}, {"date": "2026-03-16", "count": 140}, {"date": "2026-03-17", "count": 153}, {"date": "2026-03-18", "count": 116}, {"date": "2026-03-19", "count": 129}, {"date": "2026-03-20", "count": 414}, {"date": "2026-03-21", "count": 105}, {"date": "2026-03-22", "count": 44}, {"date": "2026-03-23", "count": 130}, {"date": "2026-03-24", "count": 95}, {"date": "2026-03-25", "count": 116}, {"date": "2026-03-26", "count": 148}, {"date": "2026-03-27", "count": 199}, {"date": "2026-03-28", "count": 198}, {"date": "2026-03-29", "count": 149}, {"date": "2026-03-30", "count": 129}, {"date": "2026-03-31", "count": 194}, {"date": "2026-04-01", "count": 217}, {"date": "2026-04-02", "count": 110}, {"date": "2026-04-03", "count": 30}], "user_type": [{"type": "GUARDIAN", "count": 570}, {"type": "STUDENT", "count": 3271}], "login_daily": [{"date": "2026-03-03", "student": 934, "guardian": 195}, {"date": "2026-03-04", "student": 683, "guardian": 93}, {"date": "2026-03-05", "student": 348, "guardian": 34}, {"date": "2026-03-06", "student": 212, "guardian": 19}, {"date": "2026-03-07", "student": 103, "guardian": 25}, {"date": "2026-03-08", "student": 70, "guardian": 25}, {"date": "2026-03-09", "student": 167, "guardian": 28}, {"date": "2026-03-10", "student": 115, "guardian": 4}, {"date": "2026-03-11", "student": 60, "guardian": 8}, {"date": "2026-03-12", "student": 43, "guardian": 6}, {"date": "2026-03-13", "student": 43, "guardian": 5}, {"date": "2026-03-14", "student": 23, "guardian": 3}, {"date": "2026-03-15", "student": 15, "guardian": 7}, {"date": "2026-03-16", "student": 44, "guardian": 9}, {"date": "2026-03-17", "student": 33, "guardian": 7}, {"date": "2026-03-18", "student": 34, "guardian": 8}, {"date": "2026-03-19", "student": 14, "guardian": 4}, {"date": "2026-03-20", "student": 13, "guardian": 2}, {"date": "2026-03-21", "student": 12, "guardian": 5}, {"date": "2026-03-22", "student": 23, "guardian": 6}, {"date": "2026-03-23", "student": 35, "guardian": 6}, {"date": "2026-03-24", "student": 23, "guardian": 4}, {"date": "2026-03-25", "student": 18, "guardian": 6}, {"date": "2026-03-26", "student": 21, "guardian": 10}, {"date": "2026-03-27", "student": 16, "guardian": 5}, {"date": "2026-03-28", "student": 14, "guardian": 5}, {"date": "2026-03-29", "student": 15, "guardian": 10}, {"date": "2026-03-30", "student": 36, "guardian": 7}, {"date": "2026-03-31", "student": 13, "guardian": 8}, {"date": "2026-04-01", "student": 54, "guardian": 8}, {"date": "2026-04-02", "student": 29, "guardian": 5}], "attend_type": [{"type": "지각", "count": 264}, {"type": "결석", "count": 120}], "attend_daily": [{"date": "2026-03-03", "count": 17}, {"date": "2026-03-04", "count": 6}, {"date": "2026-03-05", "count": 17}, {"date": "2026-03-06", "count": 14}, {"date": "2026-03-07", "count": 18}, {"date": "2026-03-08", "count": 4}, {"date": "2026-03-09", "count": 9}, {"date": "2026-03-10", "count": 8}, {"date": "2026-03-11", "count": 11}, {"date": "2026-03-12", "count": 15}, {"date": "2026-03-13", "count": 16}, {"date": "2026-03-14", "count": 11}, {"date": "2026-03-15", "count": 9}, {"date": "2026-03-16", "count": 19}, {"date": "2026-03-17", "count": 3}, {"date": "2026-03-18", "count": 18}, {"date": "2026-03-19", "count": 19}, {"date": "2026-03-20", "count": 17}, {"date": "2026-03-21", "count": 11}, {"date": "2026-03-22", "count": 4}, {"date": "2026-03-23", "count": 11}, {"date": "2026-03-24", "count": 17}, {"date": "2026-03-25", "count": 17}, {"date": "2026-03-26", "count": 8}, {"date": "2026-03-27", "count": 19}, {"date": "2026-03-28", "count": 19}, {"date": "2026-03-29", "count": 12}, {"date": "2026-03-30", "count": 21}, {"date": "2026-03-31", "count": 14}], "target_univ": [{"univ": "고려대학교", "count": 244}, {"univ": "연세대학교", "count": 243}, {"univ": "서울대학교", "count": 199}, {"univ": "경희대학교", "count": 169}, {"univ": "성균관대학교", "count": 151}, {"univ": "건국대학교", "count": 146}, {"univ": "중앙대학교", "count": 131}, {"univ": "한양대학교", "count": 127}, {"univ": "이화여자대학교", "count": 92}, {"univ": "홍익대학교", "count": 63}, {"univ": "서강대학교", "count": 43}, {"univ": "인하대학교", "count": 40}, {"univ": "국민대학교", "count": 39}, {"univ": "서울시립대학교", "count": 34}, {"univ": "동국대학교", "count": 33}], "univ_daily": [{"date": "2026-03-03", "count": 337}, {"date": "2026-03-04", "count": 351}, {"date": "2026-03-05", "count": 206}, {"date": "2026-03-06", "count": 168}, {"date": "2026-03-07", "count": 86}, {"date": "2026-03-08", "count": 53}, {"date": "2026-03-09", "count": 92}, {"date": "2026-03-10", "count": 85}, {"date": "2026-03-11", "count": 46}, {"date": "2026-03-12", "count": 34}, {"date": "2026-03-13", "count": 24}, {"date": "2026-03-14", "count": 23}, {"date": "2026-03-15", "count": 15}, {"date": "2026-03-16", "count": 36}, {"date": "2026-03-17", "count": 14}, {"date": "2026-03-18", "count": 21}, {"date": "2026-03-19", "count": 25}, {"date": "2026-03-20", "count": 13}, {"date": "2026-03-21", "count": 11}, {"date": "2026-03-22", "count": 12}, {"date": "2026-03-23", "count": 14}, {"date": "2026-03-24", "count": 20}, {"date": "2026-03-25", "count": 17}, {"date": "2026-03-26", "count": 24}, {"date": "2026-03-27", "count": 45}, {"date": "2026-03-28", "count": 68}, {"date": "2026-03-29", "count": 260}, {"date": "2026-03-30", "count": 34}, {"date": "2026-03-31", "count": 18}, {"date": "2026-04-01", "count": 38}, {"date": "2026-04-02", "count": 12}, {"date": "2026-04-03", "count": 2}], "ios_daily_dl": [{"date": "2026-03-03", "count": 780}, {"date": "2026-03-04", "count": 657}, {"date": "2026-03-05", "count": 275}, {"date": "2026-03-06", "count": 211}, {"date": "2026-03-07", "count": 116}, {"date": "2026-03-08", "count": 89}, {"date": "2026-03-09", "count": 158}, {"date": "2026-03-10", "count": 122}, {"date": "2026-03-11", "count": 96}, {"date": "2026-03-12", "count": 62}, {"date": "2026-03-13", "count": 62}, {"date": "2026-03-14", "count": 41}, {"date": "2026-03-15", "count": 51}, {"date": "2026-03-16", "count": 68}, {"date": "2026-03-17", "count": 52}, {"date": "2026-03-18", "count": 52}, {"date": "2026-03-19", "count": 38}, {"date": "2026-03-20", "count": 38}, {"date": "2026-03-21", "count": 39}, {"date": "2026-03-22", "count": 63}, {"date": "2026-03-23", "count": 65}, {"date": "2026-03-24", "count": 54}, {"date": "2026-03-25", "count": 29}, {"date": "2026-03-26", "count": 42}, {"date": "2026-03-27", "count": 21}, {"date": "2026-03-28", "count": 27}, {"date": "2026-03-29", "count": 42}, {"date": "2026-03-30", "count": 55}, {"date": "2026-03-31", "count": 65}], "android_cumulative": [{"date": "2026-03-05", "count": 905}, {"date": "2026-03-06", "count": 960}, {"date": "2026-03-07", "count": 990}, {"date": "2026-03-08", "count": 1060}, {"date": "2026-03-09", "count": 1120}, {"date": "2026-03-10", "count": 1150}, {"date": "2026-03-11", "count": 1170}, {"date": "2026-03-12", "count": 1190}, {"date": "2026-03-13", "count": 1210}, {"date": "2026-03-14", "count": 1220}, {"date": "2026-03-15", "count": 1240}, {"date": "2026-03-16", "count": 1270}, {"date": "2026-03-17", "count": 1290}, {"date": "2026-03-18", "count": 1300}, {"date": "2026-03-19", "count": 1320}, {"date": "2026-03-20", "count": 1330}, {"date": "2026-03-21", "count": 1340}, {"date": "2026-03-22", "count": 1370}, {"date": "2026-03-23", "count": 1400}, {"date": "2026-03-24", "count": 1410}, {"date": "2026-03-25", "count": 1430}, {"date": "2026-03-26", "count": 1450}, {"date": "2026-03-27", "count": 1460}, {"date": "2026-03-28", "count": 1470}], "android_daily_new": [{"date": "2026-03-06", "count": 55}, {"date": "2026-03-07", "count": 30}, {"date": "2026-03-08", "count": 70}, {"date": "2026-03-09", "count": 60}, {"date": "2026-03-10", "count": 30}, {"date": "2026-03-11", "count": 20}, {"date": "2026-03-12", "count": 20}, {"date": "2026-03-13", "count": 20}, {"date": "2026-03-14", "count": 10}, {"date": "2026-03-15", "count": 20}, {"date": "2026-03-16", "count": 30}, {"date": "2026-03-17", "count": 20}, {"date": "2026-03-18", "count": 10}, {"date": "2026-03-19", "count": 20}, {"date": "2026-03-20", "count": 10}, {"date": "2026-03-21", "count": 10}, {"date": "2026-03-22", "count": 30}, {"date": "2026-03-23", "count": 30}, {"date": "2026-03-24", "count": 10}, {"date": "2026-03-25", "count": 20}, {"date": "2026-03-26", "count": 20}, {"date": "2026-03-27", "count": 10}, {"date": "2026-03-28", "count": 10}], "page_views": [{"menu": "대시보드", "path": "/home", "views": 125582, "ratio": 28.35}, {"menu": "나만의시간표", "path": "/planner", "views": 80846, "ratio": 18.25}, {"menu": "내정보", "path": "/my-profile", "views": 64797, "ratio": 14.63}, {"menu": "기타", "path": "/", "views": 58933, "ratio": 13.3}, {"menu": "리포트", "path": "/report", "views": 28002, "ratio": 6.32}, {"menu": "공지사항", "path": "/courses", "views": 20144, "ratio": 4.55}, {"menu": "매리트", "path": "/merit", "views": 19627, "ratio": 4.43}, {"menu": "질문예약", "path": "/guest-reservation", "views": 17069, "ratio": 3.85}, {"menu": "출결변경신청", "path": "/attendance", "views": 7757, "ratio": 1.75}], "ga_region": [{"region": "서울", "active": 3025, "ratio_active": 49.46, "users": 2521, "ratio_users": 41.27}, {"region": "성남시", "active": 637, "ratio_active": 10.42, "users": 350, "ratio_users": 5.73}, {"region": "부산", "active": 474, "ratio_active": 7.75, "users": 316, "ratio_users": 5.17}, {"region": "안성시", "active": 370, "ratio_active": 6.05, "users": 332, "ratio_users": 5.44}, {"region": "광주시", "active": 326, "ratio_active": 5.33, "users": 302, "ratio_users": 4.94}, {"region": "인천", "active": 315, "ratio_active": 5.15, "users": 227, "ratio_users": 3.72}, {"region": "이천시", "active": 282, "ratio_active": 4.61, "users": 236, "ratio_users": 3.86}, {"region": "대구", "active": 266, "ratio_active": 4.35, "users": 182, "ratio_users": 2.98}, {"region": "남양주시", "active": 243, "ratio_active": 3.97, "users": 156, "ratio_users": 2.55}, {"region": "수원시", "active": 197, "ratio_active": 3.22, "users": 149, "ratio_users": 2.44}], "branch_downloads": [{"branch": "이천기숙학원", "count": 374}, {"branch": "안성기숙학원", "count": 308}, {"branch": "독학기숙학원", "count": 284}, {"branch": "대치", "count": 190}, {"branch": "분당정자", "count": 177}, {"branch": "강북", "count": 85}, {"branch": "목동", "count": 84}, {"branch": "서울성북", "count": 81}, {"branch": "서울성동", "count": 77}, {"branch": "마포", "count": 75}, {"branch": "인천송도", "count": 71}, {"branch": "부산교대", "count": 71}, {"branch": "서울송파", "count": 69}, {"branch": "평택", "count": 69}, {"branch": "은평서대문", "count": 68}, {"branch": "서울광진", "count": 66}, {"branch": "의정부", "count": 62}, {"branch": "수원정자", "count": 61}, {"branch": "광주수원", "count": 51}, {"branch": "일산동구", "count": 49}, {"branch": "대구달서", "count": 49}, {"branch": "수원시청", "count": 46}, {"branch": "일산서구", "count": 43}, {"branch": "대구수성1관", "count": 43}, {"branch": "동탄", "count": 40}, {"branch": "천안", "count": 38}, {"branch": "인천부평", "count": 38}, {"branch": "부산서면", "count": 35}, {"branch": "목포", "count": 34}, {"branch": "김포", "count": 34}, {"branch": "광주북구", "count": 33}, {"branch": "광명", "count": 31}, {"branch": "수원영통", "count": 31}, {"branch": "노량진", "count": 31}, {"branch": "대구수성2관", "count": 30}, {"branch": "인천인하대", "count": 30}, {"branch": "울산수지", "count": 29}, {"branch": "부산해운대", "count": 29}, {"branch": "진주", "count": 27}, {"branch": "서울강동", "count": 27}, {"branch": "광주동구", "count": 25}, {"branch": "서울도봉", "count": 25}, {"branch": "서울대입구", "count": 24}, {"branch": "춘천", "count": 24}, {"branch": "광주남구", "count": 22}, {"branch": "하남", "count": 19}, {"branch": "울산남구", "count": 19}, {"branch": "서울강서", "count": 19}, {"branch": "서울관악", "count": 19}, {"branch": "서울특별구", "count": 15}, {"branch": "파주", "count": 15}, {"branch": "부천", "count": 13}, {"branch": "원주", "count": 11}, {"branch": "청주", "count": 10}, {"branch": "부산대", "count": 10}, {"branch": "안산", "count": 9}, {"branch": "목동오목교", "count": 7}, {"branch": "이투스247본원", "count": 4}, {"branch": "창원", "count": 3}, {"branch": "제주", "count": 2}, {"branch": "구리남양주", "count": 2}, {"branch": "광주동구2관", "count": 1}, {"branch": "성남서원", "count": 1}, {"branch": "이투스247", "count": 1}, {"branch": "익산", "count": 1}, {"branch": "전주완산", "count": 1}]};

    // 지점별 앱 다운로드 수(오류 수정 반영)
    DATA.branch_downloads = [
      { "branch": "이천기숙학원", "count": 374 },
      { "branch": "안성기숙학원", "count": 308 },
      { "branch": "독학기숙학원", "count": 284 },
      { "branch": "대치", "count": 190 },
      { "branch": "분당정자", "count": 177 },
      { "branch": "다산", "count": 101 },
      { "branch": "강북", "count": 85 },
      { "branch": "목동", "count": 84 },
      { "branch": "서울성북", "count": 81 },
      { "branch": "서울성동", "count": 77 },
      { "branch": "마포", "count": 75 },
      { "branch": "인천송도", "count": 71 },
      { "branch": "부산교대", "count": 71 },
      { "branch": "서울송파", "count": 69 },
      { "branch": "평택", "count": 69 },
      { "branch": "은평서대문", "count": 68 },
      { "branch": "서울광진", "count": 66 },
      { "branch": "의정부", "count": 62 },
      { "branch": "수원정자", "count": 61 },
      { "branch": "광주수완", "count": 51 },
      { "branch": "일산동구", "count": 49 },
      { "branch": "대구달서", "count": 46 },
      { "branch": "수원시청", "count": 46 },
      { "branch": "일산서구", "count": 43 },
      { "branch": "대구수성 1관", "count": 43 },
      { "branch": "동탄", "count": 40 },
      { "branch": "천안", "count": 38 },
      { "branch": "인천부평", "count": 38 },
      { "branch": "대전둔산", "count": 36 },
      { "branch": "부산서면", "count": 35 },
      { "branch": "목포", "count": 34 },
      { "branch": "김포", "count": 34 },
      { "branch": "인천청라", "count": 33 },
      { "branch": "광주북구", "count": 31 },
      { "branch": "광명", "count": 31 },
      { "branch": "수원영통", "count": 31 },
      { "branch": "노량진", "count": 30 },
      { "branch": "대구수성 2관", "count": 30 },
      { "branch": "인천인하대", "count": 30 },
      { "branch": "용인수지", "count": 29 },
      { "branch": "부산해운대", "count": 29 },
      { "branch": "진주", "count": 27 },
      { "branch": "서울강동", "count": 27 },
      { "branch": "광주동구", "count": 25 },
      { "branch": "서울도봉", "count": 25 },
      { "branch": "서울대점", "count": 24 },
      { "branch": "춘천", "count": 24 },
      { "branch": "광주남구", "count": 22 },
      { "branch": "하남", "count": 19 },
      { "branch": "울산남구", "count": 19 },
      { "branch": "서울강서", "count": 19 },
      { "branch": "부산북구", "count": 17 },
      { "branch": "파주", "count": 15 },
      { "branch": "부천", "count": 13 },
      { "branch": "원주", "count": 11 },
      { "branch": "청주", "count": 10 },
      { "branch": "부산대", "count": 10 },
      { "branch": "안산", "count": 7 },
      { "branch": "목동오목교", "count": 7 },
      { "branch": "창원", "count": 3 },
      { "branch": "제주", "count": 3 },
      { "branch": "구리남양주", "count": 2 },
      { "branch": "광주동구(남)", "count": 1 },
      { "branch": "서울노원", "count": 1 },
      { "branch": "익산", "count": 1 },
      { "branch": "전주완산", "count": 1 }
    ];
    // ═══════════════════ HELPERS ═══════════════════
    const COLORS = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9b59b6', '#e67e22', '#1abc9c', '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad', '#16a085', '#d35400', '#c0392b', '#2980b9', '#27ae60'];
    const COLORS_ALPHA = (c, a) => c + Math.round(a * 255).toString(16).padStart(2, '0');
    const fmtDate = d => d.replace('2026-', '').replace('-', '/');
    const defaults = {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif", size: 11 }, padding: 10 } },
        tooltip: {
          titleFont: { family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif", size: 12 },
          bodyFont: { family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif", size: 11 }
        }
      },
      scales: {}
    };
    const scaleDefaults = {
      grid: { color: 'rgba(0,0,0,.05)' },
      ticks: { font: { family: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif", size: 11 } }
    };

    function lineDefaults(color, fill = true) {
      return {
        borderColor: color, backgroundColor: fill ? color + '22' : 'transparent', borderWidth: 2,
        pointRadius: 3, pointHoverRadius: 5, tension: 0.35, fill
      };
    }

    // ═══════════════════ CHARTS ═══════════════════

    // 1. Daily Study (switchable)
    const dailyLabels = DATA.daily_study.map(d => fmtDate(d.date));
    let dailyStudyChart = new Chart(document.getElementById('dailyStudyChart'), {
      type: 'line',
      data: {
        labels: dailyLabels,
        datasets: [{
          label: '순공시간(h)',
          data: DATA.daily_study.map(d => d.hours),
          ...lineDefaults('#1a73e8'),
        }]
      },
      options: {
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_LINE('h') },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45, minRotation: 30 } }, y: { ...scaleDefaults } }
      }
    });

    function switchStudyTab(mode, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (mode === 'hours') {
        dailyStudyChart.data.datasets[0].label = '순공시간(h)';
        dailyStudyChart.data.datasets[0].data = DATA.daily_study.map(d => d.hours);
        dailyStudyChart.data.datasets[0].borderColor = '#1a73e8';
        dailyStudyChart.data.datasets[0].backgroundColor = '#1a73e822';
        dailyStudyChart.options.plugins.datalabels.formatter = (v) => v.toLocaleString() + 'h';
      } else {
        dailyStudyChart.data.datasets[0].label = '참여 학생수(명)';
        dailyStudyChart.data.datasets[0].data = DATA.daily_study.map(d => d.students);
        dailyStudyChart.data.datasets[0].borderColor = '#34a853';
        dailyStudyChart.data.datasets[0].backgroundColor = '#34a85322';
        dailyStudyChart.options.plugins.datalabels.formatter = (v) => v.toLocaleString() + '명';
      }
      dailyStudyChart.update();
    }

    // 2. Subject Study (Doughnut) ★datalabels
    new Chart(document.getElementById('subjectStudyChart'), {
      type: 'doughnut',
      data: {
        labels: DATA.subject_study.map(d => d.subject),
        datasets: [{ data: DATA.subject_study.map(d => d.hours), backgroundColor: COLORS, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        ...defaults, cutout: '55%',
        plugins: {
          ...defaults.plugins, legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}h` } },
          datalabels: DL_DONUT('h')
        }
      }
    });

    // 3. Type Study (Polar)
    new Chart(document.getElementById('typeStudyChart'), {
      type: 'polarArea',
      data: {
        labels: DATA.type_study.map(d => d.type),
        datasets: [{ data: DATA.type_study.map(d => d.hours), backgroundColor: ['#1a73e888', '#34a85388', '#fbbc0488', '#ea433588'], borderColor: COLORS, borderWidth: 2 }]
      },
      options: {
        ...defaults,
        plugins: {
          ...defaults.plugins, legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.r.toLocaleString()}h` } }
        },
        scales: { r: { grid: { color: 'rgba(0,0,0,.07)' }, ticks: { font: { size: 10 } } } }
      }
    });

    // 4. Branch (Horizontal Bar) ★datalabels
    new Chart(document.getElementById('branchChart'), {
      type: 'bar',
      data: {
        labels: DATA.branch_study.map(d => d.branch),
        datasets: [{
          label: '순공시간(h)', data: DATA.branch_study.map(d => d.hours),
          backgroundColor: DATA.branch_study.map((_, i) => COLORS[i % COLORS.length] + 'cc'),
          borderColor: DATA.branch_study.map((_, i) => COLORS[i % COLORS.length]),
          borderWidth: 1, borderRadius: 4
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 65 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_BAR(v => v.toLocaleString() + 'h') },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 11 } } } }
      }
    });

    // 5. OS Pie
    new Chart(document.getElementById('osChart'), {
      type: 'pie',
      data: {
        labels: DATA.os_device.map(d => d.os),
        datasets: [{ data: DATA.os_device.map(d => d.count), backgroundColor: ['#1a73e8cc', '#34a853cc'], borderWidth: 3, borderColor: '#fff' }]
      },
      options: {
        ...defaults, plugins: {
          ...defaults.plugins, legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}대 (${(c.parsed / DATA.kpi.total_devices * 100).toFixed(1)}%)` } },
          datalabels: DL_DONUT('대')
        }
      }
    });

    // 6. Device Model (Bar)
    new Chart(document.getElementById('modelChart'), {
      type: 'bar',
      data: {
        labels: DATA.device_model.map(d => d.model),
        datasets: [{
          label: '등록수', data: DATA.device_model.map(d => d.count),
          backgroundColor: COLORS.map(c => c + 'cc'), borderColor: COLORS, borderWidth: 1, borderRadius: 4
        }]
      },
      options: {
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_LINE('대') },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults } }
      }
    });

    // 7. Device Reg Daily
    new Chart(document.getElementById('devRegDailyChart'), {
      type: 'line',
      data: {
        labels: DATA.device_reg_daily.map(d => fmtDate(d.date)),
        datasets: [{
          label: '기기 등록 수', data: DATA.device_reg_daily.map(d => d.count),
          ...lineDefaults('#9b59b6'), fill: true
        }]
      },
      options: {
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_LINE('대') },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 8. User Type Doughnut
    new Chart(document.getElementById('userTypeChart'), {
      type: 'doughnut',
      data: {
        labels: ['학생(STUDENT)', '학부모(GUARDIAN)'],
        datasets: [{ data: [3271, 570], backgroundColor: ['#1a73e8cc', '#34a853cc'], borderWidth: 3, borderColor: '#fff' }]
      },
      options: {
        ...defaults, cutout: '60%',
        plugins: {
          ...defaults.plugins, legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}명 (${(c.parsed / DATA.kpi.total_login_users * 100).toFixed(1)}%)` } },
          datalabels: DL_DONUT('명')
        }
      }
    });

    // 9. Login Daily
    new Chart(document.getElementById('loginDailyChart'), {
      type: 'bar',
      data: {
        labels: DATA.login_daily.map(d => fmtDate(d.date)),
        datasets: [
          { label: '학생', data: DATA.login_daily.map(d => d.student), backgroundColor: '#1a73e8bb', borderRadius: 2 },
          { label: '학부모', data: DATA.login_daily.map(d => d.guardian), backgroundColor: '#34a853bb', borderRadius: 2 }
        ]
      },
      options: { 
        ...defaults, 
        plugins: { ...defaults.plugins, datalabels: DL_STACK },
        scales: { x: { ...scaleDefaults, stacked: true, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults, stacked: true } } 
      }
    });

    // 10. Lecture Search (Horizontal Bar) ★datalabels
    new Chart(document.getElementById('lectureChart'), {
      type: 'bar',
      data: {
        labels: DATA.lecture_search.map(d => d.name),
        datasets: [{
          label: '검색수', data: DATA.lecture_search.map(d => d.clicks),
          backgroundColor: DATA.lecture_search.map(d => {
            const c = { '국어': '#1a73e8', '수학': '#ea4335', '영어': '#34a853', '생활과윤리': '#9b59b6', '사회문화': '#e67e22' };
            return (c[d.subject] || '#aaa') + 'cc';
          }),
          borderRadius: 3, borderWidth: 0
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 50 } },
        plugins: {
          ...defaults.plugins, legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.parsed.x.toLocaleString()}회` } },
          datalabels: DL_BAR(v => v.toLocaleString() + '회')
        },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 10.5 } } } }
      }
    });

    // 11. Subject Search (Bar) ★datalabels
    new Chart(document.getElementById('subjectSearchChart'), {
      type: 'bar',
      data: {
        labels: DATA.subject_search.slice(0, 15).map(d => d.subject),
        datasets: [{
          label: '검색수', data: DATA.subject_search.slice(0, 15).map(d => d.clicks),
          backgroundColor: COLORS.map(c => c + 'cc'), borderRadius: 3, borderWidth: 0
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 60 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_BAR(v => v.toLocaleString() + '회') },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 11 } } } }
      }
    });

    // 12. Pass Selection (Stacked Bar) ★datalabels
    new Chart(document.getElementById('passChart'), {
      type: 'bar',
      data: {
        labels: DATA.pass_selection.map(d => d.pass),
        datasets: [
          { label: '활성', data: DATA.pass_selection.map(d => d.active), backgroundColor: '#1a73e8bb', borderRadius: 0 },
          { label: '비활성', data: DATA.pass_selection.map(d => d.inactive), backgroundColor: '#ea4335bb', borderRadius: 0 }
        ]
      },
      options: {
        ...defaults,
        plugins: { ...defaults.plugins, datalabels: DL_STACK },
        scales: { x: { ...scaleDefaults, stacked: true }, y: { ...scaleDefaults, stacked: true } }
      }
    });

    // 13. Pass Daily
    new Chart(document.getElementById('passDailyChart'), {
      type: 'line',
      data: {
        labels: DATA.pass_daily.map(d => fmtDate(d.date)),
        datasets: [{ label: '패스 등록', data: DATA.pass_daily.map(d => d.count), ...lineDefaults('#1abc9c') }]
      },
      options: {
        ...defaults, plugins: { ...defaults.plugins, legend: { display: false } },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 14. Gyogwa Selection (Doughnut) ★datalabels
    new Chart(document.getElementById('gyogwaChart'), {
      type: 'doughnut',
      data: {
        labels: DATA.gyogwa_selection.map(d => d.gyogwa),
        datasets: [{ data: DATA.gyogwa_selection.map(d => d.count), backgroundColor: COLORS, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        ...defaults, cutout: '50%',
        plugins: {
          ...defaults.plugins, legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 6 } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}건` } },
          datalabels: DL_DONUT('건')
        }
      }
    });

    // 15. Subject Selection (Horizontal Bar) ★datalabels
    new Chart(document.getElementById('subjectSelChart'), {
      type: 'bar',
      data: {
        labels: DATA.subject_selection.map(d => d.subject),
        datasets: [{
          label: '선택수', data: DATA.subject_selection.map(d => d.count),
          backgroundColor: COLORS.map(c => c + 'bb'), borderRadius: 3, borderWidth: 0
        }]
      },
      options: {
        ...defaults,
        layout: { padding: { right: 50 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_BAR(v => v.toLocaleString() + '건') },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults } }
      }
    });

    // 16. Subject Sel Daily
    new Chart(document.getElementById('subjectSelDailyChart'), {
      type: 'line',
      data: {
        labels: DATA.subject_sel_daily.map(d => fmtDate(d.date)),
        datasets: [{ label: '과목 선택 수', data: DATA.subject_sel_daily.map(d => d.count), ...lineDefaults('#e67e22') }]
      },
      options: {
        ...defaults, plugins: { ...defaults.plugins, legend: { display: false } },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 17. Attend Type Pie
    new Chart(document.getElementById('attendTypeChart'), {
      type: 'pie',
      data: {
        labels: DATA.attend_type.map(d => d.type),
        datasets: [{ data: DATA.attend_type.map(d => d.count), backgroundColor: ['#fbbc04cc', '#ea4335cc'], borderWidth: 3, borderColor: '#fff' }]
      },
      options: {
        ...defaults, plugins: {
          ...defaults.plugins, legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}건 (${(c.parsed / DATA.kpi.total_attend_changes * 100).toFixed(1)}%)` } },
          datalabels: DL_DONUT('건')
        }
      }
    });

    // 18. Attend Daily
    new Chart(document.getElementById('attendDailyChart'), {
      type: 'bar',
      data: {
        labels: DATA.attend_daily.map(d => fmtDate(d.date)),
        datasets: [{ label: '신청 건수', data: DATA.attend_daily.map(d => d.count), backgroundColor: '#fbbc04bb', borderRadius: 3 }]
      },
      options: {
        ...defaults, plugins: { ...defaults.plugins, legend: { display: false } },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 19. Target Univ (Horizontal Bar) ★datalabels
    new Chart(document.getElementById('univChart'), {
      type: 'bar',
      data: {
        labels: DATA.target_univ.map(d => d.univ),
        datasets: [{
          label: '선택수', data: DATA.target_univ.map(d => d.count),
          backgroundColor: DATA.target_univ.map((_, i) => ['#1a73e8', '#ea4335', '#34a853', '#fbbc04', '#9b59b6', '#e67e22', '#1abc9c', '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad', '#16a085', '#d35400', '#c0392b'][i] + 'cc'),
          borderRadius: 4, borderWidth: 0
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 45 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_BAR(v => v.toLocaleString() + '건') },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 11.5 } } } }
      }
    });

    // 20. Univ Daily
    new Chart(document.getElementById('univDailyChart'), {
      type: 'line',
      data: {
        labels: DATA.univ_daily.map(d => fmtDate(d.date)),
        datasets: [{ label: '설정 건수', data: DATA.univ_daily.map(d => d.count), ...lineDefaults('#6366f1') }]
      },
      options: {
        ...defaults, plugins: { ...defaults.plugins, legend: { display: false } },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 21. Download Compare Chart
    const dlAllDates = ["2026-03-03", "2026-03-04", "2026-03-05", "2026-03-06", "2026-03-07", "2026-03-08", "2026-03-09", "2026-03-10", "2026-03-11", "2026-03-12", "2026-03-13", "2026-03-14", "2026-03-15", "2026-03-16", "2026-03-17", "2026-03-18", "2026-03-19", "2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27", "2026-03-28", "2026-03-29", "2026-03-30", "2026-03-31"];
    const iosMap = Object.fromEntries(DATA.ios_daily_dl.map(d => [d.date, d.count]));
    const andNewMap = Object.fromEntries(DATA.android_daily_new.map(d => [d.date, d.count]));
    const dlLabels = dlAllDates.map(d => fmtDate(d));
    const iosDlData = dlAllDates.map(d => iosMap[d] ?? null);
    const andNewData = dlAllDates.map(d => andNewMap[d] ?? null);
    let dlCompareChart = new Chart(document.getElementById('dlCompareChart'), {
      type: 'bar',
      data: {
        labels: dlLabels,
        datasets: [
          { label: 'iOS 다운로드', data: iosDlData, backgroundColor: '#1a73e8bb', borderRadius: 2 },
          { label: 'Android 신규', data: andNewData, backgroundColor: '#34a853bb', borderRadius: 2 }
        ]
      },
      options: { 
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, datalabels: DL_LINE('건') },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } } 
      }
    });
    function switchDlTab(mode, btn) {
      document.querySelectorAll('#dlTabBtns .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dlCompareChart.data.datasets[0].hidden = (mode === 'android');
      dlCompareChart.data.datasets[1].hidden = (mode === 'ios');
      dlCompareChart.update();
    }

    // 22. Android Cumulative
    new Chart(document.getElementById('androidCumulChart'), {
      type: 'line',
      data: {
        labels: DATA.android_cumulative.map(d => fmtDate(d.date)),
        datasets: [{ label: 'Android 누적 설치', data: DATA.android_cumulative.map(d => d.count), ...lineDefaults('#34a853'), fill: true }]
      },
      options: {
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_LINE('대') },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults, min: 800 } }
      }
    });

    // 23. Android Daily New
    new Chart(document.getElementById('androidNewChart'), {
      type: 'bar',
      data: {
        labels: DATA.android_daily_new.map(d => fmtDate(d.date)),
        datasets: [{ label: '신규 설치', data: DATA.android_daily_new.map(d => d.count), backgroundColor: '#e67e22bb', borderRadius: 3, borderWidth: 0 }]
      },
      options: {
        ...defaults, 
        layout: { padding: { top: 20 } },
        plugins: { ...defaults.plugins, legend: { display: false }, datalabels: DL_LINE('대') },
        scales: { x: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, maxRotation: 45 } }, y: { ...scaleDefaults } }
      }
    });

    // 24. Page View Bar ★datalabels
    new Chart(document.getElementById('pageViewChart'), {
      type: 'bar',
      data: {
        labels: DATA.page_views.map(d => d.menu),
        datasets: [{ label: '조회수', data: DATA.page_views.map(d => d.views), backgroundColor: COLORS.map(c => c + 'cc'), borderRadius: 4, borderWidth: 0 }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 80 } },
        plugins: {
          ...defaults.plugins, legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.parsed.x.toLocaleString()}회 (${DATA.page_views[c.dataIndex].ratio}%)` } },
          datalabels: DL_BAR(v => v.toLocaleString() + '회')
        },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 11 } } } }
      }
    });

    // 25. Page View Doughnut
    new Chart(document.getElementById('pageViewPieChart'), {
      type: 'doughnut',
      data: {
        labels: DATA.page_views.map(d => d.menu),
        datasets: [{ data: DATA.page_views.map(d => d.views), backgroundColor: COLORS, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        ...defaults, cutout: '50%',
        plugins: {
          ...defaults.plugins,
          legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 5 } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}회 (${DATA.page_views[c.dataIndex].ratio}%)` } }
        }
      }
    });

    // 26. GA Region Bar
    const GA = DATA.ga_region;
    let gaMode = 'active';
    let gaBarChart = new Chart(document.getElementById('gaRegionBarChart'), {
      type: 'bar',
      data: {
        labels: GA.map(d => d.region),
        datasets: [{
          label: '활성 사용자', data: GA.map(d => d.active),
          backgroundColor: COLORS.map(c => c + 'cc'), borderRadius: 4, borderWidth: 0, barThickness: 15
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 55 } },
        plugins: {
          ...defaults.plugins, legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.parsed.x.toLocaleString()}명 (${GA[c.dataIndex].ratio_active}%)` } },
          datalabels: DL_BAR(v => v.toLocaleString() + '명')
        },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 11 } } } }
      }
    });
    function switchGaTab(mode, btn) {
      document.querySelectorAll('#gaTabBtns .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gaMode = mode;
      if (mode === 'active') {
        gaBarChart.data.datasets[0].label = '활성 사용자';
        gaBarChart.data.datasets[0].data = GA.map(d => d.active);
        gaBarChart.options.plugins.tooltip.callbacks.label = (c) => ` ${c.parsed.x.toLocaleString()}명 (${GA[c.dataIndex].ratio_active}%)`;
      } else {
        gaBarChart.data.datasets[0].label = '총 사용자';
        gaBarChart.data.datasets[0].data = GA.map(d => d.users);
        gaBarChart.options.plugins.tooltip.callbacks.label = (c) => ` ${c.parsed.x.toLocaleString()}명 (${GA[c.dataIndex].ratio_users}%)`;
      }
      gaBarChart.update();
    }

    // 27. GA Region Doughnut
    new Chart(document.getElementById('gaRegionPieChart'), {
      type: 'doughnut',
      data: {
        labels: GA.map(d => d.region),
        datasets: [{ data: GA.map(d => d.active), backgroundColor: COLORS, borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        ...defaults, cutout: '50%',
        plugins: {
          ...defaults.plugins,
          legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 5 } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed.toLocaleString()}명 (${GA[c.dataIndex].ratio_active}%)` } }
        }
      }
    });

    // 28. Branch Download Chart ★datalabels
    new Chart(document.getElementById('branchDlChart'), {
      type: 'bar',
      data: {
        labels: DATA.branch_downloads.map(d => d.branch),
        datasets: [{
          label: '다운로드수', data: DATA.branch_downloads.map(d => d.count),
          backgroundColor: DATA.branch_downloads.map((_, i) => COLORS[i % COLORS.length] + 'cc'),
          borderColor: DATA.branch_downloads.map((_, i) => COLORS[i % COLORS.length]),
          borderWidth: 1, borderRadius: 3, barThickness: 15
        }]
      },
      options: {
        ...defaults, indexAxis: 'y',
        layout: { padding: { right: 45 } },
        plugins: {
          ...defaults.plugins, legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.parsed.x.toLocaleString()}건` } },
          datalabels: DL_BAR(v => v.toLocaleString() + '건')
        },
        scales: { x: { ...scaleDefaults }, y: { ...scaleDefaults, ticks: { ...scaleDefaults.ticks, font: { size: 10.5 } } } }
      }
    });

    // ═══════ Navigation ═══════
    function setActive(el) {
      setTimeout(() => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        el.classList.add('active');
      }, 50);
    }

    // Scrollspy
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navItems.forEach(n => {
        n.classList.remove('active');
        if (n.getAttribute('href') === '#' + current) n.classList.add('active');
      });
    }, { passive: true });
  </script>
