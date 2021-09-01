# 2. 캔버스에 그리기

## 캔버스 상태 정보

캔버스 컨텍스트에 도형을 그릴 때는 상태 정보 스택을 이용한다. 상태 정보는 캔버스 컨텍스트에 대한 데이터를 저장한다. 다음은 상태
정보 스택에 있는 데이터다.

* context.rotate()와 context.setTransform() 메서드를 사용한 회전이나 이동에 대한 변환 행렬 정보
* 현재의 영역 선택 정보
* 캔버스 특성의 현재 값(일부만 나열)
  * globalAlpha
  * globalCompositeOperation
  * strokeStyle
  * textAlign, textBaseline
  * lineCap, lineJoin, lineWidth, miterLimit
  * fillStyle
  * font
  * shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY
  
### 상태 정보에 없는 정보

캔버스 컨텍스트에서 현재 패스와 현재 비트맵 정보는 상태 정보에 저장되지 않는다. 덕분에 캔버스에서 객체를 따로 그리거나 움직이게 할 수
있다. 간단한 캔버스 변화에서는 상태 정보를 적용하여 다른 부분은 그대로 두고 원하는 도형만 변환되도록 할 수 있다.

### 상태 정보의 저장과 복구

현재 상태 정보를 스택에 저장하려면 다음 함수를 사용한다.

```javascript 
context.save() 
```

스택에 저장했던 마지막 상태 정보를 캔버스에 다시 적용하려면 다음 함수를 사용한다.

```javascript 
context.restore() 
```

 
