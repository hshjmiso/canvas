window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
    canvasApp();
}

function canvasApp () {
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    if(!theCanvas || !theCanvas.getContext) {
        console.error("canavs does not exist.");
    }

    function drawScreen() {
        // 배경 화면
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);

        // 문자
        context.fillStyle = "#000000";
        context.font = "20px _sans";
        context.textBaseline = "top";
        context.fillText("Hello World", 195, 80);

        // 사각형
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);
    }
    drawScreen();

    /*  Canvas 객체에는 공개 메서드가 두 개 있다. 첫 번째는 getContext()이다. getContext() 메서드를 이용해서 캔버스에 그릴 때
        사용하는 캔버스 2D 컨텍스트의 참조값을 구한다. 두 번째는 toDataURL()이다. toDataURL() 메서드는 Canvas 객체의 비트맵
        이미지의 스트링 정보를 넘긴다. 이는 화면의 스냅샷과 비슷하다. 다양한 MIME 타입을 매개변수로 넘기므로 여러 형식의 데이터를
        받을 수 있다.
     */
    function createImageDataPressed(e) {
        window.open(theCanvas.toDataURL(), "canvasImage", `left=0,top=0,width=${thieCanvas.width}, 
        height=${theCanvas.height},toolbar=0,resizable=0`);
    }

}


