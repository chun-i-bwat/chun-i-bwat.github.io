# chun-i-bwat.github.io

천이봤 표의 네이버 카페 게시글을 PC 브라우저 탭으로 한 번에 여는
GitHub Pages 정적 사이트입니다.

## 주소 형식

```text
https://chun-i-bwat.github.io/#ids=185451,185452,185453
```

- `ids`에는 네이버 카페 게시글 번호를 쉼표로 구분해 넣습니다.
- 중복 번호는 한 번만 열립니다.
- 숫자가 아닌 값은 무시합니다.
- 주소에 담긴 유효한 게시글을 모두 처리합니다.
- 앞의 4개는 즉시 열고, 나머지는 빈 탭을 확보한 뒤 1초마다 4개씩 불러옵니다.
- 모든 주소를 전달한 뒤 실행 페이지를 자동으로 닫습니다.
- 브라우저에서 `chun-i-bwat.github.io`의 팝업을 항상 허용해야 합니다.

## GitHub Pages 설정

1. GitHub에서 `chun-i-bwat` 계정 또는 조직을 준비합니다.
2. 공개 저장소 `chun-i-bwat.github.io`를 만듭니다.
3. 이 폴더의 `index.html`, `.nojekyll`, `assets` 폴더를 저장소 루트에 올립니다.
4. 저장소의 `Settings > Pages`에서 `Deploy from a branch`를 선택합니다.
5. Branch를 `main`, 폴더를 `/(root)`로 선택하고 저장합니다.

배포가 완료되면 `https://chun-i-bwat.github.io/`에서 동작합니다.
