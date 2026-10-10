/* ================================================================
   사무엘하 공통 지도 (ISRAEL MAP SYSTEM)
   사무엘하의 모든 레슨이 이 파일 하나를 함께 쓴다.

   사용법: <body> 바로 아래에  <script src="map.js"></script>  를 넣고,
           지도 자리에서 <use href="#sm-land"/> 처럼 불러 쓴다.
           (SVG 파일을 직접 <use>로 불러오는 방식은 로컬 파일에서 Chrome이
            막으므로, 스크립트로 <defs>를 문서에 넣는다.)

   좌표계:  x = (경도 − 34) × 100      y = (33.2 − 위도) × 118
   전체 범위: 경도 33.9°–36.6°E, 위도 30.7°–33.3°N
   지도마다 좌표는 그대로 두고 viewBox만 잘라 쓴다.

   도시 좌표 (x, y)
     예루살렘 123,167.6    베들레헴 120,177     헤브론 110,197
     시글락 72,215 (추정)   길보아산 141,88.5    벧산 150,82.6
     이스르엘 133,75.5     길르앗 야베스 163,94.4 (추정)
     마하나임 169,120 (대략 — 요단강 동쪽)
     기브온 118,159.3      게바 126,158       게셀 92,158
     가드 85,177          르바임 골짜기 116,172 (예루살렘 남서쪽, 대략)
     두로 120,-8.3
   새 장소는 실제 경위도로 계산해 추가한다. 위치가 확정되지 않은 곳은
   점선 고리(#sm-approx)를 겹쳐 '추정'임을 나타낸다.

   제공하는 도형
     #sm-land     육지            #sm-water   요단강 · 갈릴리 바다 · 사해
     #sm-judah    유다 영역        #sm-saul    사울 왕조 쪽 영역 (경계선이 아님)
     #sm-benjamin 베냐민의 대략적 범위   #sm-philistia 블레셋 평야 지역 (둘 다 회색 가로 빗금)
     #sm-north    방위표          #sm-approx  추정 위치 고리 (x,y로 옮겨 씀)
     화살촉 마커: #sm-mk-acc, #sm-mk-ink, #sm-mk-saul
   ================================================================ */
(function () {
  var defs =
    '<svg id="sm-map-defs" width="0" height="0" style="position:absolute" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>' +

    '<marker id="sm-mk-acc" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#b4552d"/></marker>' +
    '<marker id="sm-mk-ink" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#1e1e1e"/></marker>' +
    '<marker id="sm-mk-saul" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#56687a"/></marker>' +

    /* 흑백 인쇄에서도 두 영역이 구분되도록 빗금 방향을 다르게 한다 */
    '<pattern id="sm-hatch-judah" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="#ecd3c5"/><line x1="0" y1="0" x2="0" y2="3" stroke="#b4552d" stroke-width=".55" opacity=".5"/></pattern>' +
    '<pattern id="sm-hatch-saul" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="3" height="3" fill="#cfd9e1"/><line x1="0" y1="0" x2="0" y2="3" stroke="#56687a" stroke-width=".55" opacity=".5"/></pattern>' +

    /* 육지: 지중해 동쪽 해안선 */
    '<path id="sm-land" fill="#f4f0ea" stroke="#d2cdc5" stroke-width=".6" stroke-linejoin="round" d="M138,-44 L131,-28 L122,-12 L120,0 L110,13 L107,33 Q106,43 100,44 L96,43 L93,59 L89,82 L85,104 L75,136 L63,165 L55,180 L44,200 L22,224 L-10,248 L-10,300 L270,300 L270,-44 Z"/>' +

    /* 물: 갈릴리 바다 · 요단강 · 사해 */
    '<g id="sm-water">' +
      '<path d="M157,58 C159,70 155,76 157,84 S155,100 156,108 S153,124 154,132 S152,148 153,156 L153,171" fill="none" stroke="#9db7c6" stroke-width="1.3" stroke-linecap="round"/>' +
      '<ellipse cx="158" cy="46" rx="6" ry="12" fill="#e3ecf1" stroke="#b9cbd6" stroke-width=".6"/>' +
      '<path d="M151,170 L157,171 L158,185 L158,205 L156,222 L157,238 L153,250 L146,250 L144,236 L141,220 L140,203 L142,186 L146,174 Z" fill="#e3ecf1" stroke="#b9cbd6" stroke-width=".6" stroke-linejoin="round"/>' +
    '</g>' +

    /* 영역: 대략적인 범위만 나타낸다. 본문에 경계선이 없으므로 테두리를 그리지 않는다. */
    '<path id="sm-judah" d="M108,174 L134,176 L136,200 L131,228 L112,240 L90,236 L86,212 L93,190 Z" fill="url(#sm-hatch-judah)" stroke="url(#sm-hatch-judah)" stroke-width="8" stroke-linejoin="round" opacity=".85"/>' +
    '<path id="sm-saul" d="M114,70 L146,64 L176,76 L198,94 L202,128 L188,144 L160,148 L150,158 L118,160 L105,146 L103,112 L106,86 Z" fill="url(#sm-hatch-saul)" stroke="url(#sm-hatch-saul)" stroke-width="8" stroke-linejoin="round" opacity=".85"/>' +

    '<pattern id="sm-hatch-neutral" width="3" height="2.4" patternUnits="userSpaceOnUse"><rect width="3" height="2.4" fill="#e6e2da"/><line x1="0" y1="1.2" x2="3" y2="1.2" stroke="#6f6a61" stroke-width=".45" opacity=".55"/></pattern>' +
    '<path id="sm-benjamin" d="M108,151 L148,147 L150,163 L126,165 L109,161 Z" fill="url(#sm-hatch-neutral)" stroke="url(#sm-hatch-neutral)" stroke-width="6" stroke-linejoin="round" opacity=".85"/>' +
    '<path id="sm-philistia" d="M50,198 L62,172 L74,148 L92,152 L95,174 L86,196 L66,208 Z" fill="url(#sm-hatch-neutral)" stroke="url(#sm-hatch-neutral)" stroke-width="8" stroke-linejoin="round" opacity=".85"/>' +

    '<g id="sm-north"><path d="M0,9 L0,2 M-1.8,4.6 L0,1.6 L1.8,4.6" stroke="#888" stroke-width=".7" fill="none"/><text x="0" y="0" text-anchor="middle" font-family="SCDream,sans-serif" font-size="3.6" fill="#888">N</text></g>' +
    '<circle id="sm-approx" r="4.4" fill="none" stroke="#1e1e1e" stroke-width=".6" stroke-dasharray="1.4,1.2"/>' +

    '</defs></svg>';

  document.body.insertAdjacentHTML('afterbegin', defs);
})();
