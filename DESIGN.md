# 성경 문제집 디자인 시스템

성경 학습 교재 프로젝트의 디자인 규칙과 컴포넌트 사용법을 정리한 문서.
규칙이 바뀌면 이 파일과 `shared/styles.css`를 함께 수정한다.

---

## 폴더 구조

```
문제집성경/
├── DESIGN.md               ← 이 파일
├── SCDream5.otf
├── SCDream6.otf
├── omyu pretty.ttf
├── shared/
│   └── styles.css          ← 모든 레슨이 공유하는 CSS
├── 사도행전/
│   ├── index.html          (추후: 사도행전 목차)
│   ├── lesson-01.html
│   ├── lesson-02.html
│   └── ...
├── (추후 다른 책)/
│   └── ...
└── index.html              (추후: 전체 교재 목차)
```

각 레슨 HTML은 CSS를 `../shared/styles.css`로 참조한다.
CSS는 폰트를 `../SCDream5.otf` 형태로 참조한다.

---

## 색상

| 변수 | 값 | 용도 |
|------|----|------|
| `--ink` | `#1e1e1e` | 본문 기본 텍스트 |
| `--ink-soft` | `#4a4a4a` | 보조 설명, Scene 본문 |
| `--ink-faint` | `#888888` | 캡션, 푸터, 약한 정보 |
| `--accent` | `#b4552d` | 테라코타 — 강조 전체 (번호, 선, 배지) |
| `--accent-mid` | `#c47050` | 약간 밝은 강조 (connector 등) |
| `--accent-soft` | `#f2e4dc` | 테라코타 옅은 배경 (태그, 선택된 박스) |
| `--accent-pale` | `#faf4f0` | 아주 옅은 배경 (scripture-block, 요약 강조) |
| `--rule` | `#d8d4ce` | 얇은 구분선 |
| `--rule-mid` | `#b0aa9f` | 중간 구분선 (flow arrow 등) |
| `--page-bg` | `#ece9e4` | 화면 배경 (인쇄 시 흰색) |
| `--white` | `#ffffff` | 페이지 배경 |

강조색은 `--accent` 하나만 사용한다. 색을 추가해 강조를 늘리지 않는다.

---

## 폰트

| 변수 | 파일 | 용도 |
|------|------|------|
| `--ff-body` | SCDream5.otf (400), SCDream6.otf (700) | 모든 텍스트 기본 |
| `--ff-hand` | omyu pretty.ttf (400) | 성경 구절 인용, 한 문장 요약 등 강조 |

```css
/* 본문 */
font-family: var(--ff-body);
font-weight: 400;

/* 제목/강조 */
font-family: var(--ff-body);
font-weight: 700;

/* 인용/필기 */
font-family: var(--ff-hand);
```

---

## 타입 스케일

| 변수 | 크기 | 주요 사용처 |
|------|------|------------|
| `--fs-display` | 26pt | LESSON 번호 (38pt로 오버라이드 가능) |
| `--fs-title` | 17pt | Lesson 제목 |
| `--fs-h2` | 12.5pt | Scene 제목, 섹션 제목 |
| `--fs-h3` | 10.5pt | 소제목 |
| `--fs-body` | 10.5pt | 본문 단락 |
| `--fs-small` | 9pt | 보조 설명, 테이블 본문 |
| `--fs-caption` | 8pt | 라벨, 배지, 구절 참조 |

줄간격: `--lh-body` (1.8), `--lh-tight` (1.4), `--lh-heading` (1.2)

---

## 페이지 (A4)

```css
/* 인쇄 설정 */
@page {
  size: A4 portrait;
  margin: 15mm 18mm 15mm;
}

/* 화면 미리보기 */
.page {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm 18mm 16mm;
  margin: 0 auto 10mm;
}
```

