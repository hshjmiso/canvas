# 3. HTML5 캔버스 문자 API

## 문자 출력의 기본

### 기본 문자 출력

캔버스에 문자를 출력하는 가장 간단한 방법은 font-style, font-weight, font-size, font-face와 같은 CSS 폰트 스타일 특성에 표준값을
넣어서 context.font 스타일을 설정하는 것이다.

50포인트 serif 폰트를 설정한 예다.

```javascript
context.font = "50px serif";
```

문자에 내부를 꾸미려면 context.fillStyle에 표준 CSS 색상을 지정하거나 CanvasGradient나 CanvasPattern 객체를 지정하면 된다. 

context.fillStyle로 문자를 꾸미는 방법을 정한 다음에 context.fillText() 메서드를 호출한다. 이 메서드는 캔버스에 출력하려는 문자열과
그 문자열의 x, y 위치를 인수 값으로 넘긴다.

```javascript
context.font = "50px serif";
context.fillStyle = "#FF0000";
context.fillText("Hello World", 100, 80);
```

폰트를 지정하지 않으면 자동으로 기본값이 10px san-serif를 사용한다.

### Text Arragner에서의 기본적인 문자 처리

Text Arranger 애플리케이션은 context.fillText()를 사용해서 사용자가 설정한 대로 문자를 출력한다. 이를 위해 일단 사용자가 입력한
문자열을 담고 있는 message라는 이름의 변수를 만든다. 이 변수는 drawScreen() 메서드 안의 context.fillText()를 호출할 때 사용하게 
된다. 

```javascript
var message = "your text";
...
function drawScreen() {
    ...
    context.fillStyle = "#FF0000";
    context.fillText("Hello World", 100, 80);
}
```

캔버스에 출력되어 있는 문자열을 사용자가 입력한 문자열로 바꾸려면 문자 박스의 keyup 이벤트를 위한 이벤트 핸들러를 만들어야 한다.
사용자가 문자 박스 안에 있는 문자열을 바꾸면 이 이벤트 핸들러가 호출될 것이다.

이 기능을 위해서 HTML <form> 안의 <input> 요소를 통해 문자 박스에 이름을 붙여야 한다. 예제에서는 id값을 textBox로 설정했고 
placeholder 특성 값도 설정했다.

``` html
<form>
    Text: <input id="textBox" placeholder="your text"/>
    <br>
</form>
```

### HTML 폼과 캔버스의 연결

textBox의 keyup 이벤트를 위한 이벤트 핸들러를 만들려면 먼저 DOM document 객체의 document.getElementById() 함수를 사용해서 
폼 요소를 구하여 formElement 변수에 넣는다. 그 다음에는 formElement의 addEventListener() 메서드를 통해 keyup 이벤트의 이벤트
핸들러로 textBoxChanged 함수를 지정한다. 

```javascript
var formElement = document.getElementById("textBox");
formElement.addEventListener("keyup", textBoxChanged, false);
```

마지막으로 textBoxChanged() 이벤트 핸들러를 작성한다. 이 함수는 기억하기 쉽도록 e라는 이름의 매개변수로 이벤트 객체를 넘겨받는다.

```javascript
function textBoxChanged(e) {
    var target = e.target;
    message = target.value;
    drawScreen();
}
```

## measureText 사용하기

HTML5 캔베서에서는 measureText()라는 유용한 메서드가 있다. 이 메서드는 TextMetrics 객체를 리턴하는데, 이 객체는 문자열의 현재
컨텍스트 설정(폰트 모양, 크기 등)에 대한 속성을 갖는다. 그러나 아직까지는 TextMetrics 객체의 속성은 width 뿐이다. TextMetrics 
객체의 width 속성은 문자열이 캔버스에 실제로 그려질 때의 폭을 나타내는 픽셀 수로서, 문자열을 가운데로 정렬할 때에도 유용하게 사용할
수 있다.

### width 속성으로 가운데 정렬하기 

Text Arranger 애플리케이션은 사용자가 캔버스의 textBox에 입력한 문자열을 TextMetrics 객체를 이용하여 가운데로 정렬한다. 이를 위해
출력할 문자열을 담고 있는 message 변수를 2D 컨텍스트의 measureText() 메서드에 인수 값으로 넘겨서 TextMetrics의 인스턴스를 구하고,
그것을 metrics라는 이름의 변수에 넣는다.

```javascript
var metrics = context.measureText(message);
```

그리고 나서 metrics의 width 속성으로부터 문자열의 폭에 대한 픽셀 수를 구하고 그 값을 textWidth라는 이름의 변수에 넣는다.

```javascript
var textWidth = metrics.width;
```

그 다음에는 캔버스의 폭을 반으로 나누어서(theCanvas.width / 2) 화면의 가운데 위치를 계산한다. 여기서 문자열의 폭의 반(textWidth / 2)
을 빼 주어야 한다.

var xPosition = (theCanvas.width / 2) - (textWidth / 2);

### 문자열의 높이 처리

TextMetrics 객체에는 height 속성이 없다. 또 폰트 크기는 폰트 기준선 밑으로 내려가는 문자에 대해서는 맞지 않기 때문에 폰트 크기로
문자열 전체의 높이를 구하기가 힘들다. 폰트 크기는 문자열을 세로로 정렬할 때는 도움이 될지 모르지만 2줄 이상으로 나누어야 하는 긴 
문자열의 경우에는 그다지 도움이 되지 않는다. 줄 사이의 간격도 계산해야 하는데, 이 부분이 매우 까다롭기 때문이다.

문자열을 세로로 가운데 정렬하기 위해 폰트 크기를 이용하지 않고 캔버스 높이의 반값을 갖는 yPosition 변수를 이용한다. 폰트 baseline(기준선)
은 보통 기본값인 middle로 맞춰져 있기 때문에 이 변수를 이용하는 것이 가운데 정렬에 유리하다.

var yPosition = (theCanvas.height / 2);

## fillText와 strokeText

context.fillText() 함수는 캔버스에 한 가지 색의 문자열을 그린다. 색상은 context.fillColor 속성으로 설정하고, 폰트는 context.font
속성으로 설정한다.

```javascript
fillText([text], [x], [y], [maxWidth]);
```

* text : 캔버스에 그릴 문자열
* x : 캔버스에서 문자열의 x 위치
* y : 캔버스에서 문자열의 y 위치
* maxWidth : 캔버스에 그릴 문자열의 최대 폭

context.strokeText() 함수는 context.fillText() 함수와 얼핏 비슷해 보이지만, 문자열의 테두리를 그린다. 테두리를 그리는 데 사용하는 색은
context, strokeColor 속성으로 설정하고, 폰트는 context.font 속성으로 설정한다. 

```javascript
strokeText([text], [x], [y], [maxWidth]);
```

* text : 캔버스에 그릴 문자열
* x : 캔버스에서 문자열의 x 위치
* y : 캔버스에서 문자열의 y 위치
* maxWidth : 캔버스에 그릴 문자열의 최대 폭



