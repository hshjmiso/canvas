# 3. HTML5 캔버스 문자 API

## 문자 폰트 설정

### 폰트 크기, 두께, 스타일의 기본

CSS 표준 폰트 종류, 크기, 두께, 스타일로 context.font 속성을 설정하기만 하면 된다. 

[font style][font weight][font size][font face]

```javascript
context.font = "italic bold 24px serif";
```

```javascript
context.font = "normal lighter 50px cursive";
```

context.font 속성을 설정하면 다른 CSS 값으로 바꾸기 전까지 그 설정이 모든 문자에 적용된다.

### Text Arranger에서 폰트 크기와 종류 설정하기

Text Arranger는 가능하면 많은 브라우저에서 문제없이 작동하기 위해 몇 가지 표준 폰트 옵션만 사용한다.

**사용 가능한 폰트 스타일**

``` normal | italic | oblique | inherit ```

```html
<select id="fontStyle">
    <option value="normal">normal</option>
    <option value="italic">italic</option>
    <option value="oblique">oblique</option>
</select>
```

**사용 가능한 폰트 두께**

``` normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit | auto ```

```html
<select id="fontWeight">
    <option value="normal">normal</option>
    <option value="bold">bold</option>
    <option value="bolder">bolder</option>
    <option value="lighter">lighter</option>
</select>
```

**일반적인 폰트 모양**

모든 브라우저에서 동작하는 폰트가 어떤 것인지 찾는 것은 쉽지 않기 때문에, Text Arranger에서는 CSS 명세에서 '일반적인' 폰트라고 
정의하는 serif, sans-serif, cursive, fantasy, monospace 만 사용한다.

```html
<select id="textFont">
    <option value="serif">serif</option>
    <option value="sans-serif">sans-serif</option>
    <option value="cursive">cursive</option>
    <option value="fantasy">fantasy</option>
    <option value="monospace">monospace</option>
</select>
```
