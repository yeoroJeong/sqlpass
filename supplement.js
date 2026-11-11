(() => {
  const sources = { model: '336', sql: '321', window: '270' };
  const rows = [
    [1,'데이터 모델링의 이해','배송 구역 코드를 A, B, C 중 하나로 제한한다. 이 허용값 집합은 무엇인가?', ['카디널리티','도메인','인스턴스','관계명'],2,'도메인은 속성에 들어갈 수 있는 값의 범위다.','model'],
    [1,'데이터 모델링의 이해','주문 품목별 금액을 합산해 주문 총액을 저장했다. 총액은 어떤 속성인가?', ['기본','설계','파생','식별'],3,'다른 속성값에서 계산한 값이므로 파생 속성이다.','model'],
    [1,'데이터 모델링의 이해','고객 화면은 그대로 두고 테이블의 물리 저장 구조를 바꿀 수 있다. 어떤 독립성인가?', ['논리적','물리적','관계적','개념적'],2,'내부 스키마가 바뀌어도 논리 구조가 영향을 받지 않는 물리적 독립성이다.','model'],
    [1,'데이터 모델링의 이해','강좌는 수강신청이 0건이어도 등록할 수 있다. 강좌에서 수강신청으로 향하는 관계의 최소 참여 수는?', ['0','1','2','최대 정원'],1,'수강신청 없이도 강좌가 존재할 수 있으므로 최소 참여 수는 0이다.','model'],
    [1,'데이터 모델과 SQL','예약상세 PK는 (예약번호, 객실번호)다. 객실 유형은 객실번호만으로 정해진다. 어떤 정규화에서 이 속성을 분리하는가?', ['1NF','2NF','3NF','BCNF만 해당'],2,'객실 유형이 복합키의 일부에만 종속되므로 2NF에서 분리한다.','model'],
    [1,'데이터 모델과 SQL','장비번호가 창고번호를 결정하고 창고번호가 창고 주소를 결정한다. 창고 주소를 창고 테이블로 분리하는 근거는?', ['부분 종속 제거','이행 종속 제거','원자성 확보','인조키 생성'],2,'장비번호 → 창고번호 → 주소로 이어지는 이행 종속을 제거한다.','model'],
    [2,'SQL 기본','열 x에 NULL, 4, 4, 10이 있다. COUNT(DISTINCT x)의 결과는?', ['1','2','3','4'],2,'NULL을 제외하고 중복 4를 한 번만 센다.','sql'],
    [2,'SQL 기본','열 x가 NULL인 행을 찾는 조건은?', ['x = NULL','x <> NULL','x IS NULL','NOT (x = NULL)'],3,'NULL과 일반 비교를 하면 UNKNOWN이 된다. IS NULL로 검사한다.','sql'],
    [2,'SQL 기본','결제 정보가 없는 회원도 포함해 성공한 결제만 연결하려면 결제 상태 조건을 어디에 두는가?', ['SELECT','GROUP BY','WHERE의 오른쪽 열 조건','LEFT JOIN의 ON'],4,'ON에서 매칭 대상을 제한하면 결제가 없는 회원의 NULL 확장행이 유지된다.','sql'],
    [2,'SQL 기본','같은 키 7이 A에 3행, B에 2행 있다. 두 테이블을 키로 INNER JOIN할 때 키 7의 결과는?', ['2행','3행','5행','6행'],4,'A의 각 3행이 B의 2행과 각각 매칭되어 6행이 된다.','sql'],
    [2,'SQL 기본','상품별 합계가 100을 초과하는 그룹을 남기는 절은?', ['WHERE','HAVING','SELECT DISTINCT','ORDER BY'],2,'HAVING은 GROUP BY로 만든 그룹의 집계 결과에 조건을 적용한다.','sql'],
    [2,'SQL 기본','재고 x에 NULL, 8, 16이 들어 있다. AVG(COALESCE(x, 0))은?', ['0','8','12','24'],2,'NULL을 0으로 바꾼 뒤 세 값의 평균 24 ÷ 3을 계산한다.','sql'],
    [2,'SQL 활용','A의 결과가 2, 2, 5이고 B의 결과가 2, 9다. UNION ALL 결과의 행 수는?', ['2','3','4','5'],4,'중복을 제거하지 않으므로 3 + 2 = 5행이다.','sql'],
    [2,'SQL 활용','매장·상품별 상세 집계와 매장별 소계만 필요하다. 전체 총계는 제외한다. 어떤 구문이 맞는가?', ['CUBE(매장, 상품)','ROLLUP(매장, 상품)','GROUPING SETS ((매장, 상품), (매장))','GROUP BY 매장, 상품'],3,'GROUPING SETS는 지정한 두 집계 수준만 생성한다.','sql'],
    [2,'SQL 활용','아래 매출을 날짜순으로 정렬했다. 가운데 행의 이동합은?', ['12','19','23','30'],4,'이전·현재·다음 행이 모두 포함되어 7 + 12 + 11 = 30이다.','window','일자  매출\n1     7\n2     12\n3     11\n\nSUM(매출) OVER (ORDER BY 일자\n  ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)'],
    [2,'SQL 활용','가격 20, 20, 15, 10을 내림차순 정렬했다. 가격 15의 RANK와 DENSE_RANK는?', ['2, 2','3, 2','2, 3','3, 3'],2,'RANK는 동점이 차지한 행 수를 반영하고 DENSE_RANK는 서로 다른 값의 순서만 센다.','sql'],
    [2,'SQL 활용','상품 11개에 NTILE(4)를 적용한다. 첫 번째와 마지막 그룹의 행 수는?', ['3, 2','2, 3','4, 2','3, 3'],1,'11 = 4×2 + 3이므로 앞의 3개 그룹은 3행, 마지막 그룹은 2행이다.','sql'],
    [2,'SQL 활용','구매 테이블의 고객 열에 NULL이 있을 수 있다. 구매가 없는 고객을 안전하게 찾는 구문은?', ['고객ID = NULL','고객ID NOT IN (SELECT 고객ID FROM 구매)','구매와 INNER JOIN','고객ID로 상관 조건을 건 NOT EXISTS'],4,'NOT EXISTS는 해당 고객과 매칭되는 행의 존재 여부를 검사한다. NOT IN은 NULL의 영향을 받는다.','sql'],
    [2,'SQL 활용','Oracle에서 START WITH parent_id IS NULL, CONNECT BY PRIOR id = parent_id로 조회한다. 루트 LEVEL은?', ['0','1','2','NULL'],2,'START WITH가 고른 루트의 LEVEL은 1이며 자식으로 갈수록 증가한다.','sql'],
    [2,'SQL 활용','아래 정렬값에서 값 40의 두 번째 행을 볼 때, RANGE BETWEEN CURRENT ROW AND CURRENT ROW가 포함하는 행 수는?', ['1','2','3','4'],2,'RANGE는 현재 정렬 키 값이 같은 동료 행을 모두 포함한다. 40인 행이 두 개다.','sql','정렬값: 30, 40, 40, 50'],
    [2,'관리 구문','SQL Server에서 BEGIN → INSERT A → BEGIN → INSERT B → COMMIT을 실행했다. @@TRANCOUNT는?', ['0','1','2','3'],2,'두 번 BEGIN으로 2가 된 뒤 안쪽 COMMIT으로 1이 된다. 아직 최종 확정 전이다.','sql'],
    [2,'관리 구문','SQL Server에서 아래 작업 뒤 최종 재고는 얼마인가?', ['5','8','11','14'],2,'저장점 이후의 두 번째 UPDATE만 취소된다. 저장점 시점의 재고 8이 커밋된다.','sql','초기 재고 = 5\nBEGIN TRANSACTION;\nUPDATE Stock SET qty = 8;\nSAVE TRANSACTION stage;\nUPDATE Stock SET qty = 11;\nROLLBACK TRANSACTION stage;\nCOMMIT;'],
    [2,'관리 구문','팀 계정에 Orders 테이블의 조회 권한을 주려면 어떤 명령을 사용하는가?', ['GRANT SELECT','REVOKE SELECT','ALTER SELECT','COMMIT SELECT'],1,'GRANT는 권한을 부여한다. SELECT 권한은 조회를 허용한다.','sql'],
    [2,'관리 구문','결제 확정 직후 장애가 발생해도 확정된 결제가 보존된다. 어떤 성질인가?', ['원자성','일관성','격리성','지속성'],4,'지속성은 성공적으로 커밋된 결과가 장애 이후에도 보존되는 성질이다.','sql']
  ];
  const firstId = window.QUESTIONS.length + 1;
  window.QUESTIONS.push(...rows.map(([subject, chapter, prompt, choices, answer, explanation, source, sample], index) => ({
    id: firstId + index,
    number: index + 1,
    subject, chapter, prompt, choices, answer, explanation, sample,
    source: 'https://yunamom.tistory.com/' + sources[source],
    collection: 'supplement'
  })));
})();