- 내용이 한 페이지를 넘치면 **글씨를 줄이지 않고** `.page`를 추가한다.
- 각 `.page`에는 `break-after: page`가 적용되어 있다.
- PDF 저장: Chrome → Ctrl+P → PDF 저장 → A4, 여백: 기본, **배경 그래픽: 켜기**

---

## 공통 구조 (모든 레슨)

### 2페이지~: `.page-header`

```html
<div class="page-header">
  <span class="page-header-lesson">LESSON 01</span>
  <span class="page-header-title">레슨 제목</span>
</div>
```

### 푸터: `.page-footer`

```html
<div class="page-footer">
  <span>사도행전 (Acts of the Apostles)</span>
  <span>LESSON 01 · 3</span>
</div>
```

---

## 컴포넌트

### 책 식별 띠 `.book-band`

모든 레슨 1페이지 상단. 책 이름과 신약/구약 표시.

```html
<div class="book-band">
  <span class="book-name-ko">사도행전</span>
  <span class="book-name-en">ACTS OF THE APOSTLES</span>
  <span class="book-part">신약 · New Testament</span>
</div>
```

---

### 섹션 제목 `.section-heading`

좌측에 테라코타 수직 선이 붙는다.

```html
<h2 class="section-heading">사건 흐름</h2>
```

---

### 사건 흐름도 `.story-flow`

```html
<div class="story-flow">
  <div class="flow-step">
    <div class="flow-step-content">
      <div class="flow-step-title">사건 제목</div>
      <div class="flow-step-desc">설명</div>
    </div>
    <div class="flow-step-ref">1:1–2</div>
  </div>
  <div class="flow-arrow"></div>

  <!-- 핵심 단계는 .key-step 추가 -->
  <div class="flow-step key-step">
    ...
  </div>
</div>
```

---

### Scene 블록 `.scene`

```html
<div class="scene">
  <div class="scene-head">
    <span class="scene-num">SCENE 1</span>
    <span class="scene-title">제목</span>
    <span class="scene-ref">행 1:1–8</span>
  </div>
  <div class="scene-body">
    <p>본문</p>
  </div>
</div>
```

---

### 성경 구절 인용 `.scripture-block`

Omyu 폰트, 테라코타 좌측 선.

```html
<div class="scripture-block">
  <div class="scripture-text">구절 내용</div>
  <div class="scripture-ref">사도행전 1:8</div>
</div>
```

---

### 핵심 구절 강조 `.key-verse-box`

테라코타 배경 박스. 레슨당 1회 정도만 사용.

```html
<div class="key-verse-box">
  <div class="key-verse-label">레이블</div>
  <div class="key-verse-text">구절</div>
  <div class="key-verse-ref">사도행전 1:8</div>
</div>
```

---

### 배경 설명 박스 `.background-box`

회색 배경. 본문 이해에 필요한 배경지식.

```html
<div class="background-box">
  <div class="background-box-title">저자와 수신자</div>
  <div class="background-box-body">설명</div>
</div>
```

---

### Background 페이지 테이블 `.bg-table`

5페이지(Background 전용 페이지)에서 사용.

```html
<table class="bg-table">
  <thead>
    <tr><th>개념</th><th>설명</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>데오빌로</td>
      <td>설명 텍스트</td>
    </tr>
  </tbody>
</table>
```

---

### Progress Map `.progress-map`

사도행전 1:8 5단계 진행 표시. 오프닝 페이지와 비주얼 페이지에 사용.

```html
<div class="progress-map">
  <div class="progress-node active">  <!-- active: 현재 위치 -->
    <div class="node-dot">●</div>
    <div class="node-label">예루살렘</div>
  </div>
  <div class="progress-connector"></div>
  <div class="progress-node">
    <div class="node-dot"></div>
    <div class="node-label">유대</div>
  </div>
  <!-- 반복 -->
</div>
```

상태: `.active` (현재), `.done` (지나온 곳), 없음 (아직 안 된 곳)

---

### 인물 목록 `.character-list`

