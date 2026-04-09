import pandas as pd
import json

file_path = '/Users/etoos-gyjung/Library/CloudStorage/GoogleDrive-gooyong.jung@gmail.com/내 드라이브/_AICursor_Project/My247 Data/backdata/순공시간.csv'

# Since we found it might be EUC-KR or cp949 from chardet, let's try reading it.
import chardet
with open(file_path, 'rb') as f:
    result = chardet.detect(f.read(100000))
encoding = result['encoding']

df = pd.read_csv(file_path, encoding=encoding)

# Convert '순공시간(HH:mm:ss)' to total hours as float
def time_to_hours(t_str):
    try:
        h, m, s = t_str.split(':')
        return int(h) + int(m)/60.0 + int(s)/3600.0
    except:
        return 0

df['hours'] = df['순공시간(HH:mm:ss)'].apply(time_to_hours)

# 1. KPI 지표
total_hours = round(df['hours'].sum(), 1)
total_students = df['학생번호'].nunique()
avg_hours = round(total_hours / total_students, 1)

# 2. Daily Study
daily_group = df.groupby('일자').agg(
    hours=('hours', 'sum'),
    students=('학생번호', 'nunique')
).reset_index()
daily_group['hours'] = daily_group['hours'].round(1)
daily_study = daily_group.to_dict(orient='records')
# rename '일자' to 'date'
daily_study = [{'date': d['일자'], 'hours': d['hours'], 'students': d['students']} for d in daily_study]

# 3. Subject Study
subject_group = df.groupby('교과명').agg(hours=('hours', 'sum')).reset_index()
subject_group['hours'] = subject_group['hours'].round(1)
subject_group = subject_group.sort_values(by='hours', ascending=False)
subject_study = [{'subject': d['교과명'], 'hours': d['hours']} for d in subject_group.to_dict(orient='records')]

# 4. Type Study (유형명)
type_group = df.groupby('유형명').agg(hours=('hours', 'sum')).reset_index()
type_group['hours'] = type_group['hours'].round(1)
type_group = type_group.sort_values(by='hours', ascending=False)
type_study = [{'type': d['유형명'], 'hours': d['hours']} for d in type_group.to_dict(orient='records')]

# 5. Branch Study (지점명) - Top 20
branch_group = df.groupby('지점명').agg(hours=('hours', 'sum')).reset_index()
branch_group['hours'] = branch_group['hours'].round(1)
branch_group = branch_group.sort_values(by='hours', ascending=False).head(20)
branch_study = [{'branch': d['지점명'], 'hours': d['hours']} for d in branch_group.to_dict(orient='records')]

# Print the JSON output
out = {
    'kpi': {
        'total_hours': total_hours,
        'total_students': total_students,
        'avg_hours_per_student': avg_hours
    },
    'daily_study': daily_study,
    'subject_study': subject_study,
    'type_study': type_study,
    'branch_study': branch_study
}

print(json.dumps(out, ensure_ascii=False, indent=2))
