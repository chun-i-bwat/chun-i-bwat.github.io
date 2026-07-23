# chunyang-open.github.io

천이봤 표의 네이버 카페 게시글을 PC 브라우저 탭으로 한 번에 여는
GitHub Pages 정적 사이트입니다.

## 주소 형식

```text
https://chunyang-open.github.io/#ids=185451,185452,185453
```

- `ids`에는 네이버 카페 게시글 번호를 쉼표로 구분해 넣습니다.
- 중복 번호는 한 번만 열립니다.
- 숫자가 아닌 값은 무시합니다.
- 한 번에 최대 100개까지 처리합니다.
- 브라우저에서 `chunyang-open.github.io`의 팝업을 항상 허용해야 합니다.

## GitHub Pages 설정

1. GitHub에서 `chunyang-open` 계정 또는 조직을 준비합니다.
2. 공개 저장소 `chunyang-open.github.io`를 만듭니다.
3. 이 폴더의 `index.html`, `.nojekyll`, `assets` 폴더를 저장소 루트에 올립니다.
4. 저장소의 `Settings > Pages`에서 `Deploy from a branch`를 선택합니다.
5. Branch를 `main`, 폴더를 `/(root)`로 선택하고 저장합니다.

배포가 완료되면 `https://chunyang-open.github.io/`에서 동작합니다.
