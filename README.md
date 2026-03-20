# 🎮 Network-Inspired Ladder Game

지하차도 3D 네트워크 분석의 논리를 시뮬레이션으로 풀어낸 프리미엄 사다리 게임입니다.

![사다리 게임 프리뷰](file:///C:/Users/thlee/.gemini/antigravity/brain/3e79d0b3-1532-42e0-8e4a-8582394c6bb1/ladder_game_final_layout_1773990356179.png)

## ✨ 주요 기능 (Key Features)

- **Premium UI/UX**: 다크 모드 기반의 글래스모피즘(Glassmorphism)과 네온 그래디언트를 적용한 세련된 디자인.
- **Mystery Box**: 사다리 결과를 확인하기 전까지 중앙을 가려 긴장감을 높이는 미스터리 박스 기능.
- **Multi-Path Visualization**: '결과 확인' 클릭 시 모든 플레이어의 경로를 고유한 색상으로 동시에 표시.
- **Interactive Tracing**: 개별 플레이어 클릭 시 해당 플레이어의 경로만 즉시 확인 가능.
- **Screen-Fit Layout**: 스크롤 없이 한 화면에 모든 정보를 담아내는 컴팩트한 레이아웃 최적화.

## 🛠 기술적 배경 (Technical Inspiration)

이 프로젝트는 **지하차도 비상 탈출 경로 안내를 위한 3D 네트워크 분석** 개념에서 영감을 얻었습니다.

- **수직/수평 이동 로직**: 사다리의 세로 축(이동 통로)과 가로 축(분기점)을 네트워크 노드와 에지로 해석하여 경로를 계산합니다.
- **비용 함수**: 각 노드에서의 이동 가능 여부를 판단하는 알고리즘은 실제 경로탐색 서버(pgRouting 등)에서 사용되는 물리적 이동 제어 논리를 단순화하여 구현되었습니다.

## 🚀 시작하기 (Getting Started)

별도의 설치나 빌드 과정 없이 바로 실행 가능합니다.

1. 이 저장소를 클론하거나 다운로드합니다.
2. `projects/ladder/index.html` 파일을 브라우저에서 엽니다.

## 📂 프로젝트 구조 (Structure)

- `index.html`: 게임의 구조 및 마크업 (컴팩트 레이아웃 적용)
- `style.css` (또는 `app.css` / `game.css`): 애니메이션 및 스타일 테마
- `script.js`: 사다리 생성 알고리즘 및 경로 탐색 로직
- `README.md`: 프로젝트 가이드

## 📸 Screenshots

````carousel
![초기 화면](file:///C:/Users/thlee/.gemini/antigravity/brain/3e79d0b3-1532-42e0-8e4a-8582394c6bb1/ladder_game_final_layout_1773990356179.png)
<!-- slide -->
![결과 공개](file:///C:/Users/thlee/.gemini/antigravity/brain/3e79d0b3-1532-42e0-8e4a-8582394c6bb1/result_check_screenshot_1773989695408.png)
````

---
© 2026 Polylinez Tech. Inspired by 3D Geospatial Network Research.