```html
<div class="character-list">
  <div class="character-row">
    <span class="character-name">베드로</span>
    <span class="character-desc">열두 사도 중 대표로 발언</span>
  </div>
</div>
```

---

### 조건 목록 `.condition-list`

번호 원형 배지 + 설명. 사도의 조건, 자격 요건 등에 사용.

```html
<ul class="condition-list">
  <li>
    <span class="condition-num">①</span>
    <span>조건 설명</span>
  </li>
</ul>
```

---

### 비교 `.versus-row`

두 항목을 나란히 비교. 선택된 쪽에 `.chosen` 추가.

```html
<div class="versus-row">
  <div class="versus-side">
    <div class="side-name">요셉 바사바</div>
    설명
  </div>
  <div class="versus-mid">vs</div>
  <div class="versus-side chosen">
    <div class="side-name">맛디아 ✓</div>
    설명
  </div>
</div>
```

---

### Lesson Summary 블록 `.summary-block`

요약 페이지에서 각 항목에 사용.

```html
<div class="summary-block">
  <div class="summary-block-label">핵심 키워드</div>
  <div class="tag-cloud">
    <span class="tag">태그</span>
  </div>
</div>

<!-- 전체 너비: .full 추가 -->
<div class="summary-block full">
  ...
</div>
```

---

## 편집 원칙

### 성경 내용 기술

- 성경에 기록된 사실과 역사적 배경 설명을 명확히 구분한다.
- 성경에 없는 내용을 상상하여 채우지 않는다.
- 학자들 사이에 견해가 나뉘는 내용은 단정하지 않는다.
  - "본문에는 구체적으로 기록되어 있지 않다."
  - "여러 견해가 있다."
  - "일반적으로 ~로 이해된다."
- 특정 교단의 신학적 해석을 본문의 객관적 내용처럼 제시하지 않는다.

### 레이아웃 방향

- 줄글만 쓰지 않는다. 흐름도, 표, 타임라인을 내용에 맞게 선택한다.
- 카드 UI처럼 보이지 않도록 한다. 목표는 **잘 편집된 성경 교과서**.
- 정보가 적어도 억지로 페이지를 채우지 않는다. 넘치면 페이지를 추가한다.

### 시각화 선택 기준

내용의 성격에 따라 아래 중 적합한 형태를 선택한다.

| 내용 | 형태 |
|------|------|
| 사건의 순서 | Story Flow (수직 흐름) |
| 여러 장소 이동 | 지도 (SVG) |
| 두 항목 비교 | versus-row |
| 인물 관계 | 관계도 (SVG) |
| 시간 축 위의 사건 | Timeline |
| 원인 → 결과 | Flow 또는 연결 화살표 |
| 개념 설명 | background-box 또는 bg-table |

---

## 레슨 구성 (7페이지 기준)

| 페이지 | 섹션 | 내용 |
|--------|------|------|
| 1 | Lesson Opening | 레슨 번호, 제목, 구절, 한 줄 요약, 인물·장소, Progress Map, Scene 목록 |
| 2 | Story Flow | 전체 사건 흐름도 |
| 3–4 | Scenes | 각 Scene 상세 (3–4개) |
| 5 | Background | 역사·문화·개념 배경 |
| 6 | Visual Explainer | 핵심 시각화 1개 (지도, 타임라인, 관계도 등) |
| 7 | Lesson Summary | 사건·인물·장소·키워드·숫자·이야기 연결·한 문장 |

페이지 수는 6–10으로 내용에 따라 조정. Scene이 많거나 배경 설명이 길면 페이지를 추가한다.

---

## 추후 추가 예정

- `사도행전/index.html` — 사도행전 17개 레슨 목차
- `index.html` — 전체 교재 목차 (사도행전 외 다른 책 추가 시)
- 각 레슨 뒤 문제 영역 (CHECK → PRACTICE → LESSON TEST)
